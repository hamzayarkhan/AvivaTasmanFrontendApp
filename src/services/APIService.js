// APIService.js
import axios from 'axios';


export const _apiService = {
  async post(base_url,endpoint, data) {
    try {
      console.log(`${base_url}/${endpoint}`)
      const response = await axios.post(`${base_url}/${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async get(base_url, endpoint, params = {}) {
    try {
        console.log(`${base_url}/${endpoint}`);
        const response = await axios.get(`${base_url}/${endpoint}`, {
            params: params,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
  // Implement get, put, delete, etc., similarly
};
