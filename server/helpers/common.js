const { HOST, HOST_PORT } = process.env;
export function buildHost() {
  if (HOST_PORT) {
    return `${HOST}:${HOST_PORT}/`;
  }
  return `${HOST}/`;
}
