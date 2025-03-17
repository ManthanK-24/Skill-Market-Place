const express = require('express');
const router = express.Router();
const { createTask, markTaskAsCompleted, acceptOrRejectTaskCompletion } = require('../controllers/TaskController');

router.post('/create', createTask);

// Provider marks task as completed
router.post("/mark-completed", markTaskAsCompleted);

// User accepts/rejects task completion
router.post("/accept-reject-completion", acceptOrRejectTaskCompletion);

module.exports = router;
