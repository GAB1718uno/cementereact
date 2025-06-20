// src/services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cementerio.com.es:4000/api';

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  return fetch(`${API_BASE_URL}${url}`, { ...options, headers });
};