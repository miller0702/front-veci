import React from 'react';
import themeColors from "../utils/Colors";


const layoutStyles = (theme) => {
    const colors = themeColors[theme];
    return {
        layout: {
            backgroundColor: colors.background,
            display: 'flex',
            height: '100vh'
        },
        appBar: {
            alignItems: 'end',
            backgroundColor: colors.background,
            boxShadow: 'none',
        },
        toolbar: {
            ml: { xs: 0, sm: 30 },
            textAlign: 'right',
            padding: '0 16px',
            justifyContent: 'space-between'
        },
        main: {
            flexGrow: 1,
            p: 3,
            mt: 8,
            ml: { xs: 0, sm: 30 },
            right: 0,
            transition: 'margin 0.3s',
        },
        card:{
            backgroundColor:colors.background
        },

        textField: {
            borderRadius: '30px',
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: colors.inputBorder,
                },
                '&:hover fieldset': {
                    borderColor: colors.inputHover,
                },
                '&.Mui-focused fieldset': {
                    borderColor: colors.inputFocused,
                },
                backgroundColor: colors.inputBackground,
            },
            '& .MuiInputLabel-root': {
                color: colors.text,
                '&.Mui-focused': {
                    color: colors.text
                },
            },
            '& .MuiInputBase-input': {
                color: colors.text,
            },
            width: '100%'
        },

        button: {
            backgroundColor: colors.primary,
            color: colors.buttonText,
            fontWeight: 'bold',
        },

        modal:{
            p: 2,
            bgcolor: 'white',
            borderRadius: 1,
            width: '700px',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },

        icon: {
            color: colors.primary,
            transition: 'transform 0.2s, font-size 0.2s',
            '&:hover': {
                transform: 'scale(1.1)',
                fontSize: '1.1rem',
            },
        },

        text: {
            color: colors.text,
            transition: 'transform 0.2s, font-size 0.2s',
            '&:hover': {
                transform: 'scale(1.1)',
                fontSize: '1.1rem',
            },
        },

        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            flexDirection: 'column',
            margin: 10,
            borderRadius: 20
        },

        logo: {
            width: '80%',
            objectFit: 'cover',
        },

        footer: {
            bgcolor: colors.background,
            color: colors.text,
            textAlign: 'center',
            paddingBlock: 2,
            position: 'relative',
            bottom: 0,
            width: '100%',
        }
    };
};

export default layoutStyles;
