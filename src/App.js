import React from 'react';
import './App.css';
import Home from '../src/components/home';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E91E63',
    },
    secondary: {
      main: '#009688',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
