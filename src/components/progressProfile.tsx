import React from 'react';
import {
    Card,
    CardContent,
    Container,
    Avatar,
    Typography,
    Button,
    IconButton,
    Modal
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styleApp from '../theme/styleApp';

interface HystoryData {
    date: string;
    precision: number;
    speed: number
}

function ProgressPrpofile() {
    const classes = styleApp();

    const [values, setValues] = React.useState({
        userName: '',
        hystory: []
    });
    const [openModal, setOpenModal] = React.useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const handleCloseModalAllReset = () => {
        setOpenModal(false);
        window.localStorage.clear();
        window.location.reload();
    }
    React.useEffect(() => {
        setValues({
            userName: window.localStorage.userName ?? 'No Name',
            hystory: JSON.parse(window.localStorage.hystory ?? '[]')
        })
    }, []);

    return (

        <div className={''}>
            <Container>
                <Card>
                    <CardContent>
                        <div className={classes.wrapperAvatar}>
                            <div className={classes.avatarContent}>
                                <Avatar className={classes.avatar}>{values.userName[0]}</Avatar>
                                <Typography variant="h5">{values.userName}</Typography>
                            </div>
                            <div className={classes.actionAvatarContent}>

                                <Typography style={{ alignContent: 'center' }}>Все стереть</Typography>
                                <IconButton aria-label="delete" style={{ color: 'red' }}
                                    onClick={() => setOpenModal(true)}>
                                    <DeleteIcon fontSize="large" />
                                </IconButton>
                            </div>
                        </div>
                        <div className={classes.profileHeaderList}>
                            <div>Дата</div>
                            <div>скорость</div>
                            <div>точность</div>
                        </div>
                        <div className={classes.profileList}>

                            {values.hystory.map((e: HystoryData, i) => (
                                <div key={i} className={classes.profileListItem}>
                                    <div>{e.date ?? ''}</div>
                                    <div>{e.speed ?? ''}</div>
                                    <div>{e.precision ?? ''}</div>
                                </div>
                            ))
                            }
                        </div>

                    </CardContent>
                </Card>
            </Container>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.modal}>
                    <Typography variant="h4">
                        Стереть все?
                    </Typography>

                    <div style={{ display: 'flex' }}>
                        <div className={classes.modalButton}>
                            <Button variant="outlined" onClick={handleCloseModal}>Отмена</Button>
                        </div>
                        <div className={classes.modalButton}>
                            <Button color="primary" variant="contained"  onClick={handleCloseModalAllReset}>Стереть</Button>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default ProgressPrpofile;