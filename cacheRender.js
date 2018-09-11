/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
const LRUCache = require('lru-cache');

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

function getCacheKey(req) {
  return `${req.url}`;
}
module.exports = class CacheRenderer {
  constructor(app) {
    this.app = app;
  }

  async cacheRender(req, res, pagePath, queryParams) {
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (ssrCache.has(key)) {
      res.setHeader('x-cache', 'HIT');
      res.send(ssrCache.get(key));
      return;
    }

    try {
      // If not let's render the page into HTML
      const html = await this.app.renderToHTML(req, res, pagePath, queryParams);

      // Something is wrong with the request, let's skip the cache
      if (res.statusCode !== 200) {
        res.send(html);
        return;
      }

      // Let's cache this page
      ssrCache.set(key, html);

      res.setHeader('x-cache', 'MISS');
      res.send(html);
    } catch (err) {
      this.app.renderError(err, req, res, pagePath, queryParams);
    }
  }
};
