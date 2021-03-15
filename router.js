const express = require('express');
const cors = require('cors');
const router = express.Router();
const Fond = require('./models/Fond');

// get random number from 0 to number - 1
const getRandom = (number) => {
  return Math.floor(Math.random() * number);
}

router.get('/api/customers', cors(), async (req, res) => {
  const data = { message: 'router.get OK' }

  fonds = await Fond.find();

  const threeFonds = [
    fonds[getRandom(fonds.length)],
    fonds[getRandom(fonds.length)],
    fonds[getRandom(fonds.length)],
  ];

  res.json(threeFonds);
});

module.exports = router;
