// @flow
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

/**
 *@swagger
 *parameters:
 *  email:
 *    name: email
 *    in: formData
 *    description: name of the user
 *    required: true
 *    type: string
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */
/**
 *@swagger
 *parameters:
 *  password:
 *    name: password
 *    in: formData
 *    description: password of the user
 *    required: true
 *    type: string
 *    format: password
 */

/**
 *@swagger
 *definitions:
 *  User:
 *    type: object
 *    required:
 *      - email
 *      - accessToken
 *    properties:
 *      email:
 *        type: string
 *      accessToken:
 *        type: string
 */
/**
 * @swagger
 * /user:
 *   post:
 *     description: Create new user
 *     produces:
 *       - application/json
 *       - text/html
 *     parameters:
 *       - $ref: '#/parameters/email'
 *       - $ref: '#/parameters/password'
 *     tags:
 *        - Users
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 */

router.route('').post(userController.createUser);

/**
 * @swagger
 * /user/auth:
 *   post:
 *     description: Create new user
 *     produces:
 *       - application/json
 *       - text/html
 *     parameters:
 *       - $ref: '#/parameters/email'
 *       - $ref: '#/parameters/password'
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 */
router.route('/auth').post(userController.loginUser);
module.exports = router;
