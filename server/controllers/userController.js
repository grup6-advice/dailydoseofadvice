const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const jwt = require('jsonwebtoken');

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
        res.status(500).json({message : 'Internal server error'})
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
            let access_token = jwt.sign(payload, process.env.secretkey);
            res.status(200).json({id, email, access_token});
          } else {
             res.status(401).json({message : 'Invalid email or password'})
          }

        } else {
           res.status(401).json({message : 'Invalid email or password'})
        }
      })
      .catch(err => {
         res.status(500).json({message : 'Internal server error'})
      })
  }

}

module.exports = UserController;