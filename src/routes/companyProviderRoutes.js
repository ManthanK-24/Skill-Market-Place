const express = require('express');
const router = express.Router();
const { registerCompanyProvider, getCompanyProviders } = require('../controllers/companyProviderController');

router.post('/register', registerCompanyProvider);
router.get('/getAllProviders', getCompanyProviders);

module.exports = router;
