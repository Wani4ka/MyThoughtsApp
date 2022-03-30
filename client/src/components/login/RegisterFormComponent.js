import React, {useEffect, useState} from 'react'
import {Button, Div, FormStatus} from '@vkontakte/vkui'
import UsernameComponent, {isValidUsername} from './UsernameComponent'
import InviteComponent from './InviteComponent'
import PasswordComponent, {isValidPassword} from './PasswordComponent'

export default (props) => {
    const [disabled, setDisabled] = useState(true)
    useEffect(() => setDisabled(!(isValidUsername(props.username)
        && isValidPassword(props.password) && props.invite !== '')), [props.username, props.password, props.invite])

    return (
        <>
            <FormStatus header='Добро пожаловать!' mode='default'>
                MyThoughts позволяет неограниченно делиться своими мыслями обо всем подряд, а также просматривать мысли, которыми поделились другие люди.
            </FormStatus>
            <UsernameComponent value={props.username} onChange={props.setUsername}/>
            <PasswordComponent value={props.password} onChange={props.setPassword}/>
            <InviteComponent value={props.invite} onChange={props.setInvite}/>
            <Div>
                <Button stretched size='l' disabled={disabled} onClick={props.onSubmit}>Зарегистрироваться</Button>
            </Div>
        </>
    )
}