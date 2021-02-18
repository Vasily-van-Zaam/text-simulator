import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    app: {
        textAlign: 'center'
    },
    appContent: {
        background: 'radial-gradient(37.2% 50% at 50% 50%, #ECECEC 0%, #C4C4C4 100%)',
        minHeight: '90vh ',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5em',
        inlineSize: 0.5,
    },
    textWrapper: {
        display: 'flex',
    },
    textContent: {
        margin: 20,
        flex: 4
    },
    textOptions:{
        width: 500,
        margin: 20,
        flex: 1
    },
    loading:{
        display: 'block',
        margin: '0 auto',
    },
    restartButton: {
        position: 'absolute',
        height: 48,
        width: 164,
        right: 100,
        
    },
    initLetter: {
        color: 'black'
    },
    errorLetter: {
        color: 'white',
        backgroundColor: 'red',
        border: '1px solid red',
        borderRadius: 10,
        padding: 3
    },
    passedLetter: {
        color: 'green',
    
    },
    nextLetter: {
        color: 'white',
        backgroundColor: 'green',
        border: '1px solid green',
        borderRadius: 10,
        padding: 3

    }
}));