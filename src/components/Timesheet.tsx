import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../App.css'
import '../reset.css'
import '../styles/timeSheets.css'
import SceletonTable from "./SceletonTable";
import {racesTypes, workHours} from "../common/models";
import {Button, Dialog, DialogActions, DialogContent, Tooltip, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles';
import { styled } from '@mui/material/styles';


import {testBuses, testDrivers, testRaces, testTimesheets} from "../common/models";
import BootstrapDialogTitle from "./BootstrapDialogTitle";


const useStyles = makeStyles({
    long: {
      backgroundColor: 'red',
    },
    short: {
      backgroundColor:  'yellow',
    },
    bigBus: {
      backgroundColor: 'green',
    },
})

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function TimeSheet(props: any) {
    const classes = useStyles()

    const [longTable, setLongTable] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const [loadRowCount, setLoadRowCount] = useState(5);
    const [loadCellCount, setLoadCellCount] = useState(7);
    const [openTrip, setOpenTrip] =  useState<any>();
    const [isOpenDialog, setIsOpenDialog] = useState<any>(false);


    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true);
        } , 100)
    } ,[])

    const dispatch = useDispatch()

    const handleLoadData = () => {
        setIsLoad(false);
        setLoadRowCount(10);
        setTimeout(() => {
            setIsLoad(true);
        } , 3000)
    }

    const handleOpenDialog = (currentTrip: any) => {
        setOpenTrip(currentTrip);
        setIsOpenDialog(true);
    }

    const handleClose = () => {
        setIsOpenDialog(false);
    };

    return (
        <div className='app_container'>
            <div className='schedul_filters'>
                <select className='app__select' name="" id="">
                    <option value=""  disabled>FILTER 1</option>
                </select>
                <select className='app__select' name="" id="">
                    <option value=""  disabled>FILTER 1</option>
                </select>
                <select className='app__select' name="" id="">
                    <option value=""  disabled>FILTER 1</option>
                </select>
            </div>

            <div className='schedul_table_wrapper'>
                {
                    isLoad
                        ? <table className='app_table'>
                            <thead>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Табельный №</th>
                            <th className='workhour__cell'>
                                {
                                    workHours.map(hour => {
                                        return <p>{hour}</p>
                                    })
                                }
                            </th>
                            </thead>
                            <tbody>
                            {
                                testDrivers.map((driver, index) => {
                                    let currentDriverRaces = testTimesheets.filter(race => race.driverId === driver.id)
                                    return <tr key={driver.id}>
                                        <td>{index + 1}</td>
                                        <td>{driver.name}</td>
                                        <td>{driver.id}</td>
                                        <td>
                                            {
                                                currentDriverRaces.length
                                                    ? <div style={{position: 'relative'}}>
                                                        {
                                                            currentDriverRaces.map(trip => {
                                                                let currentBus = testBuses.find(bus => bus.id === trip.busId),
                                                                    currentRace = testRaces.find(race => race.id === trip.raceId)
                                                                return <div className={classes[trip.type]} style={{position: "absolute", top: -18, fontSize: '0.7em', left: `${(currentRace!.startTime - 6) * 52}px   `, width: `${(currentRace!.finishTime  - currentRace!.startTime) * 55}px`}}>
                                                                   <Tooltip title='Подробнее' onClick={() =>handleOpenDialog(trip)}>
                                                                       <p>{currentBus?.number}</p>
                                                                   </Tooltip>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                    : null
                                            }
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                        : <SceletonTable cellCount={loadCellCount} rowCount={loadRowCount}/>
                }

                {
                    longTable && isLoad
                        ? <button className='app__load_more' onClick={handleLoadData}>
                            ЗАГРУЗИТЬ ЕЩЕ
                        </button>
                        : null
                }
            </div>

            {
                isOpenDialog
                    ? <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={isOpenDialog}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Modal title
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                            </Typography>
                            <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                            </Typography>
                            <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                                magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Save changes
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                    : null
            }
        </div>
    );
}

export default TimeSheet;
