import { register, sayHello } from '../controllers';
import UsersController from '../controllers/user';
import AuthController from '../controllers/auth';
import ArtController from '../controllers/art';

import { isLoggedIn, refreshAccessToken } from '../utils/middlewares';

import express from 'express';

const router = express.Router();

router.get('/', sayHello);

router.post('/signup', UsersController.createUser);
router.post('/login', AuthController.logIn);
router.delete('/logout', isLoggedIn, AuthController.logOut);
router.post('/refresh', refreshAccessToken);

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

router.patch('/users/:id/follow', isLoggedIn, UsersController.follow);
router.patch('/users/:id/unfollow', isLoggedIn, UsersController.unfollow);

router.get('/verify-token', AuthController.verifyToken);
router.get('/refresh-token', AuthController.refreshToken);

export default router;
