import React, {useEffect, useState} from 'react'
import {
    Button, FormLayout, FormStatus,
    Group, ModalCard, ModalRoot,
    Panel,
    PanelHeader,
    ScreenSpinner,
    SplitCol,
    SplitLayout, useAdaptivity,
    View, ViewWidth,
} from '@vkontakte/vkui'
import UsernameComponent, {isValidUsername} from './UsernameComponent'
import InviteComponent from './InviteComponent'
import {post} from 'axios'
import errorMessage from '../../errors'
import {Icon56ErrorTriangleOutline} from '@vkontakte/icons'

export default (props) => {
    const [username, setUsername] = useState('')
    const [invite, setInvite] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [popout, setPopout] = useState()
    const [activeModal, setActiveModal] = useState()
    const [loginError, setLoginError] = useState('')
    const { viewWidth } = useAdaptivity()

    useEffect(() => {
        setDisabled(!(isValidUsername(username) && invite !== ''))
    }, [username, invite])

    const logIn = async () => {
        setPopout(() => <ScreenSpinner/>)
        post('/auth/login', { username, invite }).then(props.onLogin).catch((err) => {
            setLoginError(errorMessage(err.response.data))
            setActiveModal('login-error')
        }).finally(() => setPopout(undefined))
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
                            <FormLayout>
                                <FormStatus header='Добро пожаловать!' mode='default'>
                                    MyThoughts позволяет неограниченно делиться своими мыслями обо всем подряд, а также просматривать мысли, которыми поделились другие люди.
                                    <br/><br/>
                                    Для продолжения необходимо выполнить вход.
                                </FormStatus>
                                <UsernameComponent value={username} onChange={setUsername}/>
                                <InviteComponent value={invite} onChange={setInvite}/>
                                <Button stretched size='l' disabled={disabled} onClick={logIn}>Войти</Button>
                            </FormLayout>
                        </Group>
                    </Panel>
                </View>
            </SplitCol>
            {viewWidth === ViewWidth.DESKTOP && (<SplitCol/>)}
        </SplitLayout>
    )
}