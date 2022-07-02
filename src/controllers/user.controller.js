const { User, validateData } = require("./../model/user");

exports.register = async (req, res) => {
  try {
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    user = await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");
    const validPassword = await user.comparePassword(req.body.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");
    const token = await user.generateAuthToken();
    return res.status(200).json({
      status: "success",
      data: {
        user: user,
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
