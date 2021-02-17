import React from 'react';
import {
    Button, 
    Typography, InputAdornment, 
    Divider, CircularProgress,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import mainlogo from '../svg/mainlogo.svg';
import warning from '../svg/carbon_warning.svg';
import {InputLogin, InputPassword} from '../common_ui/inputs';
import styleRoot from './styleAuthForm';
import {IconOk, BackLine} from '../common_ui/decor';


export default function AuthForm(
    props: { 
        handleAuth: (data: { login: string, password: string, success: Function, fail: Function }) => void
    }) {
    const classes = styleRoot();
    const [values, setValues] = React.useState({
        login: '',
        password: '',
        remember: '',
        error: '',
        showIconOkPassword: false,
        showIconOkLogin: false,
        isTryAuth: false,
        isRemember: false,
        userName: '',
        w: document.body.clientWidth,
        h: document.body.clientHeight
    });

    function validEmail(email: string) {
        const reg: RegExp = /^([A-Za-z0-9_\-\w.])+\w@([A-Za-z0-9_\-\w.])+\w.([A-Za-z]{2,4})$/;
        return reg.test(email) === true;
    }
    function validPassword(password: string) {
        return password.length > 3;
    }
    function handleChange(prop: any) {
        return (event: any) => {
            const value = event.target.value;
            if (prop === 'login') {
                setValues({ ...values, [prop]: value, showIconOkLogin: validEmail(value), error: '' });
            } else if (prop === 'password') {
                setValues({ ...values, [prop]: value, showIconOkPassword: validPassword(value), error: ''  });
            } else {
                setValues({ ...values, [prop]: value, error: '' });
            }
        };
    }

    function trayAuth() {
        props.handleAuth({
            login: values.login, 
            password: values.password,
            success: (loaded: boolean, userName: string) => {
                setValues({ ...values, isTryAuth: !loaded, userName: userName })
            },
            fail: (error: string) => setValues({ ...values, isTryAuth: false, error }),
        }); 
    }
    function trayRemember() {
        setValues({ ...values, isRemember: true });
    }
    function resetRemember() {
        setValues({ ...values, isRemember: false });
    }

    
    /// TODO это временное решение 
    function setHight(): {rememberH: number, loginH: number} {
        if(values.w < 420) {
            return {
                rememberH: 600,
                loginH: 600
            }
        } 
        return {
            rememberH: 450,
            loginH: 490
        }
    }
  
    
    return (
        <div className={classes.formWrapper} 
            style={{ maxHeight: values.isTryAuth ? 345 :  
                            /// TODO это временное решение  переделать!
            values.isRemember ? setHight().rememberH : setHight().loginH}}>

            <div className={classes.formHeader}
                style={{height: values.isTryAuth ? 345 : 'auto'}}>

                <BackLine
                    hide={values.isTryAuth}
                    show={values.showIconOkLogin && values.showIconOkPassword} />
                <img src={mainlogo} className={classes.logo} alt="logo" />

                <Typography component="h1" style={{ fontSize: 17 }} align='center'>
                    Корпоративная информационная система
                </Typography>

                    <div className={classes.formHeaderLoaded}
                    style={{ opacity: values.isTryAuth ? 1 : 0 }}>
                    <div style={{ height: 180, display: values.isTryAuth ? 'block' : 'none' }}>
                        <Typography component="h1" style={{ fontSize: 19, marginTop: 20 }} align='center'>
                            Добрый день, {values.userName}!
                        </Typography>
                        <CircularProgress color="inherit" style={{ marginTop: 20, }} />
                    </div>

                </div>

            </div>

            {/* ///////////////  LOGIN  /////////// */}
            <div className={classes.formContent} style={{
                transform: values.isTryAuth || values.isRemember ? 'translateY(-600px)' : 'none' }}>
               
                <Typography component="h2" style={{ fontSize: 14 }} align='left' 
                    color={values.error !== '' ? 'error' : 'primary' }>
                    {values.error !== '' ? values.error :'Данные для входа'}
                </Typography>

                <InputLogin
                    value={values.login}
                    onChange={handleChange('login')}
                    label="Логин*"
                    variant="outlined"
                    placeholder="e-mail@mail.ru"
                    type="email"
                    error={values.error !== ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconOk show={values.showIconOkLogin} />
                            </InputAdornment>
                        ),
                    }}
                />
                <InputPassword
                    value={values.password}
                    onChange={handleChange('password')}
                    label="Пароль*"
                    variant="outlined"
                    placeholder=""
                    type="password"
                    error={values.error !== ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconOk show={values.showIconOkPassword} />

                            </InputAdornment>
                        ),
                    }} />


                <Divider style={{ marginTop: 10 }} />
                <div className={classes.blockBotton}>
                    <Button disabled={false} className={classes.button} onClick={trayRemember}>
                        Не помню пароль
                    </Button>
                    <Button variant="contained" color="primary"
                        className={classes.button}
                        disabled={!(values.showIconOkLogin && values.showIconOkPassword)}
                        onClick={trayAuth}
                        endIcon={<ChevronRightIcon/>}
                    >
                        Войти в систему 
                    </Button>
                </div>
            </div>

            {/* /////////////// REMEMBER  /////////// */}
            <div className={classes.formContent} style={{
                transform: values.isRemember || values.isRemember ? 'translateY(-300px)' : 'translateY(100px)' }}>
                <Typography component="h2" style={{ fontSize: 14 }} align='left' color='primary'>
                    Востанволение пароля
                </Typography>
                <InputLogin
                    value={values.remember}
                    onChange={handleChange('remember')}
                    label="Логин или email*"
                    variant="outlined"
                    placeholder="e-mail@mail.ru"
                    type="email"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconOk show={values.showIconOkLogin} />
                            </InputAdornment>
                        ),
                    }}

                />
                <div style={{ display: 'flex' }}>
                    <img src={warning} alt="warning" />
                    <Typography component="h2" style={{
                        fontSize: 14, marginLeft: 10, color: '#4F4F4F'}} align='left'>
                        Пароль будет отправлено на электронную почту, к которой привязана учетная запись.
                    </Typography>
                </div>


                <Divider style={{ marginTop: 10 }} />
                <div className={classes.blockBotton}>
                    <Button disabled={false} className={classes.button}
                        onClick={resetRemember}
                        style={{color: '#00B5AD', width: 100}}>
                        Назад
                    </Button>
                    <Button variant="contained" 
                        className={classes.button}
                        onClick={trayAuth}
                        style={{ color: '#949494', width:  116}}>
                        Восстановить
            
                    </Button>
                </div>
            </div>
        </div>
    );

}
