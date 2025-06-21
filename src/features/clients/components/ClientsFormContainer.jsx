import { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ClientsForm } from './ClientsForm';  // o import ClientsForm from './ClientsForm';
import { useCreateClients } from '../hooks/useCreateClients';
import { clientsValidation } from '../utils/clientsValidation';

export const ClientsFormContainer = ({ onSuccess = null, onCancel = null }) => {
  const toast = useRef(null);
  const { createClients, loading, error, success } = useCreateClients();
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (formData) => {

    // Validar formulario
    const errors = clientsValidation.validateClientsData(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'Por favor corrige los errores en el formulario',
        life: 5000
      });
      return;
    }

    // Intentar crear cliente
    const result = await createClients(formData);

    if (result.success) {
      toast.current?.show({
        severity: 'success',
        summary: 'Éxito',
        detail: result.message || 'Cliente creado exitosamente',
        life: 5000
      });

      setValidationErrors({});

      // Callback de éxito
      if (onSuccess) {
        onSuccess(result.data);
      }
    } else {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: result.error || 'Error al crear el cliente',
        life: 5000
      });

      if (result.validationErrors) {
        setValidationErrors(result.validationErrors);
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <Toast ref={toast} />

      <ClientsForm
        validationErrors={validationErrors}
        loading={loading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};