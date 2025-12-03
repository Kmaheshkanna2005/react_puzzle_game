import React from 'react';
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Typography
} from '@mui/material';
import {
  RestartAlt,
  PlayArrow,
  Lightbulb,
  Upload
} from '@mui/icons-material';

const Controls = ({
  gridSize,
  onGridSizeChange,
  onNewGame,
  onReset,
  onHint,
  onImageUpload
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: '#1e293b', color: 'white' }}>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ color: '#94a3b8', fontWeight: 600 }}>
          Game Controls
        </Typography>

        <FormControl fullWidth>
          <InputLabel sx={{ color: '#94a3b8' }}>Grid Size</InputLabel>
          <Select
            value={gridSize}
            onChange={(e) => onGridSizeChange(e.target.value)}
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
            }}
          >
            <MenuItem value={3}>3x3 (Easy)</MenuItem>
            <MenuItem value={4}>4x4 (Medium)</MenuItem>
            <MenuItem value={5}>5x5 (Hard)</MenuItem>
          </Select>
        </FormControl>

        <Button
          component="label"
          variant="outlined"
          startIcon={<Upload />}
          fullWidth
          sx={{
            color: '#10b981',
            borderColor: '#10b981',
            '&:hover': { borderColor: '#059669', bgcolor: 'rgba(16, 185, 129, 0.1)' }
          }}
        >
          Upload Custom Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          onClick={onNewGame}
          fullWidth
          sx={{
            bgcolor: '#6366f1',
            '&:hover': { bgcolor: '#4f46e5' }
          }}
        >
          New Game
        </Button>

        <Button
          variant="contained"
          startIcon={<RestartAlt />}
          onClick={onReset}
          fullWidth
          sx={{
            bgcolor: '#475569',
            '&:hover': { bgcolor: '#64748b' }
          }}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          startIcon={<Lightbulb />}
          onClick={onHint}
          fullWidth
          sx={{
            bgcolor: '#10b981',
            '&:hover': { bgcolor: '#059669' }
          }}
        >
          Show Hint
        </Button>
      </Stack>
    </Paper>
  );
};

export default Controls;
