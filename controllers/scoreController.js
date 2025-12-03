const Score = require('../models/Score');

exports.saveScore = async (req, res) => {
  try {
    const { playerName, time, moves, gridSize, imageType, imageId } = req.body;

    // Validation
    if (!playerName || time === undefined || moves === undefined || !gridSize) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    const newScore = new Score({
      playerName: playerName.trim() || 'Anonymous',
      time,
      moves,
      gridSize,
      imageType: imageType || 'default',
      imageId: imageId || null
    });

    await newScore.save();

    res.status(201).json({
      success: true,
      score: newScore,
      message: 'Score saved successfully'
    });

  } catch (error) {
    console.error('Save score error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving score',
      error: error.message 
    });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const gridSize = parseInt(req.query.gridSize) || 3;
    const limit = parseInt(req.query.limit) || 10;

    const scores = await Score.find({ gridSize })
      .sort({ time: 1, moves: 1 })
      .limit(limit)
      .select('-__v')
      .lean();

    res.json({
      success: true,
      scores,
      count: scores.length
    });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching leaderboard' 
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Score.aggregate([
      {
        $group: {
          _id: null,
          totalGames: { $sum: 1 },
          avgTime: { $avg: '$time' },
          avgMoves: { $avg: '$moves' },
          bestTime: { $min: '$time' },
          bestMoves: { $min: '$moves' }
        }
      }
    ]);

    const gridStats = await Score.aggregate([
      {
        $group: {
          _id: '$gridSize',
          count: { $sum: 1 },
          avgTime: { $avg: '$time' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      overall: stats[0] || {},
      byGridSize: gridStats
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics' 
    });
  }
};
