const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

const api = {
  baseUrl: API_URL,
  wsUrl: WS_URL,

  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
      throw new Error(error.message || `Erro ${response.status}`);
    }

    return response.json();
  },

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  },

  post(endpoint: string, data?: unknown) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put(endpoint: string, data: unknown) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  },

  async upload(endpoint: string, file: File, fieldName = 'file') {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload falhou: ${response.status}`);
    }

    return response.json();
  },
};

export default api;
export { API_URL, WS_URL };