import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Image upload
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await axios.post(`${API_URL}/api/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// Score operations
export const saveScore = async (scoreData) => {
  const response = await api.post('/scores', scoreData);
  return response.data;
};

export const getLeaderboard = async (gridSize = 3, limit = 10) => {
  const response = await api.get('/scores/leaderboard', {
    params: { gridSize, limit }
  });
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/scores/stats');
  return response.data;
};

export default api;
