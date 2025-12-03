import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  FormControl,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Stack
} from '@mui/material';
import { EmojiEvents, Refresh } from '@mui/icons-material';
import { getLeaderboard } from '../services/api';
import { formatTime } from '../utils/puzzleSolver';

const Leaderboard = () => {
  const [gridSize, setGridSize] = useState(3);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard(gridSize, 10);
      setScores(data.scores || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [gridSize]);

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: '#1e293b', color: 'white' }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents sx={{ color: '#fbbf24' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Leaderboard
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={gridSize}
              onChange={(e) => setGridSize(e.target.value)}
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
              }}
            >
              <MenuItem value={3}>3x3</MenuItem>
              <MenuItem value={4}>4x4</MenuItem>
              <MenuItem value={5}>5x5</MenuItem>
            </Select>
          </FormControl>

          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={fetchLeaderboard}
            sx={{ color: '#94a3b8' }}
          >
            Refresh
          </Button>
        </Box>

        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : scores.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#94a3b8', p: 3 }}>
              No scores yet. Be the first!
            </Typography>
          ) : (
            <List>
              {scores.map((score, index) => (
                <ListItem
                  key={score._id || index}
                  sx={{
                    bgcolor: '#0f172a',
                    borderRadius: 1,
                    mb: 1,
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 100px 80px',
                    gap: 2,
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : index === 2 ? '#fb923c' : '#6366f1'
                    }}
                  >
                    #{index + 1}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {score.playerName}
                  </Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {formatTime(score.time)}
                  </Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {score.moves} moves
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default Leaderboard;
