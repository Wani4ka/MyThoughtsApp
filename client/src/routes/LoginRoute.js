import React, {useEffect} from 'react'
import {get} from 'axios'
import {useNavigate} from 'react-router-dom'
import {AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui'
import LoginPageComponent from '../components/auth/LoginPageComponent'

export default () => {
    const navigate = useNavigate()

    // show user log in dialog only if we can't access protected api
    useEffect(() => {
        get('/auth/whoami').then(() => navigate('/'))
    }, [navigate])

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <LoginPageComponent onLogin={() => navigate('/')} />
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}