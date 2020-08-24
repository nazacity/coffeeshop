import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  common: {
    color: {
      navColor: '#9575cd',
      white: '#fff',
    },
  },
  layer: {
    maxWidth: '1000px',
  },
  palette: {
    primary: {
      main: '#6a1b9a',
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
