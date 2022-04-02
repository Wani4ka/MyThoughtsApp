import {useNavigate} from 'react-router-dom'
import {
    Button,
    Epic, ModalCard, ModalRoot,
    PanelHeader,
    ScreenSpinner,
    SplitCol,
    SplitLayout, useAdaptivity,
    ViewWidth,
} from '@vkontakte/vkui'
import {Icon56ArrowRightDoorOutline, Icon56ErrorTriangleOutline} from '@vkontakte/icons'
import React, {useState} from 'react'
import {post} from 'axios'
import errorMessage from '../errors'
import DesktopSidebarComponent from './DesktopSidebarComponent'
import MobileTabbarComponent from './MobileTabbarComponent'
import OverlayContext from '../context/OverlayContext'
import FeedComponent from './FeedComponent'
import NewThoughtComponent from './NewThoughtComponent'
import LogoutContext from '../context/LogoutContext'
import ActiveStoryContext from '../context/ActiveStoryContext'

export default ({ story }) => {

    const [popout, setPopout] = useState()
    const [modalText, setModalText] = useState()
    const [activeModal, setActiveModal] = useState('')
    const overlay = { popout, setPopout, modalText, setModalText, activeModal, setActiveModal }

    const { viewWidth } = useAdaptivity()
    const isDesktop = viewWidth >= ViewWidth.TABLET
    const navigate = useNavigate()

    const onStoryChange = ({currentTarget}) => navigate('/' + currentTarget.dataset.story)
    const activeStoryValue = { activeStory: story, onStoryChange }

    const forceLogOut = () => {
        setPopout(() => <ScreenSpinner/>)
        post('/auth/logout').then(() => navigate('/login')).catch(err => {
            setModalText(errorMessage(err.response))
            setActiveModal('error')
        }).finally(() => setPopout(undefined))
    }
    const logOut = () => setActiveModal('logout-confirm')

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
                    <Button size='l' mode='primary' aria-label='Выйти' stretched onClick={forceLogOut}>Выйти</Button>
                }
            />
        </ModalRoot>
    )

    return (
        <LogoutContext.Provider value={logOut}><ActiveStoryContext.Provider value={activeStoryValue}><OverlayContext.Provider value={overlay}>
        <SplitLayout
            popout={popout}
            modal={modal}
            style={{justifyContent: 'center'}}
            header={isDesktop && <PanelHeader separator={false}/>}
        >
            {isDesktop && <DesktopSidebarComponent/>}
            <SplitCol
                animate={!isDesktop}
                spaced={isDesktop}
                width={isDesktop ? '560px' : '100%'}
                maxWidth={isDesktop ? '560px' : '100%'}
            >
                <Epic
                    activeStory={story}
                    tabbar={!isDesktop && (<MobileTabbarComponent/>)}
                >
                    <FeedComponent id='feed'/>
                    <NewThoughtComponent id='write'/>
                </Epic>
            </SplitCol>
        </SplitLayout>
        </OverlayContext.Provider></ActiveStoryContext.Provider></LogoutContext.Provider>
    )
}