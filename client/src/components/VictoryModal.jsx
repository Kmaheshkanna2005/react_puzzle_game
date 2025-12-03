import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import { formatTime } from '../utils/puzzleSolver';

const VictoryModal = ({ open, time, moves, onSave, onClose }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSave = () => {
    onSave(playerName || 'Anonymous');
    setPlayerName('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1e293b',
          color: 'white',
          borderRadius: 2
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <EmojiEvents sx={{ fontSize: 60, color: '#fbbf24' }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          🎉 Congratulations!
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 3, color: '#94a3b8' }}>
          You solved the puzzle in {formatTime(time)} with {moves} moves!
        </Typography>

        <TextField
          fullWidth
          label="Enter Your Name"
          variant="outlined"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Anonymous"
          inputProps={{ maxLength: 50 }}
          sx={{
            '& .MuiInputLabel-root': { color: '#94a3b8' },
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: '#334155' },
              '&:hover fieldset': { borderColor: '#475569' },
              '&.Mui-focused fieldset': { borderColor: '#6366f1' },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#94a3b8',
            borderColor: '#334155',
            '&:hover': { borderColor: '#475569' }
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            bgcolor: '#6366f1',
            '&:hover': { bgcolor: '#4f46e5' }
          }}
        >
          Save Score
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VictoryModal;
