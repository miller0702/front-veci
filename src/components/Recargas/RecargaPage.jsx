import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Modal from '../Modales/Modal';
import clienteAxios from '../../services/clienteAxios';
import { Add, Delete, Edit, PictureAsPdf, RemoveRedEye, Search } from '@mui/icons-material';
import tableStyles from '../../styles/TableStyle';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../Alertas/Alert';
import Loader from '../Loader/Loader';
import RefreshRounded from '@mui/icons-material/RefreshRounded';

const RecargasPage = () => {
  const { theme } = useTheme();
  const styles = tableStyles(theme);
  const [recharges, setRecharges] = useState([]);
  const [filteredRecharges, setFilteredRecharges] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [currentRecharge, setCurrentRecharge] = useState({
    cellPhone: '',
    value: '',
    supplierId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [rechargeIdToDelete, setRechargeIdToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    fetchRecharges();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const filtered = recharges.filter((recharge) =>
      recharge.cellPhone.toLowerCase().includes(searchText.toLowerCase()) ||
      recharge.supplierName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRecharges(filtered);
  }, [searchText, recharges]);


  const fetchSuppliers = async () => {
    try {
      const response = await clienteAxios.get('/getSuppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error al obtener los proveedores', error);
    }
  };

  useEffect(() => {
    if (suppliers.length > 0) {
      fetchRecharges();
    }
  }, [suppliers]);

  const fetchRecharges = async () => {
    setIsLoading(true);
    try {
      const response = await clienteAxios.get('/transacciones');
      const rechargesWithSupplierNames = response.data.map((recharge, index) => {
        const supplier = suppliers.find((s) => s.id === recharge.supplierId);
        return {
          ...recharge,
          supplierName: supplier ? supplier.name : 'Sin proveedor',
          sequentialID: index + 1
        };
      });
      setRecharges(rechargesWithSupplierNames);
      setFilteredRecharges(rechargesWithSupplierNames);
    } catch (error) {
      console.error('Error al obtener los recargas', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Proveedor no encontrado';
  };


  const handleOpenModal = (recharge = null) => {
    if (recharge) {
      setModalTitle('Editar Recarga');
      setCurrentRecharge(recharge);
      setIsEditing(true);
    } else {
      setModalTitle('Crear Nueva Recarga');
      setCurrentRecharge({
        cellPhone: '',
        value: '',
        supplierId: '',
      });
      setIsEditing(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const validateFields = () => {
    const { cellPhone, value, supplierId } = currentRecharge;
    let isValid = true;

    if (!cellPhone) {
      setAlertMessage('El número de teléfono es obligatorio.');
      isValid = false;
    } else if (!/^\d{10}$/.test(cellPhone)) {
      setAlertMessage('El número de teléfono debe tener 10 dígitos.');
      isValid = false;
    }

    if (!value) {
      setAlertMessage('El valor es obligatorio.');
      isValid = false;
    } else if (isNaN(value) || value <= 0) {
      setAlertMessage('El valor debe ser un número positivo.');
      isValid = false;
    } else if (value < 1000 || value > 100000) {
      setAlertMessage('El valor de la recarga debe estar entre 1000 y 100000.');
      isValid = false;
    }

    if (!supplierId) {
      setAlertMessage('Debes seleccionar un proveedor.');
      isValid = false;
    }

    if (!isValid) {
      setAlertType('error');
      setOpenAlert(true);
    }

    return isValid;
  };

  const handleSaveRecharge = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      if (isEditing) {
        await clienteAxios.put(`/buy/${currentRecharge.transactionalID}`, currentRecharge);
        setAlertMessage('Recarga actualizada exitosamente');
      } else {
        await clienteAxios.post('/buy', currentRecharge);
        setAlertMessage('Recarga realizada exitosamente');
      }
      setAlertType('success');
      setOpenAlert(true);
      fetchRecharges();
      handleCloseModal();
    } catch (error) {
      setAlertMessage('Error al guardar el recarga');
      setAlertType('error');
      setOpenAlert(true);
    }
  };


  const handleOpenDeleteModal = (transactionalID) => {
    setRechargeIdToDelete(transactionalID);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setRechargeIdToDelete(null);
  };

  const handleOpenViewModal = (recharge) => {
    setCurrentRecharge(recharge);
    setModalTitle('Detalles del Recarga');
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleConfirmDelete = async () => {
    if (rechargeIdToDelete) {
      try {
        await clienteAxios.delete(`/buy/${rechargeIdToDelete}`);
        setAlertMessage('Recarga eliminada exitosamente');
        setAlertType('success');
        setOpenAlert(true);
        fetchRecharges();
      } catch (error) {
        setAlertMessage('Error al eliminar el recarga');
        setAlertType('error');
        setOpenAlert(true);
      } finally {
        handleCloseDeleteModal();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecharge((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleOpenTicket = async (recharge) => {
    try {
      const response = await fetch(`https://back-veci.onrender.com/api/transaccion/${recharge.transactionalID}/ticket`, {
        method: 'GET',
      });
  
      if (!response.ok) throw new Error(`Error: ${response.status}`);
  
      const contentType = response.headers.get('Content-Type');
      if (contentType !== 'application/pdf') {
        throw new Error(`Unexpected content type: ${contentType}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `ticket_${recharge.transactionalID}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };
  
  


  const formatPhoneNumber = (cellPhone) => {
    if (cellPhone.length === 10) {
        return `(${cellPhone.substring(0, 3)}) ${cellPhone.substring(3, 6)} - ${cellPhone.substring(6)}`;
    }
    return cellPhone;
};

const formatPrice = (value) => {
  if (value !== null && value !== undefined) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  return value;
};


  
  const columns = [
    { field: 'sequentialID', headerName: '#', flex: 0.5 },
    {
      field: 'supplierName',
      headerName: 'PROVEEDOR',
      flex: 1,
      renderCell: (params) => (
        <div style={{ textTransform: 'uppercase' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cellPhone',
      headerName: 'TELEFONO',
      flex: 1,
      renderCell: (params) => (
          <div style={{ textTransform: 'uppercase' }}>
              {formatPhoneNumber(params.value)}
          </div>
      ),
  },
  
  {
    field: 'value',
    headerName: 'VALOR',
    flex: 1,
    renderCell: (params) => {
      const cuposValue = params.value;
      let color;

      if (cuposValue < 1000) {
        color = 'orange';
      } else if (cuposValue >= 1000 && cuposValue <= 5000) {
        color = 'green';
      } else {
        color = 'cyan';
      }

      return (
        <Box style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: 4,
          width: '80px',
          height: '40px',
          backgroundColor: color,
          color: 'white',
          borderRadius: '5px',
        }}>
          {formatPrice(cuposValue)}
        </Box>
      );
    },
  },
    {
      field: 'actions',
      headerName: 'ACCIONES',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenViewModal(params.row)}>
            <RemoveRedEye color="primary" />
          </Button>
          <Button onClick={() => handleOpenTicket(params.row)}>
            <PictureAsPdf color="error" />
          </Button>
          {/* <Button onClick={() => handleOpenModal(params.row)}>
            <Edit color='warning' />
          </Button>
          <Button onClick={() => handleOpenDeleteModal(params.row.transactionalID)}>
            <Delete color="error" />
          </Button> */}
        </>
      ),
    },
  ];

  return (
    <Grid container style={styles.pages}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Typography variant='h4' style={styles.text}>RECARGAS</Typography>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item spacing={2}>
              <Button
                variant="contained"
                style={styles.button}
                onClick={() => handleOpenModal(null)}
                startIcon={<Add />}
              >
                Crear Recarga
              </Button>

              <Button
                variant="outlined"
                style={{ ...styles.button, marginLeft: 4 }}
                onClick={fetchRecharges}
                startIcon={<RefreshRounded />}
              >
                Refrescar
              </Button>
            </Grid>
            <Grid item>
              <TextField
                label="Buscar recarga"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{ ...styles.textField }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search style={styles.iconButton} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box style={{ height: 600, width: '100%', marginTop: '20px' }}>
            <DataGrid
              rows={filteredRecharges.slice(0, 50)}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              disableSelectionOnClick
              pagination
              getRowId={(row) => row.transactionalID}
              localeText={{
                MuiTablePagination: {
                  labelRowsPerPage: 'Filas por página:',
                  labelDisplayedRows: ({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
                },
                toolbarFilters: 'Filtros',
                filterPanelOperators: 'Operadores',
                filterPanelInputPlaceholder: 'Valor',
                filterPanelColumns: 'Columnas',
                filterOperatorContains: 'Contiene',
                filterOperatorEquals: 'Igual a',
                filterOperatorStartsWith: 'Empieza con',
                filterOperatorEndsWith: 'Termina con',
                filterOperatorIsEmpty: 'Está vacío',
                filterOperatorIsNotEmpty: 'No está vacío',
                filterOperatorIsAnyOf: 'Es cualquiera de',
                columnMenuLabel: 'Menú',
                columnMenuShowColumns: 'Mostrar columnas',
                columnMenuFilter: 'Filtro',
                columnMenuHideColumn: 'Ocultar',
                columnMenuUnsort: 'Quitar orden',
                columnMenuSortAsc: 'Orden ascendente',
                columnMenuSortDesc: 'Orden descendente',
                columnMenuManageColumns: 'Gestionar columnas',
              }}
              sx={styles.table}
            />
          </Box>

          <CustomAlert
            open={openAlert}
            handleClose={handleCloseAlert}
            message={alertMessage}
            severity={alertType}
          />

          <Modal
            open={openDeleteModal}
            title="Confirmar Eliminación"
            content="¿Estás seguro de que deseas eliminar esta recarga?"
            actions={[
              { label: 'Cancelar', onClick: handleCloseDeleteModal, color: 'primary' },
              { label: 'Eliminar', onClick: handleConfirmDelete, color: 'error' }
            ]}
            handleClose={handleCloseDeleteModal}
          />

          <Modal
            open={openViewModal}
            title={modalTitle}
            handleClose={handleCloseViewModal}
            content={
              currentRecharge && (
                <Box>
                  <p><strong>Proveedor:</strong> {getSupplierName(currentRecharge.supplierId)}</p>
                  <p><strong>Telefono:</strong> {formatPhoneNumber(currentRecharge.cellPhone)}</p>
                  <p><strong>Valor:</strong> {formatPrice(currentRecharge.value)}</p>
                </Box>
              )
            }
          />

          <Modal
            open={openModal}
            title={modalTitle}
            content={
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Número de Teléfono"
                      name="cellPhone"
                      value={currentRecharge.cellPhone}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <TextField
                      label="Valor de la Recarga"
                      name="value"
                      type="number"
                      value={currentRecharge.value}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth margin="normal" sx={styles.textField}>
                      <InputLabel>Proveedor</InputLabel>
                      <Select
                        name="supplierId"
                        value={currentRecharge.supplierId}
                        onChange={handleInputChange}
                      >
                        {suppliers.map((supplier) => (
                          <MenuItem key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            }
            actions={[
              { label: 'Guardar', onClick: handleSaveRecharge, color: 'primary' },
              { label: 'Cancelar', onClick: handleCloseModal, color: 'error' }
            ]}
            handleClose={handleCloseModal}
          />
        </>
      )}
    </Grid>
  );
};

export default RecargasPage;
