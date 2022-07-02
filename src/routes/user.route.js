const express = require("express");
const { register, login } = require("../controllers/user.controller");
const router = express.Router();

/**
 * @swagger
 * /api/user/register:
 *  post:
 *    tags:
 *      - User
 *    description: Create an user
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/User'
 *    responses:
 *      200:
 *        description: An user
 *      500:
 *        description: Server error
 */
router.post("/register", register);

/**
 * @swagger
 * /api/user/login:
 *  post:
 *    tags:
 *      - User
 *    description: login a user
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *         type: object
 *         properties:
 *          email:
 *           type: string
 *          password:
 *           type: string
 *         required:
 *          - email
 *          - password
 *    responses:
 *      200:
 *        description: An user
 *      500:
 *        description: Server error
 */
router.post("/login", login);

module.exports = router;
