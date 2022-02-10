import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../App.css'
import '../reset.css'
import '../styles/timeSheets.css'
import SceletonTable from "./SceletonTable";
import {racesTypes, workHours} from "../common/models";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel, MenuItem, Select, TextField,
    Tooltip,
    Typography
} from "@mui/material";
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
    const [currentDriver, setCurrentDriver] = useState<any>();
    const [filteredDrivers, setFilteredDrivers] = useState<any>(testDrivers)
    const [filteredHours, setFilteredHours] = useState<any>(workHours);

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
        //TODO add save race
        setIsOpenDialog(false);
    };

    const handleFilterDrivers = (e: any, val: any) => {
        setFilteredDrivers(val);
    }

    const handleFilterHours = (e: any, val: any) => {
        setFilteredHours(val);
    }

    const handleChangeDriver = (event: any) => {
        let currentDriver = testDrivers.find(driver => driver.id === event.target.value)
        if (currentDriver) setCurrentDriver(currentDriver);
    }

    const handleChangeBus = (event: any) => {
        let currentBus = testBuses.find(bus => bus.id === event.target.value)
        if (currentBus) setCurrentDriver(currentBus);
    }



    return (
        <div className='app_container'>
            <div className='schedul_filters'>
                <Autocomplete
                    multiple
                    limitTags={2}
                    id="tags-standard"
                    options={testDrivers}
                    getOptionLabel={(option) => `${option.name} - ${option.id}`}
                    defaultValue={[testDrivers[0]]}
                    value={filteredDrivers}
                    onChange={(e, val) => handleFilterDrivers(e, val)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Выбор водителей"
                            placeholder="Водители"
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    limitTags={2}
                    id="tags-standard"
                    options={filteredHours}
                    getOptionLabel={(option) => option}
                    value={filteredHours}
                    onChange={(e, val) => handleFilterHours(e, val)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Выбор рабочих часов"
                            placeholder="Часы"
                        />
                    )}
                />
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
                                    filteredHours.map((hour: any) => {
                                        return <p>{hour}</p>
                                    })
                                }
                            </th>
                            </thead>
                            <tbody>
                            {
                                filteredDrivers.map((driver: any, index: number) => {
                                    let currentDriverRaces = testTimesheets.filter(race => race.driverId === driver.id)
                                    return <tr key={driver.id}>
                                        <td>{index + 1}</td>
                                        <td>{driver.name}</td>
                                        <td>{driver.id}</td>
                                        <td>
                                            {
                                                currentDriverRaces.length
                                                    ? <div className='trip_cell'>
                                                        {
                                                            currentDriverRaces.map(trip => {
                                                                let currentBus = testBuses.find(bus => bus.id === trip.busId),
                                                                    currentRace = testRaces.find(race => race.id === trip.raceId)
                                                                return <div className={trip.type + ' ' + 'trip'} style={{left: `${(currentRace!.startTime - 6) * 52}px   `, width: `${(currentRace!.finishTime  - currentRace!.startTime) * 55}px`}}>
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
                        className={openTrip.type}
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={isOpenDialog}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{width: 600}}>
                            Рейс - №{openTrip.raceId}
                        </BootstrapDialogTitle>
                        <DialogContent dividers style={{display: 'flex', flexDirection: 'column'}}>
                            <Typography gutterBottom>
                                Отъезд: {testRaces.find(race => race.id === openTrip.raceId)!.startTime} | {testRaces.find(race => race.id === openTrip.raceId)!.startTarget} <br/>
                                Приезд: {testRaces.find(race => race.id === openTrip.raceId)!.finishTime} | {testRaces.find(race => race.id === openTrip.raceId)!.finishTarget}
                            </Typography>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Водитель</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={openTrip.driverId}
                                    onChange={handleChangeDriver}
                                    label="Age"
                                >
                                    {
                                        testDrivers.length
                                            ? testDrivers.map(driver => {
                                                return <MenuItem value={driver.id}>
                                                    {driver.name}
                                                </MenuItem>
                                            })
                                            : null
                                    }
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Автобус</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={openTrip.busId}
                                    onChange={handleChangeBus}
                                    label="Age"
                                >
                                    {
                                        testBuses.length
                                            ? testBuses.map(bus => {
                                                return <MenuItem value={bus.id}>
                                                    {bus.number}
                                                </MenuItem>
                                            })
                                            : null
                                    }
                                </Select>
                            </FormControl>

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                СОХРАНИТЬ ИЗМЕНЕНИЯ
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                    : null
            }
        </div>
    );
}

export default TimeSheet;
