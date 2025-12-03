const express = require('express');
const router = express.Router();
const { saveScore, getLeaderboard, getStats } = require('../controllers/scoreController');

// @route   POST /api/scores
// @desc    Save a new score
router.post('/', saveScore);

// @route   GET /api/scores/leaderboard
// @desc    Get leaderboard
router.get('/leaderboard', getLeaderboard);

// @route   GET /api/scores/stats
// @desc    Get game statistics
router.get('/stats', getStats);

module.exports = router;
