import {
    TextField,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const styleField = {
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
    height: 54,
};


export const InputLogin = styled(TextField)(styleField);
export const InputPassword = styled(TextField)(styleField);