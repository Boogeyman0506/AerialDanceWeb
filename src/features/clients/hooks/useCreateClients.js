import { useState } from 'react';
import { clientsValidation } from '../utils/clientsValidation';
import { clientsService } from '../services/clientsService';

export const useCreateClients = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createClients = async (clientsData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validar datos antes de enviar
      const validationErrors = clientsValidation.validateClientsData(clientsData);

      if (Object.keys(validationErrors).length > 0) {
        setError('Por favor corrige los errores en el formulario');
        setLoading(false);
        return {
          success: false,
          error: 'Errores de validación',
          validationErrors
        };
      }

      // Llamar directamente a la API
      const newClients = await clientsService.createClients(clientsData);

      setSuccess(true);
      setLoading(false);

      return {
        success: true,
        data: newClients,
        message: 'Cliente creado exitosamente'
      };

    } catch (err) {
      const errorMessage = err.message || 'Error al crear cliente';
      setError(errorMessage);
      setLoading(false);

      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(false);
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    createClients,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
    reset
  };
};