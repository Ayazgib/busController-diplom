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
                </NavLink> <b style={{color: '#CEBBFB'}}>/</b>
                <NavLink to={PagesLink.timesheet} >
                    ГРАФИК
                </NavLink> <b style={{color: '#CEBBFB'}}>/</b>
                <NavLink to={PagesLink.change_driver} >
                    ЗАЯВКИ
                </NavLink> <b style={{color: '#CEBBFB'}}>/</b>
                <NavLink to={PagesLink.docs} className='header__nav-last-child'>
                    ОТЧЕТЫ
                </NavLink>
            </nav>
            <button>user</button>
        </div>
    );
}

export default Header;
