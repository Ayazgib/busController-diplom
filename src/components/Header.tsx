import React from 'react';
import logo from '../media/logo.png'
import '../styles/Header.css'
import {PagesLink} from "../common/models";
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <div className='header-wrap'>
            <img src={logo} className='app__logo_medium' alt="Средний логотип"/>
            <nav className='header__nav'>
                <NavLink to={PagesLink.schedule} >
                    РАСПИСАНИЕ
                </NavLink> /
                <NavLink to={PagesLink.timesheet} >
                    ГРАФИК
                </NavLink> /
                <NavLink to={PagesLink.request} >
                    ЗАЯВКИ
                </NavLink> /
                <NavLink to={PagesLink.docs} className='header__nav-last-child'>
                    ОТЧЕТЫ
                </NavLink>
            </nav>
            <button>user</button>
        </div>
    );
}

export default Header;
