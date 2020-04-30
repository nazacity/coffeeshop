import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  common: {
    color: {
      navColor: '#a97743',
      white: '#fff',
    },
  },
  palette: {
    primary: {
      main: '#764d24',
    },
    secondary: {
      main: '#2b715d',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiLink: {
      underlineHover: {
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
