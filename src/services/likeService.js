import axios from 'axios';

const API_BASE = 'http://localhost:8080/likes';

export default {
  async isLiked(username, imageId) {
    return axios.get(`${API_BASE}/${username}/${imageId}`);
  },
  async likeImage(username, imageId) {
    return axios.post(`${API_BASE}/${username}/${imageId}`);
  },
  async unlikeImage(username, imageId) {
    return axios.delete(`${API_BASE}/${username}/${imageId}`);
  },
};
