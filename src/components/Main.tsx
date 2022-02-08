import React, {useState, useEffect, Dispatch, SetStateAction, useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import {useDispatch, useSelector} from "react-redux";
import { PagesLink } from '../common/models';
import Auth from "./Authorization";
import Schedule from "./Schedule";


function Main(props: any) {
    const state = useSelector((state:any) => state)


    const dispatch = useDispatch()


    return (
        <div className='app_wrap'>
            <main className='container'>
                <Routes>
                    <Route path={PagesLink.auth} element={<Auth />} />
                    <Route path={PagesLink.schedule} element={<Schedule />} />
                </Routes>
            </main>
        </div>


    );
}

export default Main;
