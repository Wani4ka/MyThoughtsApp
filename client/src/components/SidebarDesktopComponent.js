import {Cell, Group, Panel, PanelHeader, SplitCol} from '@vkontakte/vkui'
import {Icon28DoorArrowLeftOutline, Icon28NewsfeedOutline, Icon28WriteSquareOutline} from '@vkontakte/icons'
import React from 'react'

const cellSelectedStyle = {
    backgroundColor: 'var(--button_secondary_background)',
    borderRadius: 8,
}

export default ({ activeStory, onStoryChange, onLogoutRequest }) => {
    return (
        <SplitCol fixed width={280} maxWidth={280}>
            <Panel>
                <PanelHeader />
                <Group>
                    <Group mode='plain'>
                        <Cell
                            disabled={activeStory === 'feed'}
                            style={activeStory === 'feed' ? cellSelectedStyle : {}}
                            data-story='feed'
                            onClick={onStoryChange}
                            before={<Icon28NewsfeedOutline />}
                        >Читать</Cell>
                        <Cell
                            disabled={activeStory === 'write'}
                            style={activeStory === 'write' ? cellSelectedStyle : {}}
                            data-story='write'
                            onClick={onStoryChange}
                            before={<Icon28WriteSquareOutline />}
                        >Писать</Cell>
                    </Group>
                    <Group mode='plain'>
                        <Cell
                            onClick={onLogoutRequest}
                            before={<Icon28DoorArrowLeftOutline />}
                        >Выход</Cell>
                    </Group>
                </Group>
            </Panel>
        </SplitCol>
    )
}