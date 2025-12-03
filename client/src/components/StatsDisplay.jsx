import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';
import { Timer, TouchApp } from '@mui/icons-material';
import { formatTime } from '../utils/puzzleSolver';

const StatsDisplay = ({ time, moves }) => {
  return (
    <Paper elevation={3} sx={{ p: 2.5, bgcolor: '#0f172a', color: 'white' }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timer sx={{ color: '#6366f1' }} />
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
              Time:
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ color: '#6366f1', fontWeight: 700 }}>
            {formatTime(time)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TouchApp sx={{ color: '#8b5cf6' }} />
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
              Moves:
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ color: '#8b5cf6', fontWeight: 700 }}>
            {moves}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default StatsDisplay;
