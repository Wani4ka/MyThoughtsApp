import {useNavigate, useSearchParams} from 'react-router-dom'
import {
    Pagination,
    Panel,
    PanelHeader,
    Placeholder,
    ScreenSpinner,
    View,
} from '@vkontakte/vkui'
import ThoughtComponent from './ThoughtComponent'
import {Icon56ArticleOutline} from '@vkontakte/icons'
import FooterComponent from './FooterComponent'
import React, {useContext, useEffect, useState} from 'react'
import {get} from 'axios'
import errorMessage from '../errors'
import OverlayContext from '../context/OverlayContext'

export default () => {
    const overlay = useContext(OverlayContext)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(parseInt(searchParams.get('page') || '1') || 1)
    const [thoughts, setThoughts] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setPage(parseInt(searchParams.get('page') || '1') || 1)
    }, [searchParams])

    const refresh = () => {
        overlay.setPopout(() => <ScreenSpinner/>)
        get('/api/thoughts/get', { params: {page} }).then((res) => {
            setThoughts(res.data.thoughts)
            setTotalPages(res.data.pages)
            setLoaded(true)
        }).catch(err => {
            if (err.response.status === 403) {
                navigate('/login')
                return
            }
            overlay.setModalText(errorMessage(err.response))
            overlay.setActiveModal('error')
        }).finally(() => overlay.setPopout(() => undefined))
    }
    useEffect(refresh, [page, navigate, overlay.setActiveModal, overlay.setModalText, overlay.setPopout])

    const pagination = <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={page => setSearchParams({ page })}
        style={{display:'flex',justifyContent: 'center'}}
    />

    return (
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
    )
}