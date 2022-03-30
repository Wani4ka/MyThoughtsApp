import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {AdaptivityProvider, ConfigProvider, Root, AppRoot} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import LoginPageComponent from './components/login/AuthPageComponent'
import {get} from 'axios'
import MainPageComponent from './components/MainPageComponent'
import LoadingScreenComponent from './components/LoadingScreenComponent'

const App = () => {
    const [activeView, setActiveView] = useState('loading')
    const [user, setUser] = useState(false)

    // show user log in dialog only if we can't access protected api
    useEffect(() => {
        get('/auth/whoami').then((res) => {
            setUser(res.data.name)
            setActiveView('main')
        }).catch(() => setActiveView('login'))
    }, [])

    return (
        <AppRoot>
            <Root activeView={activeView}>
                <LoadingScreenComponent id='loading'/>
                <LoginPageComponent id='login' onLogin={(res) => {
                    setUser(res.data.name)
                    setActiveView('main')
                }} />
                <MainPageComponent id='main' user={user} requestLogin={() => setActiveView('login')} />
            </Root>
        </AppRoot>
    );
};

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <App />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root')
);