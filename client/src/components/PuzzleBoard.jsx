import React from 'react';
import { Box, Paper } from '@mui/material';
import { canMoveTile, isCorrectPosition } from '../utils/puzzleSolver';

const PuzzleBoard = ({ tiles, gridSize, onTileClick, currentImage, isImagePuzzle }) => {
  const tileSize = Math.min(600 / gridSize, (window.innerWidth - 100) / gridSize);
  const boardSize = tileSize * gridSize;

  return (
    <Paper
      elevation={8}
      sx={{
        width: boardSize,
        height: boardSize,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: 0.5,
        p: 0.5,
        bgcolor: '#334155',
        borderRadius: 2,
      }}
    >
      {tiles.map((row, rowIndex) =>
        row.map((tileValue, colIndex) => {
          const isEmpty = tileValue === 0;
          const isCorrect = isCorrectPosition(rowIndex, colIndex, tileValue, gridSize);

          return (
            <Box
              key={`${rowIndex}-${colIndex}`}
              onClick={() => !isEmpty && onTileClick(rowIndex, colIndex)}
              sx={{
                aspectRatio: '1',
                bgcolor: isEmpty ? 'transparent' : '#475569',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isImagePuzzle ? 0 : `${tileSize / 3}px`,
                fontWeight: 700,
                color: 'white',
                cursor: isEmpty ? 'default' : 'pointer',
                userSelect: 'none',
                transition: 'all 0.2s ease',
                backgroundImage: isImagePuzzle && !isEmpty ? `url(${currentImage})` : 'none',
                backgroundSize: `${gridSize * 100}%`,
                backgroundPosition: isImagePuzzle && !isEmpty
                  ? `${-((tileValue - 1) % gridSize) * 100}% ${-Math.floor((tileValue - 1) / gridSize) * 100}%`
                  : 'center',
                border: isCorrect && !isEmpty ? '3px solid #10b981' : 'none',
                boxShadow: isCorrect && !isEmpty ? '0 0 15px rgba(16, 185, 129, 0.5)' : 'none',
                '&:hover': !isEmpty && {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(99, 102, 241, 0.4)',
                  zIndex: 10,
                },
                '&:active': !isEmpty && {
                  transform: 'scale(0.98)',
                },
              }}
            >
              {!isEmpty && !isImagePuzzle && tileValue}
            </Box>
          );
        })
      )}
    </Paper>
  );
};

export default PuzzleBoard;
