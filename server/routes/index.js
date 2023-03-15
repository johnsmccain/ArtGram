import { sayHello } from '../controllers';
import UsersController from '../controllers/user';
import AuthController from '../controllers/auth';
import ArtController from '../controllers/art';

import isLoggedIn from '../utils/middlewares';

import express from 'express';

const router = express.Router();

router.get('/', sayHello);

router.post('/signup', UsersController.createUser);

router.get('/login', AuthController.logIn);
router.get('/logout', AuthController.logOut);

router.post('/art', isLoggedIn, ArtController.postArt);
router.delete('/art/:id', isLoggedIn, ArtController.deleteArt);
router.put('/art/:id/like', isLoggedIn, ArtController.like);
router.put('/art/:id/unlike', isLoggedIn, ArtController.unlike);

router.get('/arts', isLoggedIn, ArtController.artsByUser);

export default router;
