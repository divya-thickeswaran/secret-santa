const express = require('express');
const multer = require('multer');
const { generateSanta } = require('../controllers/santaController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/generate',
  upload.fields([
    { name: 'employees', maxCount: 1 },
    { name: 'previous', maxCount: 1 }
  ]),
  generateSanta
);

module.exports = router;