import { register, sayHello } from '../controllers';
import UsersController from '../controllers/user';
import AuthController from '../controllers/auth';
import ArtController from '../controllers/art';

import isLoggedIn from '../utils/middlewares';

import express from 'express';

const router = express.Router();

router.get('/', sayHello);
router.get('/signup', register);

router.post('/login', AuthController.logIn);

router.post('/signup', UsersController.createUser);

router.get('/logout', AuthController.logOut);

router.post('/art', isLoggedIn, ArtController.postArt);
router.delete('/arts/:id', isLoggedIn, ArtController.deleteArt);
router.put('/arts/:id/like', isLoggedIn, ArtController.like);
router.put('/arts/:id/unlike', isLoggedIn, ArtController.unlike);

router.get('/arts/:tag', isLoggedIn, ArtController.getByTags);

router.get('/arts', isLoggedIn, ArtController.myArts);
router.get('/user/likes', isLoggedIn, UsersController.myLikes);

export default router;
