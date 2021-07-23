const { findBy } = require('./auth-model')

const checkUsernameExists = async (req, res, next) => {
    try {
      const [user] = await findBy({ 
        username: req.body.username
      })
      console.log(user)
      if (!user) {
        next({
          status: 401,
          message: 'invalid credentials'
        })
      } else {
        req.user = user
        next()
      }
    } catch (err) {
      next(err)
    }
}

const checkUsernameAndPassword = (req, res, next) => {
    const { username, password } = req.body;
    const valid = Boolean(username && password && typeof password === "string");

    if (valid) {
        next();
    } else {
        next({
        status: 422,
        message: 'username and password required',
    });
    }
}

async function checkUsernameFree(req, res, next) {
    try {
      const users = await
        findBy({ username: req.body.username })
      if (!users.length) {
        next()
      } else {
        next({ 
          status: 422, 
          message: 'username taken' 
        })
      }
    } catch (err) {
      next(err)
    }
}

module.exports = {
    checkUsernameExists,
    checkUsernameAndPassword,
    checkUsernameFree
}