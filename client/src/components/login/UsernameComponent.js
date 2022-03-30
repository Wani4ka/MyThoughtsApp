import React, {useState} from 'react'
import {FormItem, Input} from '@vkontakte/vkui'

export const isValidUsername = (username) => /^[a-z0-9_]{3,}$/.test(username)

export default (props) => {
    const [edited, setEdited] = useState(false)

    const onChange = (e) => {
        setEdited(true)
        const { value } = e.currentTarget
        props.onChange(value)
    }

    return (
        <FormItem
            top='Имя пользователя'
            status={isValidUsername(props.value) || !edited ? 'default' : 'error'}
            bottom={!isValidUsername(props.value) && 'Имя пользователя должно иметь не меньше 3 символов, состоять из маленьких латинских букв, цифр и подчеркиваний'}
        >
            <Input value={props.value} onChange={onChange} />
        </FormItem>
    )
}