import React, {useEffect} from 'react'
import {AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui'
import {useNavigate} from 'react-router-dom'
import {get} from 'axios'
import FeedComponent from '../components/FeedComponent'

export default () => {
    const navigate = useNavigate()

    // show user log in dialog if we can't access protected api
    useEffect(() => {
        get('/auth/whoami').catch(() => navigate('/login'))
    }, [navigate])

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <FeedComponent />
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}