import { Router } from 'express';

import Users from '../controllers/userController';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello tdd');
});

router.post('/signup', Users.signup);
router.post('/signin', Users.signin);

export default router;
