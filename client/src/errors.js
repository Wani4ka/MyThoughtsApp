const errors = {
    9: 'Указан неверный инвайт. Обратитесь к разработчику, чтобы получить инвайт для входа или регистрации'
}

export default (data) => {
    if (!(data && data.error)) return data
    return errors[data.error.code] || data.error.message
}