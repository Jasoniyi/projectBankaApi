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




//   ------ ACCOUNTS -----
router.get('/accounts', (req, res) => {
  res.send('hello accounts');
});

 router.post('/accounts', Accounts.accountController);

 
// activate or deactive accounts
router.patch('/accounts/:accountNumber', (req, res)=>{
  res.status(200).json({
      "status": 200,
      "data": {
          "accountNuber": 123445,
          "status": "active",
          message: 'done'
      }
  })
});

//delete accounts
router.delete('/accounts/:id', (req, res) => {
  const account = accounts.find(account => account.id === parseInt(req.params.id));
   if (!account) res.status(404).send('account ID not found');

  const index =  accounts.indexOf(account);
  accounts.splice(index, 1)

  res.json({
      "status": 200,
      "message": " Account successfully deleted"
  })

});

//     -------TRANSACTIONS ------
router.post('/transactions/:accountNumber/credit', Transactions.creditAccount);
router.post('/transactions/:accountNumber/debit', Transactions.debitAccount);




export default router;
