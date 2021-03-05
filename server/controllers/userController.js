const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

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

  static googleLogin(req, res, next){
    const token = req.body.token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID
      });
      const userFromGoogle = ticket.getPayload();
      
      let passDb = userFromGoogle.email
      
      User.findOrCreate({
        where: {
          email: userFromGoogle.email
        },
        defaults: {
          email: userFromGoogle.email,
          password: passDb
        }
      })
      .then(user => {
        let payload = { id: user.id, email: user.email }
        res.status(200).json({
          id: user.id,
          email: user.email,
          access_token: generateToken(payload)
        })
      })
      .catch(err => {
        next(err)
      })
    }
    verify().catch(console.error);
  }

}

module.exports = UserController;