import { Router } from 'express';

import Transactions from '../controllers/transactionControllers;

const router = Router();

router.get('/transactions', (req, res) => {
    res.send('hello Accounts');
  });

 router.post('/transactions', Transactions.transactionsController);

export default router;