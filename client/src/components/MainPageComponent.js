import React, {useEffect, useState} from 'react'
import {
    Button, ModalCard, ModalRoot, Pagination,
    Panel,
    PanelHeader,
    PanelHeaderButton, Placeholder, ScreenSpinner, Spacing,
    SplitCol,
    SplitLayout, useAdaptivity,
    View, ViewWidth,
} from '@vkontakte/vkui'
import {
    Icon28DoorArrowLeftOutline,
    Icon56ArrowRightDoorOutline, Icon56ArticleOutline,
    Icon56ErrorTriangleOutline,
} from '@vkontakte/icons'
import {get, post} from 'axios'
import errorMessage from '../errors'
import ThoughtComponent from './ThoughtComponent'
import NewThoughtComponent from './NewThoughtComponent'
import FooterComponent from './FooterComponent'

export default (props) => {
    const [popout, setPopout] = useState()
    const [modalText, setModalText] = useState()
    const [activeModal, setActiveModal] = useState()
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [shown, setShown] = useState(false)
    const [thoughts, setThoughts] = useState([])
    const { viewWidth } = useAdaptivity()

    const logOut = () => {
        setPopout(() => <ScreenSpinner/>)
        post('/auth/logout').then(props.requestLogin).catch(err => {
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

    const superLogOut = props.logOut
    const refresh = () => {
        setPopout(() => <ScreenSpinner/>)
        get('/api/thoughts/get', { params: {page} }).then((res) => {
            setThoughts(res.data.thoughts)
            setTotalPages(res.data.pages)
            setShown(true)
        }).catch(err => {
            if (err.response.status === 403) {
                superLogOut()
                return
            }
            setModalText(errorMessage(err.response))
            setActiveModal('error')
        }).finally(() => setPopout(undefined))
    }
    useEffect(refresh, [page, superLogOut])

    return (
        <SplitLayout
            popout={popout}
            modal={modal}
            header={viewWidth >= ViewWidth.SMALL_TABLET && <PanelHeader separator={false}/>}
        >
            {viewWidth === ViewWidth.DESKTOP && (<SplitCol/>)}
            <SplitCol>
                <View activePanel="panel2.1" id="main">
                    <Panel id="panel2.1">{shown && <>
                        <PanelHeader
                            left={
                                <PanelHeaderButton title='Выйти' aria-label='Выйти' onClick={() => setActiveModal('logout-confirm')}>
                                    <Icon28DoorArrowLeftOutline/>
                                </PanelHeaderButton>
                            }
                        >MyThoughts</PanelHeader>
                        <NewThoughtComponent user={props.user} onSubmit={() => {
                            setPage(1)
                            refresh()
                        }} setPopout={setPopout} setActiveModal={setActiveModal} setModalText={setModalText} logOut={logOut} />
                        {totalPages > 1 && (<Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onChange={setPage}
                            style={{display:'flex',justifyContent: 'center'}}
                        />)}
                        <Spacing size={16}/>
                        {thoughts.map((thought) => (<ThoughtComponent thought={thought} key={thought.id} />))}
                        {thoughts.length === 0 && (<Placeholder
                            header='Здесь еще нет мыслей'
                            icon={<Icon56ArticleOutline/>}
                        >Начните вести нашу общую историю, изложив свои мысли выше.</Placeholder>)}
                    </>}
                        <FooterComponent/>
                    </Panel>
                </View>
            </SplitCol>
            {viewWidth === ViewWidth.DESKTOP && (<SplitCol/>)}
        </SplitLayout>
    )
}