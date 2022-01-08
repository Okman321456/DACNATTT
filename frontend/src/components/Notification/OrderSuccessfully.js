import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { useStore, actions } from '../../store';

const useStyles = makeStyles({
    'notify-root': {
        position: 'fixed',
        top:'150px',
        left:'-300px',
        opacity:0,
        transition: '0.6s',
    },
    'show-hidden': {
        left:'10px !important',
        opacity: '1 !important',
        transition: '2s !important',
    },
});

function OrderSuccessfully(props) {
    const classes = useStyles();
    const [show, setShow] = useState(true);
    const [state, dispatch] = useStore();
    useEffect(() => {
        const showNotify = setTimeout(() => {
          setShow(true);
        }, 3000);
        const hiddenNotify = setTimeout(() => {
          setShow(false);
          dispatch(actions.setShowNofify(false));
        }, 6000);
        const hidden = setTimeout(() => {
          dispatch(actions.setShowNofify(false));
        }, 2000);
        return () => {
            clearTimeout(showNotify);
            clearTimeout(hiddenNotify);
            clearTimeout(hidden);
        };
      }, []);
      
    return (
        <div className={show?classes['show-hidden']+ ' ' + classes['notify-root'] : classes['notify-root']}>
            <Alert style={{ width: '200px' }} variant="filled" severity="success">
                Đặt tour thành công!
            </Alert>
        </div>
    );
}

export default OrderSuccessfully;