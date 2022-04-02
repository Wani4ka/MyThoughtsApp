import {Tabbar, TabbarItem} from '@vkontakte/vkui'
import {Icon28DoorArrowLeftOutline, Icon28NewsfeedOutline, Icon28WriteSquareOutline} from '@vkontakte/icons'
import React, {useContext} from 'react'
import LogoutContext from '../context/LogoutContext'
import ActiveStoryContext from '../context/ActiveStoryContext'

export default () => {
    const { logOut } = useContext(LogoutContext)
    const { activeStory, onStoryChange } = useContext(ActiveStoryContext)
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
            onClick={logOut}
            text='Выход'
        >
            <Icon28DoorArrowLeftOutline />
        </TabbarItem>
    </Tabbar>
)
}