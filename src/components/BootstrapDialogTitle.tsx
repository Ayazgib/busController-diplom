import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import '../App.css'
import '../reset.css'
import '../styles/timeSheets.css'
import {DialogTitle, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default BootstrapDialogTitle;
