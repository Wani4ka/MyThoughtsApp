import React from 'react'
import ReactDOM from 'react-dom'
import '@vkontakte/vkui/dist/vkui.css'
import {BrowserRouter} from 'react-router-dom'
import { Routes, Route} from "react-router-dom";
import './style.css'
import LoginRoute from './routes/LoginRoute'
import RegisterRoute from './routes/RegisterRoute'
import FeedRoute from './routes/FeedRoute'
import WriteRoute from './routes/WriteRoute'

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<FeedRoute/>}/>
            <Route path='/login' element={<LoginRoute/>}/>
            <Route path='/register' element={<RegisterRoute/>}/>
            <Route path='/feed' element={<FeedRoute/>}/>
            <Route path='/write' element={<WriteRoute/>}/>
        </Routes>
    </BrowserRouter>,
  document.getElementById('root')
)