const express = require('express');
const {
    getProviderCount,
    getTotalTasksPosted,
    getTotalSuccessfulTasks,
    getTotalRejectedTasks,
} = require('../controllers/adminController');

const router = express.Router();

// Admin Route to Get Provider Count
router.get('/provider-count', getProviderCount);

router.get('/tasks-posted', getTotalTasksPosted);

router.get('/tasks-successful', getTotalSuccessfulTasks);

router.get('/tasks-rejected', getTotalRejectedTasks);


module.exports = router;
