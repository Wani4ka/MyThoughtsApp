import React, {useState} from 'react'
import {Card, CardGrid, Group, ScreenSpinner, Title, WriteBar, WriteBarIcon} from '@vkontakte/vkui'
import {post} from 'axios'
import errorMessage from '../errors'

export default (props) => {
    const [text, setText] = useState('')

    const send = () => {
        props.setPopout(() => <ScreenSpinner/>)
        post('/api/thoughts/write', { content: text }).then(() => {
            setText('')
            props.onSubmit()
        }).catch((err) => {
            if (err.response.status === 403) {
                props.logOut()
                return
            }
            props.setModalText(errorMessage(err.response))
            props.setActiveModal('error')
        }).finally(() => props.setPopout(undefined))
    }

    return (
        <Group>
            <Title level='2' style={{marginBottom:8,marginLeft:8}}>Здравствуйте, {props.user}!</Title>
            <CardGrid size='l'>
                <Card mode='shadow'>
                    <WriteBar
                        value={text}
                        onChange={({target}) => setText(target.value)}
                        after={
                            <WriteBarIcon onClick={send} mode='send' disabled={text.length < 10 || text.length > 8192}/>
                        }
                        placeholder='Что у вас на уме сегодня?'
                    >
                    </WriteBar>
                </Card>
            </CardGrid>
        </Group>
    )
}