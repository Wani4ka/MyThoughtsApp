import {FormItem, Input} from '@vkontakte/vkui'
import React, {useState} from 'react'

export const isValidPassword = (password) => password.length >= 6 && password.length <= 32

export default (props) => {
    const [edited, setEdited] = useState(false)

    const onChange = (e) => {
        setEdited(true)
        const { value } = e.currentTarget
        props.onChange(value)
    }

    return (
        <FormItem
            top='Пароль'
            status={isValidPassword(props.value) || !edited ? 'default' : 'error'}
            bottom={!isValidPassword(props.value) && 'От 6 до 32 символов'}
        >
            <Input type='password' value={props.password} onChange={onChange} />
        </FormItem>
    )
}
