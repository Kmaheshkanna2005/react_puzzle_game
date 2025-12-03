// N-Puzzle Solvability Algorithm
export const countInversions = (tiles) => {
  const flatArray = tiles.flat().filter(num => num !== 0);
  let inversions = 0;
  
  for (let i = 0; i < flatArray.length - 1; i++) {
    for (let j = i + 1; j < flatArray.length; j++) {
      if (flatArray[i] > flatArray[j]) {
        inversions++;
      }
    }
  }
  
  return inversions;
};

export const isSolvable = (tiles, emptyPos, gridSize) => {
  const inversions = countInversions(tiles);
  
  if (gridSize % 2 === 1) {
    // Odd grid: solvable if inversions are even
    return inversions % 2 === 0;
  } else {
    // Even grid: consider blank position
    const blankRowFromBottom = gridSize - emptyPos.row;
    return (inversions + blankRowFromBottom) % 2 === 1;
  }
};

export const shuffleTiles = (gridSize) => {
  let tiles = [];
  let emptyPos = { row: gridSize - 1, col: gridSize - 1 };
  let attempts = 0;
  const maxAttempts = 1000;
  
  do {
    // Create flat array
    const flatTiles = [];
    for (let i = 1; i < gridSize * gridSize; i++) {
      flatTiles.push(i);
    }
    flatTiles.push(0);
    
    // Fisher-Yates shuffle
    for (let i = flatTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flatTiles[i], flatTiles[j]] = [flatTiles[j], flatTiles[i]];
    }
    
    // Convert to 2D
    tiles = [];
    let index = 0;
    for (let row = 0; row < gridSize; row++) {
      tiles[row] = [];
      for (let col = 0; col < gridSize; col++) {
        tiles[row][col] = flatTiles[index];
        if (flatTiles[index] === 0) {
          emptyPos = { row, col };
        }
        index++;
      }
    }
    
    attempts++;
  } while (!isSolvable(tiles, emptyPos, gridSize) && attempts < maxAttempts);
  
  return { tiles, emptyPos };
};

export const canMoveTile = (row, col, emptyPos) => {
  const rowDiff = Math.abs(row - emptyPos.row);
  const colDiff = Math.abs(col - emptyPos.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

export const isCorrectPosition = (row, col, value, gridSize) => {
  const correctValue = row * gridSize + col + 1;
  return value === correctValue || 
         (value === 0 && row === gridSize - 1 && col === gridSize - 1);
};

export const checkWin = (tiles, gridSize) => {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (!isCorrectPosition(row, col, tiles[row][col], gridSize)) {
        return false;
      }
    }
  }
  return true;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
