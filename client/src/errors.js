const errors = {
    9: 'Указан неверный инвайт. Обратитесь к разработчику, чтобы получить инвайт для входа или регистрации',
    10: 'Отсутствует пароль',
    11: 'Пароль должен иметь длину от 6 до 32 символов',
    12: 'Пользователь с таким именем уже зарегистрирован',
    13: 'Пользователя с таким именем не существует',
    14: 'Неверный пароль',
    500: 'Произошла внутренняя ошибка. Разработчики уже получили сообщение об ошибке'
}

export default (response) => {
    if (!(response && response.data)) return 'Произошла ошибка при попытке подключиться к серверу'
    response = response.data
    if (!(response && response.error)) return response
    return errors[response.error.code] || response.error.message
}