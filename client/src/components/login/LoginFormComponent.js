import React, {useEffect, useState} from 'react'
import {Button} from '@vkontakte/vkui'
import UsernameComponent, {isValidUsername} from './UsernameComponent'
import PasswordComponent, {isValidPassword} from './PasswordComponent'

export default (props) => {
    const [disabled, setDisabled] = useState(true)
    useEffect(() => setDisabled(!(isValidUsername(props.username) && isValidPassword(props.password))), [props.username, props.password])

    return (
        <>
            <UsernameComponent value={props.username} onChange={props.setUsername}/>
            <PasswordComponent value={props.password} onChange={props.setPassword}/>
            <Button stretched size='l' disabled={disabled} onClick={props.onSubmit}>Войти</Button>
        </>
    )
}