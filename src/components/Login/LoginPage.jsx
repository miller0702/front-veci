import React, { useContext, useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import loginStyles from '../../styles/LoginStyles';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Logo from '../../assets/img/login/logo.png';

const LoginPage = () => {
    const { theme } = useTheme();
    const styles = loginStyles(theme);
    const { login, token } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ user, password });
            navigate('/dashboard');
        } catch (err) {
            setError(err?.response?.data?.message || 'Error al iniciar sesión');
        }
    };
    

    return (
        <Box style={styles.fondo}>
            <Box sx={styles.container}>
                <img src={Logo} alt="Logo de la Plataforma" style={styles.logo}/>
                <Typography variant="h4" align="center">Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                        label="User"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        sx={styles.textField}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={styles.textField}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={styles.button}>
                        Iniciar Sesión
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default LoginPage;
