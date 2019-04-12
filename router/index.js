import { Router } from 'express';

import Users from '../controllers/userController';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello tdd');
});

router.post('/auth/signup', Users.signup);
router.post('/auth/signin', Users.signin);

// creating signup api
router.post('/auth/signup', (req, res) => {
  
  const user = {
          id: users.length + 1,
         ...req.body
  }

  users.push(user);
  res.json({
      "status" : 200,
      "data" : {
          "id": users.length + 1,
          "firstname": req.body.firstname,
          "lastname": req.body.lastname,
          "email": req.body.email
      }
  }
  );
});

// creating signin api
router.post('/auth/signin', (req, res) => {
  
  const user = {
          id: users.length + 1,
         ...req.body
  }

  users.push(user);
  res.json({
      "status" : 200,
      "data" : {
          "id": users.length + 1,
          "firstname": req.body.firstname,
          "lastname": req.body.lastname,
          "email": req.body.email
      }
  }
  );
});

export default router;
