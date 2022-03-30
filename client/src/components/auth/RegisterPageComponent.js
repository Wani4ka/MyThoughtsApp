import React, {useEffect, useState} from 'react'
import {
    Button, Div, FormLayout, FormStatus, Group, ModalCard, ModalRoot,
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
import FooterComponent from '../FooterComponent'
import {useNavigate} from 'react-router-dom'
import UsernameComponent, {isValidUsername} from './UsernameComponent'
import PasswordComponent, {isValidPassword} from './PasswordComponent'
import InviteComponent from './InviteComponent'

export default (props) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [invite, setInvite] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [popout, setPopout] = useState()
    const [activeModal, setActiveModal] = useState()
    const [loginError, setLoginError] = useState('')
    const { viewWidth } = useAdaptivity()

    const handleError = (err) => {
        setLoginError(errorMessage(err.response))
        setActiveModal('login-error')
    }

    useEffect(() => setDisabled(!(isValidUsername(username)
        && isValidPassword(password) && invite !== '')), [username, password, invite])

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
                <View activePanel='panel1.1' id='register'>
                    <Panel id='panel1.1'>
                        <PanelHeader>MyThoughts</PanelHeader>
                        <Group>
                            <FormLayout onSubmit={register}>
                                <FormStatus header='Добро пожаловать!'>
                                    MyThoughts позволяет неограниченно делиться своими мыслями обо всем подряд, а также просматривать мысли, которыми поделились другие люди.
                                </FormStatus>
                                <UsernameComponent value={username} onChange={setUsername}/>
                                <PasswordComponent value={password} onChange={setPassword}/>
                                <InviteComponent value={invite} onChange={setInvite}/>
                                <Div>
                                    <Button stretched size='l' disabled={disabled} onClick={register}>Зарегистрироваться</Button>
                                </Div>
                                <Spacing separator='bottom'/>
                                <Div>
                                    <Text weight='1'>Уже есть аккаунт?</Text>
                                </Div>
                                <Div>
                                    <Button stretched appearance='positive'
                                            onClick={() => navigate('/login')}>
                                        Войти
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