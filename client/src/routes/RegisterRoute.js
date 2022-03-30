import React, {useEffect} from 'react'
import {get} from 'axios'
import {useNavigate} from 'react-router-dom'
import {AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui'
import RegisterPageComponent from '../components/auth/RegisterPageComponent'

export default () => {
    const navigate = useNavigate()

    // show user register dialog only if we can't access protected api
    useEffect(() => {
        get('/auth/whoami').then(() => navigate('/'))
    }, [navigate])

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <RegisterPageComponent onLogin={() => navigate('/')} />
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}