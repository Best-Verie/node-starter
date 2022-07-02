const { Employee, validateData } = require("../model/employee");

// POST /employees
exports.createEmployee = async (req, res) => {
  try {
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    });

    employee = await employee.save();
    res.send(employee);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// GET /employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

//GET /employees/:email
exports.getEmployeeByEmail = async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.params.email });
    if (!employee) return res.status(404).send("Employee not found");
    res.send(employee);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
