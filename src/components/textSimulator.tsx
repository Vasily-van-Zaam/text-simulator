import React from 'react';
import {
  Card, CardContent, CardActions,
  CircularProgress,
  Snackbar,
  // Button,
  Avatar,
  IconButton,
  Switch,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import styleApp from '../theme/styleApp';


const textApi = {
  ru: {
    query: 'https://fish-text.ru/get'
  }
}
interface TextSimulatorProps {
  keyword: string,
  newTimeEnter: number
}

interface User {
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  currentToken?: string;
  birthday?: string;
}

interface LetterData {
  value: string;
  className: string;
}

function Letter(props: { value: string, className?: string }): JSX.Element {
  return (
    <span className={props.className}>{props.value}</span>
  )
}

function createList(text: string,
  initClassName: string = 'init-letter',
  nextClassName: string = 'current-letter'): LetterData[] {
  const textList = text.split('');
  let list = [];
  for (let i = 0; i < textList.length; i++) {
    list.push({ value: textList[i], className: i === 0 ? nextClassName : initClassName });
  }
  return list;
}


function TextSimulator(props: TextSimulatorProps) {
  const classes = styleApp();

  const [values, setValues] = React.useState({
    errorLogin: false,
    messageError: '',
    user: {} as User,
    loading: true,
    currentText: 'А м',
    letterList: [] as LetterData[],
    passedList: [] as string[]
  });

  const [speed, setSpeed] = React.useState(0);
  const [precision, setPrecision] = React.useState(0);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageSnack, setMessageSnack] = React.useState((<p>Ok</p>));
  const [onHintError, setOnHintError] = React.useState(true);

  const handleOnHint = (e: any) => {
    if (onHintError) return setOnHintError(!e.isTrusted);
    return setOnHintError(e.isTrusted);
  }

  const handleOpenSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };
  React.useEffect(() => {

    fetch(textApi.ru.query)
      .then((response) => {
        response.json().then((data) => {
          setValues({
            ...values, loading: false,
            letterList: createList(data.text, classes.initLetter, classes.nextLetter)
          });
        })
      })
      .catch((error) => {

      })
    setValues({ ...values, loading: true });

  }, [])

  React.useEffect(() => {

    let carrentIndex = values.passedList.length - 0;
    let nextIndex = carrentIndex + 1;
    let letterList = values.letterList;
    let passedList = values.passedList;
    let currentLetter = letterList[carrentIndex];
    let nextLetter = letterList[nextIndex];


    if (currentLetter) {

      if (props.keyword === currentLetter.value) {
        console.log('===', props.keyword, currentLetter.value );
        
        if (nextLetter) {
          nextLetter.className = classes.nextLetter;
          letterList[nextIndex] = nextLetter;
        }
        currentLetter.className = classes.passedLetter;
        letterList[carrentIndex] = currentLetter;
        passedList.push(props.keyword);
        setOpenSnack(false);

      } else if (currentLetter.className !== classes.passedLetter) {
        console.log('!==', props.keyword, currentLetter.value);

        currentLetter.className = classes.errorLetter;
        letterList[carrentIndex] = currentLetter;
        if (currentLetter.value?.toLowerCase() === props.keyword && currentLetter.value !== props.keyword) {
          handleOpenSnack()
          setMessageSnack(<p>Преключитесь на заглавный шрифт</p>)
        } else if (currentLetter.value?.toUpperCase() === props.keyword && currentLetter.value !== props.keyword) {
          handleOpenSnack()
          setMessageSnack(<p style={{ textAlign: 'center' }}>Переключитесь на строчный шрифт</p>)
        } else {
          handleOpenSnack()
          setMessageSnack(
            <div style={{ textAlign: 'center' }}>
              <p >Нажмите на клавишу - "{currentLetter.value === " " ? 'Пообел' : currentLetter.value}"</p>
              <p>Вы нажали на - "{props.keyword === " " ? 'Пообел' : props.keyword}"</p>
            </div>
          )
        }
      }
      setValues({ ...values, letterList: letterList });
    }
  }, [props])

  return (
    <div>
      { values.loading ? <CircularProgress color='secondary' className={classes.loading} /> :
        <Card style={{ width: '100%' }} >
          <CardContent>
            <Avatar></Avatar>
            <div className={classes.textWrapper}>
              <div className={classes.textContent} >
                {values.letterList.map((o, i) => <Letter key={i} value={o.value} className={o.className} />)}
              </div>

              <div className={classes.textOptions}>
                <Typography>СКОРОСТЬ</Typography>
                <div>
                  <AvTimerIcon style={{ fontSize: 40 }} />
                </div>
                
                
                <Typography>ТОЧНОСТЬ</Typography>
                <div><GpsFixedIcon style={{ fontSize: 40 }} /></div>
                <Typography color="textSecondary">Показ ошибок</Typography>
                <Switch checked={onHintError} onChange={handleOnHint} name="antoine" />
              </div>
            </div>
          </CardContent>
          <CardActions>

          </CardActions>
        </Card>
      }


      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{ backgroundColor: 'white' }}
        open={openSnack && onHintError}
        autoHideDuration={1000}
        message={messageSnack}
        action={
          <React.Fragment>

            <Switch checked={onHintError} onChange={handleOnHint} name="antoine" />

            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>

  )
}

export default TextSimulator;