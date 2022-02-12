import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../App.css'
import '../reset.css'
import '../styles/Schedul.css'
import SceletonTable from "./SceletonTable";


function Schedule(props: any) {
    const [longTable, setLongTable] = useState(true);
    const [isLoad, setIsLoad] = useState(false);
    const [loadRowCount, setLoadRowCount] = useState(5);
    const [loadCellCount, setLoadCellCount] = useState(7);


    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true);
        } , 3000)
    } ,[])

    const dispatch = useDispatch()

    const handleLoadData = () => {
        setIsLoad(false);
        setLoadRowCount(10);
        setTimeout(() => {
            setIsLoad(true);
        } , 3000)
    }


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
                            <th>Рейс</th>
                            <th>Время отправления</th>
                            <th>Время прибытия</th>
                            <th>Водитель <br/> (ФИО/ТН)</th>
                            <th>Автобус</th>
                            <th>Количество мест</th>
                            <th>Остановки</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Балтаси - <br/> Казань (Экспресс)</td>
                                <td>8:00</td>
                                <td>9:45</td>
                                <td>Bdfyjd Bdfy Bdfysx 16455</td>
                                <td>Hundai (Е453РЕ116)</td>
                                <td>11/18</td>
                                <td>
                                    Балтаси - 8:00 <br/>
                                    Арск - 8:30 <br/>
                                    Высокая гора - 9:15 <br/>
                                    Казань (Компрессорная) - 9:45
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Казань - <br/> Балтаси(Экспресс)</td>
                                <td>8:00</td>
                                <td>9:45</td>
                                <td>Bdfyjd Bdfy Bdfysx 16455</td>
                                <td>Hundai (Е453РЕ116)</td>
                                <td>11/18</td>
                                <td>
                                    Балтаси - 8:00 <br/>
                                    Арск - 8:30 <br/>
                                    Высокая гора - 9:15 <br/>
                                    Казань (Компрессорная) - 9:45
                                </td>
                            </tr>
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
        </div>
    );
}

export default Schedule;
