import React from 'react';
import { Box, Typography } from '@mui/material';
import layoutStyles from '../../styles/LayoutStyles';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const styles = layoutStyles(theme);
  return (
    <Box
      sx={styles.footer}
    >
      <Typography variant="body2">&copy; 2024 Veci App - Miller Alvarez. Todos los derechos reservados.</Typography>
    </Box>
  );
};

export default Footer;
