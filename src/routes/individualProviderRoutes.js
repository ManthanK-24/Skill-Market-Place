const express = require('express');
const router = express.Router();
const { registerIndividualProvider, getIndividualProviders } = require('../controllers/individualProviderController');

router.post('/register', registerIndividualProvider);
router.get('/getAllProviders', getIndividualProviders);

module.exports = router;
