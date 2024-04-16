import { _apiService } from './APIService'; // Assuming _apiService includes generic post, get, etc.
import { AUTH_API_BASE_URL } from './APIConfig';

// Endpoint definitions
const ENDPOINTS = {
  register: 'Register',
  login: 'GetOTPByLoginAsync',
  forgotPassword: 'Auth/ForgotPassword',
  resetPassword: 'Auth/ResetPasswordAsync',
  verifyOTP: 'Auth/VerifyOTP'
};

export const AuthService = {
  async Register(userData) {
    return await _apiService.post(AUTH_API_BASE_URL,ENDPOINTS.register, userData);
  },

  async Login(credentials) {
    return _apiService.post(AUTH_API_BASE_URL, ENDPOINTS.login, credentials);
  },
  
  async ForgotPassword(data) {
    return await _apiService.post(AUTH_API_BASE_URL,ENDPOINTS.forgotPassword, data);
  },

  async ResetPassword(data) {
    return await _apiService.post(AUTH_API_BASE_URL, ENDPOINTS.resetPassword, data);
  },

  async VerifyOTP(data) {
    return await _apiService.post(AUTH_API_BASE_URL, ENDPOINTS.verifyOTP, data);
  },

  // Additional authentication-related methods...
};
