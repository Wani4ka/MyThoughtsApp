import React, {useEffect, useState} from 'react'
import {
    ScreenSpinner, SplitCol,
    SplitLayout, useAdaptivity,
    View, ViewWidth,
} from '@vkontakte/vkui'

export default () => {
    const [popout, setPopout] = useState()
    const { viewWidth } = useAdaptivity()

    useEffect(() => setPopout(() => <ScreenSpinner />), [])

    return (
        <SplitLayout
            popout={popout}
        >
            {viewWidth === ViewWidth.DESKTOP && (<SplitCol/>)}
            <SplitCol>
                <View activePanel="panel0.1" id="loading"/>
            </SplitCol>
            {viewWidth === ViewWidth.DESKTOP && (<SplitCol/>)}
        </SplitLayout>
    )
}