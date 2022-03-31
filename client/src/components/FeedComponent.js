import {useNavigate, useSearchParams} from 'react-router-dom'
import {
    Button,
    Epic, ModalCard, ModalRoot,
    Pagination,
    Panel,
    PanelHeader,
    Placeholder,
    ScreenSpinner,
    SplitCol,
    SplitLayout, useAdaptivity,
    View, ViewWidth,
} from '@vkontakte/vkui'
import ThoughtComponent from './ThoughtComponent'
import {Icon56ArrowRightDoorOutline, Icon56ArticleOutline, Icon56ErrorTriangleOutline} from '@vkontakte/icons'
import FooterComponent from './FooterComponent'
import React, {useEffect, useState} from 'react'
import {get, post} from 'axios'
import errorMessage from '../errors'
import SidebarDesktopComponent from './SidebarDesktopComponent'
import MobileTabbarComponent from './MobileTabbarComponent'

export default () => {
    const [popout, setPopout] = useState()
    const [modalText, setModalText] = useState()
    const [activeModal, setActiveModal] = useState('')
    const { viewWidth } = useAdaptivity()
    const isDesktop = viewWidth >= ViewWidth.TABLET
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(parseInt(searchParams.get('page') || '1') || 1)
    const [thoughts, setThoughts] = useState([])
    const [loaded, setLoaded] = useState(false)

    const onStoryChange = ({currentTarget}) => navigate('/' + currentTarget.dataset.story)
    const requestLogin = () => navigate('/login')

    useEffect(() => {
        setPage(parseInt(searchParams.get('page') || '1') || 1)
    }, [searchParams])

    const logOut = () => {
        setPopout(() => <ScreenSpinner/>)
        post('/auth/logout').then(requestLogin).catch(err => {
            setModalText(errorMessage(err.response))
            setActiveModal('error')
        }).finally(() => setPopout(undefined))
    }

    const refresh = () => {
        setPopout(() => <ScreenSpinner/>)
        get('/api/thoughts/get', { params: {page} }).then((res) => {
            setThoughts(res.data.thoughts)
            setTotalPages(res.data.pages)
            setLoaded(true)
        }).catch(err => {
            if (err.response.status === 403) {
                navigate('/login')
                return
            }
            setModalText(errorMessage(err.response))
            setActiveModal('error')
        }).finally(() => setPopout(() => undefined))
    }
    useEffect(refresh, [page, navigate, setActiveModal, setModalText, setPopout])

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

    const pagination = <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={page => setSearchParams({ page })}
        style={{display:'flex',justifyContent: 'center'}}
    />

    return (
        <SplitLayout
            popout={popout}
            modal={modal}
            style={{justifyContent: 'center'}}
            header={isDesktop && <PanelHeader separator={false}/>}
        >
            {isDesktop && <SidebarDesktopComponent
                activeStory='feed'
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
                    activeStory='feed'
                    tabbar={
                        !isDesktop && (<MobileTabbarComponent
                            activeStory='feed'
                            onStoryChange={onStoryChange}
                            onLogoutRequest={() => setActiveModal('logout-confirm')}
                        />)
                    }
                >
                    <View activePanel='panel2.1' id='feed'>
                        <Panel id='panel2.1'>
                            <PanelHeader>MyThoughts</PanelHeader>
                            {thoughts.map((thought) => (<ThoughtComponent thought={thought} key={thought.id} />))}
                            {loaded && thoughts.length === 0 && (<Placeholder
                                header='Здесь еще нет мыслей'
                                icon={<Icon56ArticleOutline/>}
                            >Начните вести нашу общую историю, изложив свои мысли выше.</Placeholder>)}
                            {totalPages > 1 && pagination}
                            <FooterComponent/>
                        </Panel>
                    </View>
                </Epic>
            </SplitCol>
        </SplitLayout>
    )
}