// src/lib/api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Fonction utilitaire pour effectuer des requêtes API authentifiées
 */
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem('lateranga_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });


  // Gérer l'expiration du token
  if (response.status === 401) {
    localStorage.removeItem('lateranga_token');
    localStorage.removeItem('lateranga_user');
    window.location.href = '/auth/login';
  }

  return response;
};

/**
 * Méthode GET
 */
export const apiGet = async <T>(endpoint: string): Promise<T> => {
  const response = await apiRequest(endpoint, { method: 'GET' });
  
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Méthode POST
 */
export const apiPost = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Méthode PUT
 */
export const apiPut = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Méthode DELETE
 */
export const apiDelete = async <T>(endpoint: string): Promise<T> => {
  const response = await apiRequest(endpoint, { method: 'DELETE' });
  
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.statusText}`);
  }
  
  return response.json();
};

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
};