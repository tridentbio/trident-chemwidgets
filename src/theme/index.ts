import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#384E77',
        },
        secondary: {
            main: '#8BBEB2',
        },
    },
    typography: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
});

export default theme;