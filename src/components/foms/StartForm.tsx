import React from 'react';
import {
    Button,
    Typography,
    TextField,
    FormControl,
} from '@material-ui/core';
import styleForm from '../../theme/styleForm';

interface StartFormProps {
    success: (userName: string) => void,
}

function StartForm(props: StartFormProps) {
    const classes = styleForm();

    const [userName, setUserName] = React.useState('');

    const handleForm = () => {
        console.log(props.success(userName));
    }

    React.useEffect(() => {
        
    }, [props]);

    return (
        <div className={classes.formWrapper}>

            <Typography className={classes.formHeader} align="center" variant="h3"> Добро пожаловать!</Typography>
            <FormControl>
                <TextField
                    id="my-input" 
                    aria-describedby="my-helper-text" 
                    label="Ваше имя"
                    variant="outlined"
                    helperText="Введите любое имя"
                    placeholder="Имя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                <div className={classes.blockBotton}>
                    <Button variant="contained" 
                    color="primary"
                    onClick={handleForm}
                    >Сохранить</Button>
                </div>    
                
            </FormControl>
        </div>
    )
}

export default StartForm;
