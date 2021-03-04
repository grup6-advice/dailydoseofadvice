const router = require('express').Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const ApiController = require('../controllers/apiController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authenticate);

router.get('/quotes', ApiController.stoicQuotes);
router.get('/advice', ApiController.adviceQuotes);
router.get('/images', ApiController.imageUrl);


module.exports = router;