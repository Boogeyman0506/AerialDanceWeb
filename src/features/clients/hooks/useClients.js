import { useState, useEffect } from 'react';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  // Paginacion y filtros
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    sortBy: 'firstName',
    sortOrder: 'asc'
  });

  const [filters, setFilters] = useState({
    search: '',
    classLevel: '',
    state: '',
    active: true
  })

  // Obtener lista de clientes
  const fetchClients = async (customPagination = pagination, customFilters = filters) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        ...customPagination,
        ...customFilters
      };

      const response = await clientsService.fetchClients(params);

      setClients(response.data || []);
      setTotalRecords(response.total || 0);
    } catch (err) {
      setError(err.message || 'Erro al cargar los clientes');
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo cliente
  // Crear nuevo cliente
  const createClients = async (clientsData) => {
    setLoading(true);
    setError(null);

    try {
      const newClients = await clientsService.createClients(clientsData);

      // Actualizar la lista local
      setClients(prev => [newClients, ...prev]);
      setTotalRecords(prev => prev + 1);

      return { success: true, data: newClients };
    } catch (err) {
      const errorMessage = err.message || 'Error al crear el cliente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cliente
  const updateClients = async (id, clientsData) => {
    setLoading(true);
    setError(null);

    try {
      const updateClients = await clientsService.updateClients(id, clientsData);

      // Actualizar local
      setClients(prev =>
        prev.map(clients =>
          clients.id === id ? updateClients : clients
        )
      );

      return { success: true, data: updateClients };
    } catch {
      const errorMessage = err.message || 'Error al actualizar el cliente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar cliente
  const deleteCliente = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await clientesService.deleteCliente(id);

      // Actualizar la lista local
      setClientes(prev => prev.filter(cliente => cliente.id !== id));
      setTotalRecords(prev => prev - 1);

      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Error al eliminar el cliente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Obtener cliente por ID
  const getClienteById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const cliente = await clientesService.getClienteById(id);
      return { success: true, data: cliente };
    } catch (err) {
      const errorMessage = err.message || 'Error al cargar el cliente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cambiar página
  const changePage = (newPage) => {
    const newPagination = { ...pagination, page: newPage };
    setPagination(newPagination);
    fetchClientes(newPagination, filters);
  };

  // Cambiar tamaño de página
  const changePageSize = (newSize) => {
    const newPagination = { ...pagination, size: newSize, page: 0 };
    setPagination(newPagination);
    fetchClientes(newPagination, filters);
  };

  // Cambiar ordenamiento
  const changeSort = (sortBy, sortOrder) => {
    const newPagination = { ...pagination, sortBy, sortOrder, page: 0 };
    setPagination(newPagination);
    fetchClientes(newPagination, filters);
  };

  // Aplicar filtros
  const applyFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    const resetPagination = { ...pagination, page: 0 };

    setFilters(updatedFilters);
    setPagination(resetPagination);
    fetchClientes(resetPagination, updatedFilters);
  };

  // Limpiar filtros
  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      classLevel: '',
      state: '',
      active: true
    };
    const resetPagination = { ...pagination, page: 0 };

    setFilters(defaultFilters);
    setPagination(resetPagination);
    fetchClientes(resetPagination, defaultFilters);
  };

  // Buscar clientes
  const searchClientes = (searchTerm) => {
    applyFilters({ search: searchTerm });
  };

  // Refrescar lista
  const refreshClientes = () => {
    fetchClientes(pagination, filters);
  };

  // Limpiar errores
  const clearError = () => {
    setError(null);
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []); // Solo se ejecuta una vez al montar


  return {
    // Estados
    clientes,
    loading,
    error,
    totalRecords,
    pagination,
    filters,

    // Métodos CRUD
    createCliente,
    updateCliente,
    deleteCliente,
    getClienteById,

    // Métodos de navegación y filtros
    changePage,
    changePageSize,
    changeSort,
    applyFilters,
    clearFilters,
    searchClientes,

    // Métodos utilitarios
    refreshClientes,
    clearError,
    fetchClientes
  };
}
