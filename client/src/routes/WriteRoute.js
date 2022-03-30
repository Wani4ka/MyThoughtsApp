import React, {useEffect, useState} from 'react'
import {AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui'
import {get} from 'axios'
import {useNavigate} from 'react-router-dom'
import NewThoughtComponent from '../components/NewThoughtComponent'

export default () => {
    const navigate = useNavigate()
    const [ user, setUser ] = useState('')

    // show user log in dialog if we can't access protected api
    useEffect(() => {
        get('/auth/whoami').then((res) => setUser(res.data.name)).catch(() => navigate('/login'))
    }, [navigate])

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <NewThoughtComponent user={user} />
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}