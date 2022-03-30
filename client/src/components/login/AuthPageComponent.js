import React, {useState} from 'react'
import {
    Button, Div, FormLayout, Group, ModalCard, ModalRoot,
    Panel,
    PanelHeader,
    ScreenSpinner, Spacing,
    SplitCol,
    SplitLayout, Text, useAdaptivity,
    View, ViewWidth,
} from '@vkontakte/vkui'
import {post} from 'axios'
import errorMessage from '../../errors'
import {Icon56ErrorTriangleOutline} from '@vkontakte/icons'
import RegisterFormComponent from './RegisterFormComponent'
import LoginFormComponent from './LoginFormComponent'
import FooterComponent from '../FooterComponent'

export default (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invite, setInvite] = useState('')
    const [popout, setPopout] = useState()
    const [activeModal, setActiveModal] = useState()
    const [loginError, setLoginError] = useState('')
    const [authMode, setAuthMode] = useState('login')
    const { viewWidth } = useAdaptivity()

    const handleError = (err) => {
        setLoginError(errorMessage(err.response))
        setActiveModal('login-error')
    }

    const logIn = async (e) => {
        e.preventDefault()
        setPopout(() => <ScreenSpinner/>)
        post('/auth/login', { username, password })
            .then(props.onLogin)
            .catch(handleError)
            .finally(() => setPopout(undefined))
    }

    const register = async (e) => {
        e.preventDefault()
        setPopout(() => <ScreenSpinner/>)
        post('/auth/register', { username, password, invite })
            .then(props.onLogin)
            .catch(handleError)
            .finally(() => setPopout(undefined))
    }

    const modal = (
        <ModalRoot
            activeModal={activeModal}
            onClose={() => setActiveModal(undefined)}
        >
            <ModalCard
                id='login-error'
                header='Ошибка авторизации'
                icon={<Icon56ErrorTriangleOutline style={{color:'rgb(255,0,0)'}} />}
                subheader={loginError}
            />
        </ModalRoot>
    )

    return (
        <SplitLayout
            popout={popout}
            modal={modal}
            header={viewWidth >= ViewWidth.SMALL_TABLET && <PanelHeader separator={false}/>}
        >
            {viewWidth === ViewWidth.DESKTOP && (<SplitCol/>)}
            <SplitCol>
                <View activePanel="panel1.1" id="login">
                    <Panel id="panel1.1">
                        <PanelHeader>MyThoughts</PanelHeader>
                        <Group>
                            <FormLayout onSubmit={authMode === 'register' ? register: logIn}>
                                {authMode === 'register' ? (<RegisterFormComponent
                                    username={username} setUsername={setUsername}
                                    password={password} setPassword={setPassword}
                                    invite={invite} setInvite={setInvite}
                                    onSubmit={register} changeMode={() => setAuthMode('login')}
                                />) : (<LoginFormComponent
                                    username={username} setUsername={setUsername}
                                    password={password} setPassword={setPassword}
                                    onSubmit={logIn} changeMode={() => setAuthMode('register')}
                                />)}
                                <Spacing separator='bottom'/>
                                <Div>
                                    <Text weight='1'>{authMode === 'register' ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}</Text>
                                </Div>
                                <Div>
                                    <Button stretched appearance='positive'
                                            onClick={() => setAuthMode((mode) => mode === 'register' ? 'login' : 'register')}>
                                        {authMode === 'register' ? 'Войти' : 'Зарегистрироваться'}
                                    </Button>
                                </Div>
                            </FormLayout>
                        </Group>
                        <FooterComponent/>
                    </Panel>
                </View>
            </SplitCol>
            {viewWidth === ViewWidth.DESKTOP && (<SplitCol/>)}
        </SplitLayout>
    )
}