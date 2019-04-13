import { Router } from 'express';

import Users from '../controllers/userController';
import Accounts from '../controllers/accountController';

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




export default router;
