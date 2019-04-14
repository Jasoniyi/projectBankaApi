import { Router } from 'express';

import Users from '../controllers/userController';
import Accounts from '../controllers/accountController';
import Transactions from '../controllers/transactionController'

const router = Router();

router.get('/', (req, res) => {
  res.send('hello');
});

router.post('/signup', Users.signup);
router.post('/signin', Users.signin);




  //------ ACCOUNTS -----
// router.get('/accounts', (req, res) => {
//   res.send(accounts);
// });
     // creates accounts
 router.post('/accounts', Accounts.accountController);

     // gets list of all accounts registered
 router.get('/accounts', Accounts.getAccounts);

 
// activate or deactivate accounts
router.patch('/accounts/:accountNumber', Accounts.deactivateAccount);
router.patch('/accounts/:accountNumber', Accounts.activateAccount);


//delete accounts
router.delete('/accounts/:accountNumber', Accounts.deleteAccount);

//     -------TRANSACTIONS ------
router.post('/transactions/:accountNumber/credit', Transactions.creditAccount);
router.post('/transactions/:accountNumber/debit', Transactions.debitAccount);




export default router;
