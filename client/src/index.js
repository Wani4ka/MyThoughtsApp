import React from 'react'
import ReactDOM from 'react-dom'
import '@vkontakte/vkui/dist/vkui.css'
import {BrowserRouter} from 'react-router-dom'
import { Routes, Route} from "react-router-dom";
import './style.css'
import LoginRoute from './routes/LoginRoute'
import RegisterRoute from './routes/RegisterRoute'
import MainRoute from './routes/MainRoute'

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainRoute story='feed'/>}/>
            <Route path='/login' element={<LoginRoute/>}/>
            <Route path='/register' element={<RegisterRoute/>}/>
            <Route path='/feed' element={<MainRoute story='feed'/>}/>
            <Route path='/write' element={<MainRoute story='write'/>}/>
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
)