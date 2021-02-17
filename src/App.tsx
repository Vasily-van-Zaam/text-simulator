import React from 'react';
import {
  Container
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider } from '@material-ui/core/styles'
import customTheme from './theme/custom_theme';
import styleApp from './theme/styleApp';
import TextSimulator from './components/textSimulator';
// import config from './config.json';
// import { Height } from '@material-ui/icons';



function App() {
  const classes = styleApp();

  const [currentKeyword, setCurrentKeyword] = React.useState('');

  React.useEffect(() => {
    document.addEventListener("keypress", (e) => {
      setCurrentKeyword(e.key );
    });
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.appContent}>
        <Container>
          <TextSimulator keyword={currentKeyword} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
