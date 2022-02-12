import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../App.css'
import '../reset.css'
import '../styles/timeSheets.css'
import SceletonTable from "./SceletonTable";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {dateOptions, racesTypes, testChangeRequest, testChengedRaces, workHours} from "../common/models";
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
import {styled} from '@mui/material/styles';


import {testBuses, testDrivers, testRaces, testTimesheets} from "../common/models";
import BootstrapDialogTitle from "./BootstrapDialogTitle";


const useStyles = makeStyles({
    long: {
        backgroundColor: 'red',
    },
    short: {
        backgroundColor: 'yellow',
    },
    bigBus: {
        backgroundColor: 'green',
    },
    noneBorderTLR: {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
    },
    noneBorderBLR: {
        borderBottom: 'none',
        borderLeft: 'none',
        borderRight: 'none',
    }
})

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function DriverChangeList(props: any) {
      const classes = useStyles()

    const [longTable, setLongTable] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const [loadRowCount, setLoadRowCount] = useState(5);
    const [loadCellCount, setLoadCellCount] = useState(7);
    const [openTrip, setOpenTrip] = useState<any>();
    const [isOpenDialog, setIsOpenDialog] = useState<any>(false);
    const [currentDriver, setCurrentDriver] = useState<any>();
    const [filteredDrivers, setFilteredDrivers] = useState<any>(testDrivers)
    const [filteredHours, setFilteredHours] = useState<any>(workHours);
    const [allStartRequestDates, setAllStartRequestDates] = useState<any>([]);
    const [maxFinishRequestDates, setMaxFinishRequestDates] = useState<any>(0);
    const [maxStartRequestDates, setMaxStartRequestDates] = useState<any>(0);
    const [selectedStartDay, setSelectedStartDay]  = useState<any>(0);
    const [selectedFinishDay, setSelectedFinishDay]  = useState<any>(0);


    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true);
        }, 100)
    }, [])

    const dispatch = useDispatch()

    const handleLoadData = () => {
        setIsLoad(false);
        setLoadRowCount(10);
        setTimeout(() => {
            setIsLoad(true);
        }, 3000)
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


    useEffect(() => {
        let startDate = new Set(), minStartDate = Infinity, finishDate = 0;
        testChangeRequest.forEach(request => {
            startDate.add(request.startTime);
            if (request.finishTime > finishDate) finishDate = request.finishTime;
            if (request.startTime < minStartDate) minStartDate = request.startTime;
        })
        let startDateArr: any = []
        startDate.forEach(item => {
            startDateArr.push(item);
        })
        setSelectedStartDay(Number(minStartDate));
        setSelectedFinishDay(Number(finishDate));
        setMaxFinishRequestDates(Number(finishDate));
        setMaxStartRequestDates(Number(minStartDate));
        setAllStartRequestDates(startDateArr);
    }, [testChangeRequest])

    const handleSelectStart = (e: any) => {
        if (e.target.value) setSelectedStartDay(Number(e.target.value));
    }

    const handleChangeFinishDay = (e: any) => {
        setSelectedFinishDay(Date.parse(e.target.value));
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
                <select className='app__select' value={selectedStartDay} name="" id="" onChange={handleSelectStart}>
                    <option value="" selected disabled>Начальная дата</option>
                    {
                        allStartRequestDates?.length
                            ? allStartRequestDates.map((startDate: any) => {
                                return <option
                                    value={startDate}>{new Date(startDate).toLocaleString("ru", dateOptions)}</option>
                            })
                            : null
                    }
                </select>
                {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                {/*    <DesktopDatePicker*/}
                {/*        label="Конечная дата"*/}
                {/*        inputFormat="MM/dd/yyyy"*/}
                {/*        value={selectedFinishDay}*/}
                {/*        onChange={handleChangeFinishDay}*/}
                {/*        renderInput={(params: any) => <TextField {...params} />}*/}
                {/*    />*/}
                {/*</LocalizationProvider>*/}
                <input style={{border: 'none',borderRadius: '4px'}}
                        type="date"
                       value={selectedFinishDay}
                       min={maxStartRequestDates ? new Date(maxStartRequestDates).toISOString().split('T')[0] : ''}
                       max={maxFinishRequestDates ? new Date(maxFinishRequestDates).toISOString().split('T')[0] : ''}
                       onChange={handleChangeFinishDay}/>
            </div>

            <div className='schedul_table_wrapper'>
                {
                    isLoad
                        ? <table className='app_table'>
                            <thead>
                            <th>№</th>
                            <th>ФИО</th>
                            <th>Табельный №</th>
                            <th>Дата начала отгула</th>
                            <th>
                                Конец отгула
                            </th>
                            <th style={{padding: 0, borderLeft: 'none', borderRight: 'none'}}>
                                <tr style={{display: 'flex'}}>
                                    <th className='noneBorderTRBL' style={{margin: '0 auto', display: 'block'}}  colSpan={3}>Данные о замене</th>
                                </tr>
                                <tr style={{width: '100%'}}>
                                    <th  style={{width: 203, borderRight: 'none', borderLeft: 'none', borderBottom: 'none', fontSize: '0.7em'}}>Рейс</th>
                                    <th  style={{width: 114, borderRight: 'none', borderBottom: 'none', fontSize: '0.7em'}}>Автобус</th>
                                    <th style={{borderRight: 'none', borderBottom: 'none', fontSize: '0.7em', padding: 0, width: 45}}>Время отъезда</th>
                                    <th style={{borderRight: 'none', borderBottom: 'none', fontSize: '0.7em', width: 69}}>Замена</th>
                                </tr>
                            </th>
                            <th>Подобрать водителей</th>
                            </thead>
                            <tbody>
                            {
                                filteredDrivers.map((driver: any, index: number) => {
                                    let currentDriverRequests = testChangeRequest.find(request => request.driverId === driver.id)!;

                                    if (currentDriverRequests &&
                                        selectedStartDay && selectedStartDay <= currentDriverRequests.startTime &&
                                        selectedFinishDay && selectedFinishDay >= currentDriverRequests.finishTime) {

                                        return <tr key={driver.id}>
                                            <td>{index + 1}</td>
                                            <td>{driver.name}</td>
                                            <td>{driver.id}</td>
                                            <td>{new Date(currentDriverRequests.startTime).toLocaleString("ru", dateOptions)}</td>
                                            <td>{new Date(currentDriverRequests.finishTime).toLocaleString("ru", dateOptions)}</td>
                                            <td style={{ padding: 0, borderRight: 'none', borderLeft: 'none', borderTop: 'none'}}>
                                                {
                                                    currentDriverRequests.timeSheets.map((timeSheetId, i, arr) => {
                                                        let timeSheetTrip = testTimesheets.find(trip => trip.id === timeSheetId)!
                                                        if (timeSheetTrip) return <tr className='tripDataTr' style={{width: '100%'}}>
                                                            <td style={{width: 160,}} className='noneBorderTRL' >
                                                                {testRaces.find(race => race.id === timeSheetTrip.raceId)?.startTarget} -
                                                                {testRaces.find(race => race.id === timeSheetTrip.raceId)?.finishTarget} -
                                                            </td>
                                                            <td style={{borderTop: 'none', width: 100}} >
                                                                {testBuses.find(bus => bus.id === timeSheetTrip.busId)?.number}
                                                            </td>
                                                            <td style={{borderTop: 'none', borderRight: 'none', width: 48 }} >
                                                                {testRaces.find(race => race.id === timeSheetTrip.raceId)?.startTime}
                                                            </td>
                                                            <td style={{borderTop: 'none', borderRight: 'none', padding: 0, fontSize: '0.6em'}}>
                                                                {
                                                                    testDrivers.find(driver => driver.id ===
                                                                        testChengedRaces.find(race => race.shouldChangeId.raceId === currentDriverRequests.id &&  race.shouldChangeId.timeSheetId === timeSheetId)?.driverId)?.name
                                                                }
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </td>
                                            <td>ПОДОБРАТЬ</td>
                                        </tr>
                                    }
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
                                Отъезд: {testRaces.find(race => race.id === openTrip.raceId)!.startTime} | {testRaces.find(race => race.id === openTrip.raceId)!.startTarget}
                                <br/>
                                Приезд: {testRaces.find(race => race.id === openTrip.raceId)!.finishTime} | {testRaces.find(race => race.id === openTrip.raceId)!.finishTarget}
                            </Typography>
                            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
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
                            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
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

export default DriverChangeList;
