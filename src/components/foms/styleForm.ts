import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formWrapper: {
        // position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s linear 0s',
        overflow: 'hidden',
        // maxHeight: 600,
        width: 330,
        // height: 0,
        borderRadius: 6,
        background: 'rgba(255, 255, 255, 1)',
        margin: '0 auto',
        padding: 35

    },
    formHeader: {
        // padding: '50px 40px 40px 40px',
        background: 'radial-gradient(138.81% 16453.56% at -23.78% 12.1%, #3C8291 9.59%, #00B5AD 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1000,
        borderRadius: 6,
        marginBottom: 30,
        transition: 'all 1s linear 0s',
    },
    formHeaderLoaded: {
        transition: 'all 1s linear 0s',
        opacity: 0
    },
    formContent: {
        transitionDelay: '0s',
        transition: 'all 0.3s linear 0s',
        zIndex: 1,
        padding: '20px 40px'
    },

    logo: {
        zIndex: 1000,
        pointerEvents: 'none',
        width: 180,
        borderRadius: 0,
        marginBottom: 15,
    },
    textLogo: {
        
        zIndex: 100,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 19,
        letterSpacing: '0em',
        textAlign: 'center'
    },

    blockBotton: {
        marginTop: 20,
        marginBottom: 0
    },
    button: {
        height: 48,
        width: 164,
        marginLeft: 5,
    }
    
}));