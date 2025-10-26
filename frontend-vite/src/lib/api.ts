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
    ...options.headers,
  };

  // N'ajouter Content-Type que si ce n'est pas un FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

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
  const body = data instanceof FormData ? data : JSON.stringify(data);
  
  const response = await apiRequest(endpoint, {
    method: 'POST',
    body: body,
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
  const body = data instanceof FormData ? data : JSON.stringify(data);
  
  const response = await apiRequest(endpoint, {
    method: 'PUT',
    body: body,
  });
  
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Méthode DELETE
 */
export const apiDelete = async <T>(endpoint: string): Promise<T | null> => {
  const response = await apiRequest(endpoint, { method: 'DELETE' });
  
  if (!response.ok) {
    throw new Error(`Erreur API: ${response.statusText}`);
  }
  
  // Si la réponse est vide (204 No Content), retourner null
  const text = await response.text();
  if (!text) return null as T | null;
  
  return JSON.parse(text);
};

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
};