# hanip-express-api-with-auth-boilerplate

express JS Rest Api with opinionated config and auth already made

It still work in progress and pretty much opinionated

## About

ExpressJS Based Rest Api boilerplate by me, dibuat karena iri laravel kalau baru init project dan butuh sistem authentifikasi tinggal `php artisan make:auth`

### fitur & package:

- JWT based auth pre-made with bcrypt password hash
- Linted with eslint
- static type checked with Flow (partial)
- automatic documentation with swagger by adding JSDoc to selected route
- use babel to be able to use modern JS feature
- async controllers with js async/await instead of promise for more readability
- logger system ready to use
- no more because i am too sleepy to add more feature

## How to Install

### how to use:

- git clone https://github.com/hanipcode/hanip-express-api-with-auth-boilerplate.git yourAwesomeProject
- cd yourAwesomeProject
- npm install
- add more route and model as you need, and document with JSDoc if you need the route to be shown on swagger page, see routes in route folder for details
- npm start
- navigate to localhost:8000/api-docs to see your swagger page
