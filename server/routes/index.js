import { register, sayHello } from '../controllers';
import UsersController from '../controllers/user';
import AuthController from '../controllers/auth';
import ArtController from '../controllers/art';

import isLoggedIn from '../utils/middlewares';

import express from 'express';

const router = express.Router();

router.get('/', sayHello);

router.post('/signup', UsersController.createUser);
router.post('/login', AuthController.logIn);
router.delete('/logout', isLoggedIn, AuthController.logOut);

router.get('/arts', isLoggedIn, ArtController.myArts);
router.post('/art', isLoggedIn, ArtController.postArt);
router.delete('/arts/:id', isLoggedIn, ArtController.deleteArt);
router.put('/arts/:id/like', isLoggedIn, ArtController.like);
router.put('/arts/:id/unlike', isLoggedIn, ArtController.unlike);
router.post('/arts/:id/comment', isLoggedIn, ArtController.comment);
router.get('/arts/:category', isLoggedIn, ArtController.getByCategory);

router.get('/users/:id', UsersController.getUser);
router.get('/users', UsersController.getAllUsers);
router.get('/user/likes', isLoggedIn, UsersController.myLikes);

export default router;
