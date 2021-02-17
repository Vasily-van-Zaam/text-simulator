import React from 'react';
import {
  Container
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider } from '@material-ui/core/styles'
import customTheme from './theme/custom_theme';
import styleApp from './theme/styleApp';
import TextSimulator from './components/textSimulator';
import StartForm from './components/foms/StartForm';
// import config from './config.json';
// import { Height } from '@material-ui/icons';



function App() {
  const classes = styleApp();

  const [currentData, setCurrentData] = React.useState({
    keyword: '',
    newTimeEnter: 0
  });

  React.useEffect(() => {
    document.addEventListener("keypress", (e) => {
      console.log('enter: ', e.key);
      
      setCurrentData({
        keyword: e.key,
        newTimeEnter: new Date().getTime()
      });
    });
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.appContent}>
        <Container>
          <StartForm/>
          <TextSimulator keyword={currentData.keyword} newTimeEnter={currentData.newTimeEnter}/>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
