const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static register (req, res, next) {
    let {email , password} = req.body;
    
    let object = {
      email, password
    }
    
    User.create(object) 
    .then(newUser => {
        let newUserEmail = newUser.email;
        let newUserId = newUser.id;

        res.status(201).json({ id : newUserId, email : newUserEmail });
      })
      .catch(err => {
        next(err)
      })
  }

  static login (req, res, next) {
    let {email, password} = req.body;

    let object = {
      email, password
    }

    User.findOne({ where : {
      email
    }})
      .then(userDb => {
        if (userDb) {
          let dbPassword = userDb.password;
          let comparePass = comparePassword(password, dbPassword);

          if (comparePass) {
            let id = userDb.id;
            let email = userDb.email;
            let payload = {id, email};
            let access_token = generateToken(payload);
            
            res.status(200).json({id, email, access_token});
          } else {
              throw {
                name: 'customErr',
                message: 'Invalid email or password'
              }
          }

        } else {
          throw {
            name: 'customErr',
            message: 'Invalid email or password'
          }
        }
      })
      .catch(err => {
          next(err)
      })
  }

}

module.exports = UserController;