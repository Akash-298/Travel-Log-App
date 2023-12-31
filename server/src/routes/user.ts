import express from 'express';
import controller from '../controllers/user';
import extractFirebaseInfo from '../middleware/extractFirebaseInfo';

const router = express.Router();

router.post('/validate', extractFirebaseInfo, controller.validate);
router.get('/:userID', controller.read);
router.post('/create', extractFirebaseInfo,controller.create);
router.post('/login',extractFirebaseInfo, controller.login);
router.get('/', controller.readAll);

export = router;