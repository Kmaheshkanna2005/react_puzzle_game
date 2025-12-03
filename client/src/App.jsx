import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Alert,
  Snackbar
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PuzzleBoard from './components/PuzzleBoard';
import Controls from './components/Controls';
import StatsDisplay from './components/StatsDisplay';
import Leaderboard from './components/Leaderboard';
import VictoryModal from './components/VictoryModal';
import { uploadImage, saveScore } from './services/api';
import {
  shuffleTiles,
  canMoveTile,
  checkWin
} from './utils/puzzleSolver';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
});

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [tiles, setTiles] = useState([]);
  const [emptyPos, setEmptyPos] = useState({ row: 0, col: 0 });
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isImagePuzzle, setIsImagePuzzle] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);

  // Initialize game
  const initializeGame = useCallback(() => {
    stopTimer();
    const { tiles: newTiles, emptyPos: newEmptyPos } = shuffleTiles(gridSize);
    setTiles(newTiles);
    setEmptyPos(newEmptyPos);
    setMoves(0);
    setTime(0);
    setIsGameActive(false);
    toast.success('New game started!');
  }, [gridSize]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer
  const startTimer = () => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  // Handle tile click
  const handleTileClick = (row, col) => {
    if (!canMoveTile(row, col, emptyPos)) return;

    if (!isGameActive) {
      startTimer();
      setIsGameActive(true);
    }

    const newTiles = tiles.map(r => [...r]);
    newTiles[emptyPos.row][emptyPos.col] = newTiles[row][col];
    newTiles[row][col] = 0;

    setTiles(newTiles);
    setEmptyPos({ row, col });
    setMoves((prev) => prev + 1);

    if (checkWin(newTiles, gridSize)) {
      stopTimer();
      setIsGameActive(false);
      setShowVictory(true);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file) => {
    try {
      toast.info('Uploading image...');
      const data = await uploadImage(file);
      setCurrentImage(data.image);
      setImageId(data.imageId);
      setIsImagePuzzle(true);
      toast.success('Image uploaded successfully!');
      initializeGame();
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Upload error:', error);
    }
  };

  // Save score
  const handleSaveScore = async (playerName) => {
    try {
      await saveScore({
        playerName,
        time,
        moves,
        gridSize,
        imageType: isImagePuzzle ? 'custom' : 'default',
        imageId: imageId
      });
      toast.success('Score saved to leaderboard!');
      setShowVictory(false);
    } catch (error) {
      toast.error('Error saving score');
      console.error('Save error:', error);
    }
  };

  // Show hint
  const handleHint = () => {
    toast.info('💡 Try moving tiles adjacent to the empty space!');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              🧩 Slider Puzzle Game
            </Typography>
            <Typography variant="h6" sx={{ color: '#94a3b8' }}>
              Solve the puzzle by arranging tiles in order
            </Typography>
          </Box>

          {/* Main Game Area */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Left Column - Controls & Stats */}
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Controls
                  gridSize={gridSize}
                  onGridSizeChange={(size) => {
                    setGridSize(size);
                    setIsImagePuzzle(false);
                    setCurrentImage(null);
                  }}
                  onNewGame={initializeGame}
                  onReset={initializeGame}
                  onHint={handleHint}
                  onImageUpload={handleImageUpload}
                />
                <StatsDisplay time={time} moves={moves} />
              </Box>
            </Grid>

            {/* Center - Puzzle Board */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PuzzleBoard
                  tiles={tiles}
                  gridSize={gridSize}
                  onTileClick={handleTileClick}
                  currentImage={currentImage}
                  isImagePuzzle={isImagePuzzle}
                />
              </Box>
            </Grid>

            {/* Right Column - Leaderboard */}
            <Grid item xs={12} md={3}>
              <Leaderboard />
            </Grid>
          </Grid>

          {/* Victory Modal */}
          <VictoryModal
            open={showVictory}
            time={time}
            moves={moves}
            onSave={handleSaveScore}
            onClose={() => setShowVictory(false)}
          />
        </Container>
      </Box>
      <ToastContainer theme="dark" position="top-right" />
    </ThemeProvider>
  );
}

export default App;
