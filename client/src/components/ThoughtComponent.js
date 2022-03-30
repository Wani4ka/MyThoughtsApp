import React from 'react'
import {Caption, CardGrid, ContentCard, Group, Title} from '@vkontakte/vkui'
import format from 'date-format'

export default (props) => {
    return (
        <Group>
            <Title level='3' style={{marginBottom:8,marginLeft:8}}>{props.thought.author.name}</Title>
            <CardGrid size='l'>
                <ContentCard
                    mode='outline'
                    text={props.thought.content}
                >
                </ContentCard>
            </CardGrid>
            <Caption weight='3' level='1' style={{marginTop:8,marginLeft:8}}>
                {format.asString('dd.MM.yyyy hh:mm', new Date(props.thought.createdAt))}
            </Caption>
        </Group>
    )
}