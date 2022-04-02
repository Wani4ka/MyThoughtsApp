import React from 'react'

const OverlayContext = React.createContext({
    popout: <></>,
    setPopout: () => {},
    modalText: '',
    setModalText: () => {},
    activeModal: '',
    setActiveModal: () => {},
})
export default OverlayContext