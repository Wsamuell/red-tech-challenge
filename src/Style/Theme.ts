import { createTheme } from '@mui/material/styles';

// replacing the theme mui provides automatically
export const theme = createTheme({
  palette: {
    primary: {
      light: '#f5f5f5',
      main: '#eeeeee',
      dark: '#bdbdbd',
      contrastText: '#616161',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
