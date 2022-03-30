import React, {useState} from 'react'
import {FormItem, Input} from '@vkontakte/vkui'

export default (props) => {
    const [edited, setEdited] = useState(false)

    const onChange = (e) => {
        setEdited(true)
        const { value } = e.currentTarget
        props.onChange(value)
    }

    return (
        <FormItem
            top='Инвайт-код'
            bottom={!edited && 'Получить его можно у разработчика'}
        >
            <Input type='password' value={props.value} onChange={onChange} />
        </FormItem>
    )
}