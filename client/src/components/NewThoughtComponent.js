import React, {useContext, useState} from 'react'
import {
    Card,
    CardGrid, Group, IconButton, Panel,
    PanelHeader,
    ScreenSpinner,
    SplitCol, SplitLayout, Textarea, View,
} from '@vkontakte/vkui'
import {post} from 'axios'
import errorMessage from '../errors'
import FooterComponent from './FooterComponent'
import {useNavigate} from 'react-router-dom'
import {Icon28Send} from '@vkontakte/icons'
import OverlayContext from '../context/OverlayContext'
import UserContext from '../context/UserContext'

export default () => {
    const user = useContext(UserContext)
    const overlay = useContext(OverlayContext)
    const navigate = useNavigate()
    const [text, setText] = useState('')

    const send = () => {
        overlay.setPopout(() => <ScreenSpinner/>)
        post('/api/thoughts/write', { content: text }).then(() => {
            setText('')
            navigate('/feed?page=1')
        }).catch((err) => {
            if (err.response.status === 403) {
                navigate('/login')
                return
            }
            overlay.setModalText(errorMessage(err.response))
            overlay.setActiveModal('error')
        }).finally(() => overlay.setPopout(undefined))
    }

    return (
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
    )
}