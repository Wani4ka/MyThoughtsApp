import {Tabbar, TabbarItem} from '@vkontakte/vkui'
import {Icon28DoorArrowLeftOutline, Icon28NewsfeedOutline, Icon28WriteSquareOutline} from '@vkontakte/icons'
import React from 'react'

export default ({activeStory, onStoryChange, onLogoutRequest }) => {
    return (<Tabbar>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === 'feed'}
            data-story='feed'
            text='Читать'
        >
            <Icon28NewsfeedOutline />
        </TabbarItem>
        <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === 'write'}
            data-story='write'
            text='Писать'
        >
            <Icon28WriteSquareOutline />
        </TabbarItem>
        <TabbarItem
            onClick={onLogoutRequest}
            text='Выход'
        >
            <Icon28DoorArrowLeftOutline />
        </TabbarItem>
    </Tabbar>
)
}