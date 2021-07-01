const today = new Date()

const getDayName = day => {
    switch (day) {
        case 1:
            return 'Lunes'
        case 2:
            return 'Martes'
        case 3:
            return 'Miércoles'
        case 4:
            return 'Jueves'
        case 5:
            return 'Viernes'
        case 6:
            return 'Sábado'
        case 0:
            return 'Domingo'
        default:
            break
    }
}

export const composeListName = () => {
    const dayName = getDayName(today.getDay())
    const day = today.getDate()
    const dayString = day >= 10 ? day.toString() : '0' + day.toString()
    const month = today.getMonth() + 1
    const monthString = month >= 10 ? month.toString() : '0' + month.toString()
    const year = today.getFullYear()

    return `${dayName}_${dayString}-${monthString}-${year}`
}
