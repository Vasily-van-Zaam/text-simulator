import React from 'react';
import {
    Card,
    CardContent
} from '@material-ui/core';
import styleApp from '../theme/styleApp';

function ProgressPrpofile () {
    const classes = styleApp();

    const [values, setValues] = React.useState({
        userName: ''
    });
    React.useEffect(() => {
        // window.localStorage.userName
    });

    return (
        <div className={classes.appContent}>
            <Card>

                <CardContent>
                    <span>Тренажер слепой печать</span>
                    <span>Тестовое приложение 2021</span>
                </CardContent>
            </Card>
        </div>
    )
} 

export default ProgressPrpofile;