import React from 'react';
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  CircularProgress
} from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import HomeIcon from '@material-ui/icons/Home';
import { ThemeProvider } from '@material-ui/core/styles'
import customTheme from './theme/custom_theme';
import styleApp from './theme/styleApp';
import TextSimulator from './components/textSimulator';
import StartForm from './components/foms/StartForm';


interface LocalStorageData {
  userName?: '',
  lastResult?: '',
  hystoryResult?: ''
}

function App() {

  const classes = styleApp();

  const [valueMenu, setMenu] = React.useState(0);

  const [startState, setStartState] = React.useState({
    isStart: true,
    isLoading: true,
  });

  const [dataTextSimulator, setTextSimulator] = React.useState({
    keyword: '',
    newTimeEnter: 0
  });

  const [dataPrifile, setPrifile] = React.useState({
    userName: '',
    hystory: '',
    lastResult: ''
  });

  const handleStartForm = (userName: string) => {
    window.localStorage.setItem('userName', userName)
    setStartState({
      isStart: false,
      isLoading: false
    })
  }

  React.useEffect(() => {
    if (window.localStorage.userName) {
      setStartState({
        isStart: false,
        isLoading: false
      });
    } else {
      setStartState({
        isStart: true,
        isLoading: false
      });
    }
    document.addEventListener("keypress", (e) => {
      console.log('enter: ', e.key);

      setTextSimulator({
        keyword: e.key,
        newTimeEnter: new Date().getTime()
      });
    });
  }, []);


  const showPage = (a: JSX.Element, b: JSX.Element, c: JSX.Element) =>{
    let element = a;
    switch(valueMenu) {
      case 0: element =a; break;
      case 1: element = b; break;
      case 2: element = c; break;
    }
    return element;
  }
  
  return (
    <ThemeProvider theme={customTheme}>
      <Container fixed>
        <BottomNavigation
          value={valueMenu}
          onChange={(event, newValue) => {
            console.log(newValue);
            setMenu(newValue);
          }}
          showLabels

        >
          <BottomNavigationAction label="Тестирование"  icon={<AppsIcon />} />
          <BottomNavigationAction label="Достижения" disabled={startState.isStart} icon={<ThumbUpIcon />} />
          <BottomNavigationAction label="О нас" icon={<HomeIcon />} />
        </BottomNavigation>

      </Container>

      <div className={classes.appContent}>
        <Container>
          {startState.isLoading ?
            <CircularProgress color="secondary" className={classes.loading} /> :
            startState.isStart && valueMenu !== 2 ?
              <StartForm success={handleStartForm}/> :
              showPage(
                <TextSimulator keyword={dataTextSimulator.keyword} newTimeEnter={dataTextSimulator.newTimeEnter} />,
                <p>1</p>,
                <p>2</p>
              )      
          }
        </Container>
      </div>

    </ThemeProvider>
  );
}

export default App;
