import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

export default function ConfirmDialog({confirmDialog, setConfirmDialog }) {
    return (
        <div>
            <Dialog
                open={confirmDialog.isOpen}
                PaperComponent={Paper}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move', color:'orange', display:'flex', alignItems:'center', fontWeight:'bold' }} id="draggable-dialog-title">
                    <CircleNotificationsIcon/>
                    Thông báo!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {confirmDialog.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{paddingLeft:'10px',paddingRight:'10px'}}>
                    <Button variant='outlined' autoFocus onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
                        HỦY
                    </Button>
                    <Button variant='outlined'  onClick={confirmDialog.onConfirm}>ĐỒNG Ý</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
