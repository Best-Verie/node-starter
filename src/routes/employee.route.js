const express = require("express");
const {
  createEmployee,
  getEmployees,
  getEmployeeByEmail,
} = require("../controllers/employee.controller");
const router = express.Router({ mergeParams: true });



/**
 * @swagger
 * /api/employees:
 *  get:
 *   tags:
 *    - Employee
 *   description: Get all employees
 *   responses:
 *    200:
 *     description: An array of employees
 *    500:
 *     description: Server error
 *
 *
 *
 */
router.get("/", getEmployees);

/**
 * @swagger
 * /api/employees/:
 *  post:
 *    tags:
 *      - Employee
 *    description: Create an employee
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/Employee'
 *    responses:
 *      200:
 *        description: An employee
 *      500:
 *        description: Server error
 */
router.post("/", createEmployee);

/**
 * @swagger
 * /api/employees/{email}:
 *  get:
 *   tags:
 *    - Employee
 *   description: Get employee by email
 *   parameters:
 *    - name: email
 *      in: path
 *      required: true
 *      type: string
 *   responses:
 *    200:
 *     description: An employee
 *    500:
 *     description: Server error
 */
router.get("/:email", getEmployeeByEmail);

module.exports = router;
