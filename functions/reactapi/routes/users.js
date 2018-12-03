const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const users = []

const hydrateUsers = () => {
  const id = shortid.generate(); 
  let user1 = {
    id: id,
    first_name: 'Krishnan',
    last_name: 'Sriram',
    dob: '03/28/1979'
  };

  users.push(user1);
}
/* GET users listing. */
router.get('/', (req, res, next) => {
  if(users.length <= 0) {
    hydrateUsers();
  }
  res.status(201).send(users);
});

router.post('/add', (req, res, next) => {
  const { first_name } = req.body;
  const { last_name } = req.body;
  const { dob } = req.body;
  const id = shortid.generate(); 
  const user = {id, first_name, last_name, dob };
  users.push(user);
});

module.exports = router;
