import React, {useEffect, useState} from 'react'
import {AdaptivityProvider, AppRoot, ConfigProvider} from '@vkontakte/vkui'
import {get} from 'axios'
import {useNavigate} from 'react-router-dom'
import UserContext from '../context/UserContext'
import MainPageComponent from '../components/MainPageComponent'

export default ({ story }) => {
    const navigate = useNavigate()
    const [ user, setUser ] = useState('')

    // show user log in dialog if we can't access protected api
    useEffect(() => {
        get('/auth/whoami').then((res) => setUser(res.data.name)).catch(() => navigate('/login'))
    }, [navigate])

    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <UserContext.Provider value={user}>
                    <AppRoot>
                        <MainPageComponent story={story} />
                    </AppRoot>
                </UserContext.Provider>
            </AdaptivityProvider>
        </ConfigProvider>
    )
}