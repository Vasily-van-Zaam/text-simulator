import { createMuiTheme} from '@material-ui/core/styles';
import greay from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
    overrides: {
        MuiInputBase:{
           root: {
                fontSize: '1.3em'
           }
        },
        MuiButton: {
            text: {
                color: '#949494',
            },
            containedPrimary: {
                background: 'radial-gradient(5422.06% 300.76% at 0% 288.54%, #3C8291 0%, #00B5AD 100%)',
                label: {
                    color: '#fff',
                    "&$disabled": {
                        color: '#949494',
                    },
                }
            },
            label: {
                fontSize: 13,
            },
            root: {
                transition: 'all 0.3s linear 0s',
                "&$disabled": {
                    background: 'none'
                },
                borderRadius: 6,
                textTransform: 'none'
            }
        },
        MuiButtonBase: {


        },
        MuiTypography: {
            root: {
                zIndex: 1000,
                '& h2 MuiTypography-root': {
                    fontSize: 10
                }
            },

        },
        MuiOutlinedInput: {

            notchedOutline: {
                border: '0 solid',
                borderRadius: 6
            },
            root: {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 1,
                    borderColor: '#8C8C8C',
                },
                backgroundColor: '#F2F2F2',
                borderRadius: 6,

                '&.Mui-focused': {
                    borderWidth: 1,
                    borderColor: '#8C8C8C',
                    backgroundColor: 'white'
                },
            },
        },

    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: greay[900],
        },
        secondary: {
            main: blue[500],
        },
    },
});