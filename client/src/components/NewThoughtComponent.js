import React, {useState} from 'react'
import {
    Button,
    Card,
    CardGrid, Epic,
    Group, IconButton, ModalCard, ModalRoot,
    Panel,
    PanelHeader,
    ScreenSpinner,
    SplitCol, SplitLayout, Textarea, useAdaptivity,
    View, ViewWidth,
} from '@vkontakte/vkui'
import {post} from 'axios'
import errorMessage from '../errors'
import FooterComponent from './FooterComponent'
import {useNavigate} from 'react-router-dom'
import SidebarDesktopComponent from './SidebarDesktopComponent'
import MobileTabbarComponent from './MobileTabbarComponent'
import {Icon28Send, Icon56ArrowRightDoorOutline, Icon56ErrorTriangleOutline} from '@vkontakte/icons'

export default ({ user }) => {
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const [popout, setPopout] = useState()
    const [modalText, setModalText] = useState()
    const [activeModal, setActiveModal] = useState('')
    const { viewWidth } = useAdaptivity()
    const isDesktop = viewWidth >= ViewWidth.TABLET

    const onStoryChange = ({currentTarget}) => navigate('/' + currentTarget.dataset.story)
    const requestLogin = () => navigate('/login')

    const logOut = () => {
        setPopout(() => <ScreenSpinner/>)
        post('/auth/logout').then(requestLogin).catch(err => {
            setModalText(errorMessage(err.response))
            setActiveModal('error')
        }).finally(() => setPopout(undefined))
    }

    const send = () => {
        setPopout(() => <ScreenSpinner/>)
        post('/api/thoughts/write', { content: text }).then(() => {
            setText('')
            navigate('/feed?page=1')
        }).catch((err) => {
            if (err.response.status === 403) {
                navigate('/login')
                return
            }
            setModalText(errorMessage(err.response))
            setActiveModal('error')
        }).finally(() => setPopout(undefined))
    }

    const modal = (
        <ModalRoot
            activeModal={activeModal}
            onClose={() => setActiveModal(undefined)}
        >
            <ModalCard
                id='error'
                header='Ошибка'
                icon={<Icon56ErrorTriangleOutline style={{color:'rgb(255,0,0)'}} />}
                subheader={modalText}
            />
            <ModalCard
                id='logout-confirm'
                header='Вы уверены?'
                icon={<Icon56ArrowRightDoorOutline/>}
                subheader='Вы собираетесь выйти из аккаунта. Вы точно хотите это сделать?'
                actions={
                    <Button size='l' mode='primary' aria-label='Выйти' stretched onClick={logOut}>Выйти</Button>
                }
            />
        </ModalRoot>
    )

    return (
        <SplitLayout
            popout={popout}
            modal={modal}
            style={{justifyContent: 'center'}}
            header={isDesktop && <PanelHeader separator={false}/>}
        >
            {isDesktop && <SidebarDesktopComponent
                activeStory='write'
                onStoryChange={onStoryChange}
                onLogoutRequest={() => setActiveModal('logout-confirm')}
            />}
            <SplitCol
                animate={!isDesktop}
                spaced={isDesktop}
                width={isDesktop ? '560px' : '100%'}
                maxWidth={isDesktop ? '560px' : '100%'}
            >
                <Epic
                    activeStory='write'
                    tabbar={
                        !isDesktop && (<MobileTabbarComponent
                            activeStory='write'
                            onStoryChange={onStoryChange}
                            onLogoutRequest={() => setActiveModal('logout-confirm')}
                        />)
                    }
                >
                    <View activePanel='panel3.1' id='write'>
                        <Panel id='panel3.1'>
                            <PanelHeader>MyThoughts</PanelHeader>{user && (
                            <Group>
                                <CardGrid size='l'>
                                    <Card mode='shadow'>
                                        <SplitLayout>
                                            <SplitCol>
                                                <Textarea
                                                    placeholder={`Что у ${user} на уме сегодня?`}
                                                    onChange={({target}) => setText(target.value)}
                                                >{text}
                                                </Textarea>
                                            </SplitCol>
                                            <SplitCol fixed width={44} maxWidth={44}>
                                                <IconButton aria-label='Отправить' onClick={send} disabled={text.length < 10 || text.length > 8192}>
                                                    <Icon28Send style={{color:'rgb(0,140,255)'}}/>
                                                </IconButton>
                                            </SplitCol>
                                        </SplitLayout>
                                    </Card>
                                </CardGrid>
                            </Group>)}
                            <FooterComponent/>
                        </Panel>
                    </View>
                </Epic>
            </SplitCol>
        </SplitLayout>
    )
}