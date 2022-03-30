import React from 'react'
import {FormItem, Input} from '@vkontakte/vkui'

export default (props) => {
    return (
        <FormItem
            top='Инвайт-код'
            bottom='Получить его можно у разработчика'
        >
            <Input type='password' value={props.value} onChange={(e) => props.onChange(e.target.value)} />
        </FormItem>
    )
}