// @flow
const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

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
 * @swagger
 * parameters:
 *  userId:
 *    name: userId
 *    in: path
 *    description: id of the user
 *    type: number
 */
/**
 *@swagger
 *definitions:
 *  User:
 *    type: object
 *    required:
 *      - email
 *      - accessToken
 *      - first_name
 *      - last_name
 *    properties:
 *      email:
 *        type: string
 *      accessToken:
 *        type: string
 *      username:
 *        type: string
 *      first_name:
 *        type: string
 *      last_name:
 *        type: string
 *      location_coordinate:
 *        type: string
 *      location_name:
 *        type: string
 *      phone_number:
 *        type: string
 *      _id:
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

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     description: Get specific user by user id
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/userId'
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: succesfully get
 *         schema:
 *           type: object
 *           $ref: '#/definitions/User'
 */
router.route('/:userId').get(userController.getSingleUser);
module.exports = router;
