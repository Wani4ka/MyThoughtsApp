import React from 'react'

const ActiveStoryContext = React.createContext({
    activeStory: '',
    onStoryChange: () => {},
})
export default ActiveStoryContext