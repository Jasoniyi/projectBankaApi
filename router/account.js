import { Router } from 'express';

import Accounts from '../controllers/accountController';

const router = Router();

router.get('/accounts', (req, res) => {
    res.send('hello Accounts');
  });

router.post('/accouts', Accounts.accountController);

export default router;