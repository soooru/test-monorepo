// VUE_APP_BASE_URL is set in .env.local and .env.production

import axios, { AxiosRequestConfig } from 'axios';
import { useProgressStore } from '@/stores/progress-store'; //
const progressStore = useProgressStore();

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_URL,
};

const axiosCall = axios.create(axiosConfig);

// 요청 전에 실행되는 인터셉터
axiosCall.interceptors.request.use(
  config => {
    // TODO : 여기에 원하는 로깅이나 처리를 추가.
    // console.log('Request Interceptor:', config);
    progressStore.setProgress(true);
    return config;
  },
  error => {
    // TODO : 요청이 실패했을 때의 처리를 추가.
    // console.error('Request Interceptor Error:', error);
    progressStore.setProgress(false);
    return Promise.reject(error);
  }
);

// 응답을 받았을 때 실행되는 인터셉터
axiosCall.interceptors.response.use(
  response => {
    // TODO : 여기에 원하는 로깅이나 처리를 추가.
    // console.log('Response Interceptor:', response);
    progressStore.setProgress(false);
    return response;
  },
  error => {
    // TODO : 응답이 실패했을 때의 처리를 추가.
    // console.error('Response Interceptor Error:', error);
    progressStore.setProgress(false);
    return Promise.reject(error);
  }
);

export default axiosCall;
