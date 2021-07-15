import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  common: {
    color: {
      navColor: '#9575cd',
      white: '#fff',
    },
    shadow: {
      black: '0px 0px 5px 1px rgba(0,0,0,0.2)',
      main: '0px 0px 5px 3px rgba(169,120,67,0.5)',
    },
  },
  layer: {
    maxwidth: '1000px',
    minwidth: '400px',
    maxwidthMb: '900px',
    minwidthMb: '400px',
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
