import React from 'react';
import {makeStyles} from '@mui/styles';
import '../styles/Auth.css'
import logo from '../media/logo.png'
import {PagesLink} from "../common/models";
import {NavLink} from "react-router-dom";




function Auth() {

    return (
        <div className='auth-wrap'>
            <h1 className='auth__title'>Авторизация</h1>
            <div className="text-field__wrapper">
                <div className="text-field text-field_floating-2">
                    <input className="text-field__input text-field__input_invalid" placeholder='Логин' type="text" name="login" id="login"
                            />
                        <label className="text-field__label" htmlFor="login">Логин</label>
                </div>
                {/*<div className="text-field__message text-field__message_invalid">Укажите город.</div>*/}
            </div>

            <div className="text-field__wrapper">
                <div className="text-field text-field_floating-2">
                    <input className="text-field__input text-field__input_invalid" type="password" name="password" id="password"
                           placeholder='Пароль' />
                    <label className="text-field__label" htmlFor="password" >Пароль</label>
                </div>
                {/*<div className="text-field__message text-field__message_invalid">Укажите город.</div>*/}
            </div>
            <NavLink to={PagesLink.main} >
                <button className='auth__btn' >ПОСТУЧАТЬСЯ и ВОЙТИ</button>
            </NavLink>
            <img src={logo} className='app__logo-small' alt="Логотип"/>
        </div>
    );
}

export default Auth;
