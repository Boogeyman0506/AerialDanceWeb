// URL
const API_BASE_URL = 'http://localhost:5001';

// Peticiones
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const clientsService = {
  // Crear nuevo cliente
  async createClients(clientsData) {
    const url = `${API_BASE_URL}/CreateClients`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        ...defaultConfig,
        body: JSON.stringify({ clientsData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      throw error;
    }
  }
};