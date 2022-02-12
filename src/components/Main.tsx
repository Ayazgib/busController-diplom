import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import {useDispatch, useSelector} from "react-redux";
import { PagesLink } from '../common/models';
import Auth from "./Authorization";
import Schedule from "./Schedule";
import Timesheet from "./Timesheet";
import TEST from "./TEST";
import DriverChangeList from "./DriverChangeList";


function Main(props: any) {
    const state = useSelector((state:any) => state)


    const dispatch = useDispatch()


    return (
        <div className='app_wrap'>
            <main className='container'>
                <Routes>
                    <Route path={PagesLink.auth} element={<Auth />} />
                    <Route path={PagesLink.schedule} element={<Schedule />} />
                    <Route path={PagesLink.timesheet} element={<Timesheet />} />
                    <Route path={PagesLink.change_driver} element={<DriverChangeList />} />
                </Routes>
            </main>
        </div>


    );
}

export default Main;
