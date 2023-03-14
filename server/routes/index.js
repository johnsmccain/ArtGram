import { sayHello } from '../controllers';
import UsersController from '../controllers/user';
import AuthController from '../controllers/auth';
import express from 'express';
const router = express.Router();

router.get('/', sayHello);

router.post('/signup', UsersController.postNewUser);
router.get('/login', AuthController.logIn);
router.get('/logout', AuthController.logOut);

export default router;
