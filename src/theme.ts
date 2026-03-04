import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shape: {
    borderRadius: 12, // កំណត់ឱ្យសមជាមួយ rounded-2xl របស់ Tailwind
  },
  palette: {
    primary: {
      main: '#667eea',
      dark: '#764ba2',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    }
  },
});
