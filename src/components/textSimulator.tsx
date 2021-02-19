import React from 'react';
import {
  Card, CardContent, CardActions,
  CircularProgress,
  Snackbar,
  Button,
  Avatar,
  IconButton,
  Switch,
  Typography,
  Divider,
  Modal
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import RefreshIcon from '@material-ui/icons/Refresh';
import styleApp from '../theme/styleApp';

const textApi = {
  ru: {
    query: 'https://fish-text.ru/get'
  }
}
interface TextSimulatorProps {
  keyword: string,
  newTimeEnter: number,
  timer?: number
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

/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
function TextSimulator(props: TextSimulatorProps) {
  const classes = styleApp();

  const [values, setValues] = React.useState({
    userName: '',
    loading: true,
    letterList: [] as LetterData[],
    passedList: [] as string[],
    timeList: [] as number[],
    timer: 0 as any,
    countError: 0,
    banCountError: false,
    restart: true,
    finished: false
  });

  const [speed, setSpeed] = React.useState(0);
  const [precision, setPrecision] = React.useState(100);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [messageSnack, setMessageSnack] = React.useState((<p></p>));
  const [onHintError, setOnHintError] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setValues({...values, finished: false});
  }
  const setError = (e: JSX.Element) => {
    setMessageSnack(e);
    setOpenSnack(true);
  }
  const handleOnHint = (e: any) => {
    if (onHintError) return setOnHintError(!e.isTrusted);
    return setOnHintError(e.isTrusted);
  }

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handlePrecision = () => {
    const resultError = parseFloat((100 - 100 * values.countError / values.letterList.length).toFixed(1));
    setPrecision(resultError);
  }


  /////////////// START LOAD, Listening values.restart /////////////
  /////////////// START LOAD, Listening values.restart /////////////
  /////////////// START LOAD, Listening values.restart /////////////
  React.useEffect(() => {
    const userName = window.localStorage.userName;

    if (!values.restart) return;

    fetch(textApi.ru.query)
      .then((response) => {
        setSpeed(0);
        setPrecision(100);
        setValues({
          ...values, loading: false,
          restart: false,
          timer: 0,
          userName
        });
        response.json().then((data) => {
          setValues({
            ...values, loading: false,
            restart: false,
            letterList: createList(data.text, classes.initLetter, classes.nextLetter),
            userName
          });
        })
      })
      .catch((error) => {
        console.log(error);
      })

    setValues({ ...values, loading: true, timeList: [], passedList: [] });

  }, [values.restart]);
  /////////////// END START LOAD, Listening values.restart /////////////
  /////////////// END START LOAD, Listening values.restart /////////////
  /////////////// END START LOAD, Listening values.restart /////////////

  /////////// Listening props.keyword ////////////
  /////////// Listening props.keyword ////////////
  /////////// Listening props.keyword ////////////
  React.useEffect(() => {
    
    if (values.finished) return;
    let carrentIndex = values.passedList.length - 0;
    let nextIndex = carrentIndex + 1;
    let letterList = values.letterList;
    let passedList = values.passedList;
    let currentLetter = letterList[carrentIndex];
    let nextLetter = letterList[nextIndex];
    let countError = values.countError;
    let banCountError = values.banCountError;
    let timeList = values.timeList;


    const countInOneSecond = values.timeList.filter((item, i, arr) => {
      return item >= new Date().getTime() - 1000;
    }).length * 60;
    const countIn10Second = values.timeList.filter((item, i, arr) => {
      return item >= new Date().getTime() - 10000;
    }).length * 6;
    const countInMinute = values.timeList.filter((item, i, arr) => {
      return item >= new Date().getTime() - 60000;
    }).length;

    
    if (new Date().getTime() - values.timeList[0] >= 60000) {
      setSpeed(countInMinute);
    } else if (new Date().getTime() - values.timeList[0] < 10000) {
      setSpeed(countInOneSecond);
    } else {
      setSpeed(countIn10Second);
    }

    if (currentLetter) {

      if (props.keyword === currentLetter.value) {

        timeList.push(props.newTimeEnter);

        banCountError = false;
        console.log('===', props.keyword, currentLetter.value);

        if (nextLetter) {
          nextLetter.className = classes.nextLetter;
          letterList[nextIndex] = nextLetter;
        }
        currentLetter.className = classes.passedLetter;
        letterList[carrentIndex] = currentLetter;
        passedList.push(props.keyword);

        handleCloseSnack();

      } else if (currentLetter.className !== classes.passedLetter) {
        currentLetter.className = classes.errorLetter;

        if (!banCountError) {
          countError += 1;
          banCountError = true;
        }

        letterList[carrentIndex] = currentLetter;
        if (currentLetter.value?.toLowerCase() === props.keyword && currentLetter.value !== props.keyword) {

          setError(<p>Преключитесь на заглавный шрифт</p>)
        } else if (currentLetter.value?.toUpperCase() === props.keyword && currentLetter.value !== props.keyword) {

          setError(<p style={{ textAlign: 'center' }}>Переключитесь на строчный шрифт</p>)
        } else {

          setError(
            <div style={{ textAlign: 'center' }}>
              <p>Нажмите на клавишу - "{currentLetter.value === " " ? 'Пообел' : currentLetter.value}"</p>
              <p>Вы нажали на - "{props.keyword === " " ? 'Пообел' : props.keyword}"</p>
            </div>
          )
        }
      }

      let finished = letterList.length === passedList.length;
      if (finished) {
        setOpenModal(true);
        /////////// WRITE HYSTORY IN LOCALSTORAGE ////////////
        /////////// WRITE HYSTORY IN LOCALSTORAGE ////////////
        /////////// WRITE HYSTORY IN LOCALSTORAGE ////////////
        const hystory = JSON.parse(window.localStorage.hystory ?? '[]');
        hystory.push({ "speed": speed, "precision": precision, "date": new Date()});
        window.localStorage.setItem('hystory', JSON.stringify(hystory));
        /////////// END WRITE HYSTORY IN LOCALSTORAGE ////////////
        /////////// END WRITE HYSTORY IN LOCALSTORAGE ////////////
        /////////// END WRITE HYSTORY IN LOCALSTORAGE ////////////
      }
      setValues({ ...values, letterList: letterList, countError, banCountError, timeList, finished });
      handlePrecision();
    }
  }, [props]);

  /////////// END Listening props.keyword ////////////
  /////////// END Listening props.keyword ////////////
  /////////// END Listening props.keyword ////////////


  React.useEffect(() => {

  }, [values.finished]);
  
  return (
    <div>
      { values.loading ? <CircularProgress color='secondary' className={classes.loading} /> :
        <Card>
          <CardContent>
            <div className={classes.wrapperAvatar}>
              <Avatar className={classes.avatar}>{values.userName[0]}</Avatar>
              <Typography variant="h5">{values.userName}</Typography>
            </div>
            <div className={classes.textWrapper}>
              <div className={classes.textContent} >
                {values.letterList.map((o, i) => <Letter key={i} value={o.value} className={o.className} />)}
              </div>

              <div className={classes.textOptions}>
                <Typography>СКОРОСТЬ</Typography>
                <div>
                  <AvTimerIcon style={{ fontSize: 40, opacity: 0.5 }} />
                  <span style={{ color: 'green' }}> {speed} зн./мин</span>
                </div>


                <Typography>ТОЧНОСТЬ</Typography>
                <div><GpsFixedIcon style={{ fontSize: 40, opacity: 0.5 }} />
                  <span style={{ color: 'green' }}> {precision} %</span>
                </div>
                <Divider style={{ margin: '20px 0' }} />

                <div>
                  <Typography color="textSecondary">Показ ошибок</Typography>
                  <Switch checked={onHintError} onChange={handleOnHint} name="antoine" />
                </div>
                <div className={classes.restartButton}>

                  <Button
                    onClick={() => setValues({ ...values, restart: true, loading: true, timeList: [], passedList: [] })}
                    color="primary"
                    startIcon={<RefreshIcon />}
                  > Начать заново</Button>
                </div>
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>

          <Typography variant="h4">
            Поздравляем! {values.userName}
          </Typography>
          <Typography variant="h5">
            Ваш результат
          </Typography>
          <Typography variant="h5">
            <span style={{ color: 'green' }}> {speed} зн./мин</span>
          </Typography>
          <Typography variant="h5">
            <span style={{ color: 'green' }}> точность {precision} %</span>
          </Typography>

          <div className={classes.modalButton}>
            <Button variant="outlined" onClick={handleCloseModal}>Ok</Button>
          </div>
        </div>

      </Modal>
    </div>  
  )
}
/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
/////////////////////////// TextSimulator /////////////////////////
export default TextSimulator;