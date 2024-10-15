import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import clienteAxios from '../../services/clienteAxios';
import layoutStyles from '../../styles/LayoutStyles';
import { useTheme } from '../../context/ThemeContext';
import CustomAlert from '../Alertas/Alert';

const Dashboard = () => {
  const { theme } = useTheme();
  const styles = layoutStyles(theme);
  const [cellPhone, setCellPhone] = useState('');
  const [value, setValue] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await clienteAxios.get('/getSuppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error al obtener los proveedores', error);
    }
  };

  const validateFields = () => {
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

  const handleRecharge = async () => {
    if (!validateFields()) {
      return;
    }
  
    try {
      const response = await clienteAxios.post('/buy', {
        cellPhone,
        value,
        supplierId,
      });
  
      const ticketResponse = await fetch(`https://back-veci.onrender.com/api/transaccion/${response.data.transactionalID}/ticket`, {
        method: 'GET',
      });
  
      if (!ticketResponse.ok) throw new Error('Error al obtener el ticket');
  
      const blob = await ticketResponse.blob();
      const url = window.URL.createObjectURL(blob);
      setTicketData(url);
      setOpenTicketModal(true);
  
      setCellPhone('');
      setValue('');
      setSupplierId('');
      setAlertMessage('Recarga realizada exitosamente');
      setAlertType('success');
      setOpenAlert(true);
    } catch (error) {
      console.error('Error al realizar la recarga:', error);
      setAlertMessage('Error al realizar la recarga');
      setAlertType('error');
      setOpenAlert(true);
    }
  };
  
  const handleCloseTicketModal = () => {
    setOpenTicketModal(false);
    setTicketData(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Card style={styles.card}>
      <CardContent>
        <Typography variant="h5" style={styles.text}>Bienvenido al Dashboard</Typography>
        <Typography color="textSecondary" style={styles.text}>Recarga aquí tu teléfono.</Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Número de Teléfono"
                value={cellPhone}
                onChange={(e) => setCellPhone(e.target.value)}
                fullWidth
                required
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Valor de la Recarga"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                required
                sx={styles.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required sx={styles.textField}>
                <InputLabel id="supplier-label">Proveedor</InputLabel>
                <Select
                  labelId="supplier-label"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  displayEmpty
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleRecharge} style={styles.button}>
                Realizar Recarga
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      <Modal open={openTicketModal} onClose={handleCloseTicketModal} maxWidth="lg">
        <Box sx={styles.modal}>
          <Typography variant="h6">Ticket de Recarga</Typography>
          {ticketData && (
            <iframe
              src={ticketData}
              title="Ticket"
              style={{ width: '100%', height: '500px', border: 'none' }}
            />
          )}
          <br />
          <Button onClick={handleCloseTicketModal} style={styles.button}>Cerrar</Button>
        </Box>
      </Modal>

      <CustomAlert
        message={alertMessage}
        type={alertType}
        open={openAlert}
        onClose={handleCloseAlert}
      />
    </Card>
  );
};

export default Dashboard;
