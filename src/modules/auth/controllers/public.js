const User = require('@repository/user');

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const user = new User(body);
    const savedUser = await user.createUser();
    res.send(savedUser);
    // res.render('index', { text: JSON.stringify(savedUser) });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    if (body.username && body.password) {
      const user = await User.findOne({ username: body.username });
      if (user && await user.comparePassword(body.password)) {
        res.redirect('/');
      } else {
        res.render('login', { loginFailure: true });
      }
    } else {
      res.render('login', { loginFailure: true });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
