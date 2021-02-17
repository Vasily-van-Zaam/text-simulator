import { styled } from '@material-ui/core/styles';
import iconOkSvg from '../svg/ok.svg';
import elips from '../svg/back_line.svg';

function imgOk(props: { className: string, show: boolean }) {
    return <img src={iconOkSvg} className={props.className}
        style={{ opacity: props.show ? 1 : 0 }} alt={props.className} />
}

export const IconOk = styled(imgOk)({
    opacity: 0,
    transition: 'opacity 0.3s linear 0s'
});

function imgBackLine(props: { className: string, show: boolean, hide: boolean }) {
    return <img src={elips} className={props.className}
        style={{
            transform: props.show ? 'rotate(-6deg)' : 'rotate(-4deg)',
            opacity: props.hide ? 0 : 1
        }} alt={props.className} />
}
export const BackLine = styled(imgBackLine)({
    transform: 'rotate(10deg)',
    transformOrigin: '0 0 ',
    minWidth: 700,
    top: -240,
    left: -245,
    position: 'absolute',
    zIndex: 1,
    transition: 'all 0.3s linear 0s'
})
