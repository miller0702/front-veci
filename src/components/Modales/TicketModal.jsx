import React from 'react'; 
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

const TicketModal = ({ open, onClose, ticketData }) => {
    const pdfUrl = ticketData ? `http://localhost:5000/api/transaccion/${ticketData.transactionalID}/ticket` : '';
  
    const handleLoadError = (error) => {
      console.error("Error loading PDF:", error);
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{ width: '80%', height: '80%', margin: 'auto' }}>
          <iframe
            src={pdfUrl}
            style={{ width: '100%', height: '100%' }}
            title="Ticket PDF"
            onError={handleLoadError}
          />
        </Box>
      </Modal>
    );
  };
  

export default TicketModal;
