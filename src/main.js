const axios = require('axios')

const api = axios.create()

let now = new Date()

function main() {
    api.get('http://worldclockapi.com/api/json/utc/now').then(
        res => {
            const { currentDateTime } = res.data
            now = new Date(currentDateTime)
        },
    ).catch(
        err => {
            now = new Date()
        }
    )
    updateHora()
}

function format(number) {
    const formatter = new Intl.NumberFormat('pt-BR', { minimumIntegerDigits: 2 })
    return formatter.format(number)
}

function template(time) {
    if(time.getSeconds()%2 == 0) {
        return `${format(time.getHours())}:${format(time.getMinutes())}`
    } else {
        return `${format(time.getHours())} ${format(time.getMinutes())}`
    }
}

function updateHora() {
    now.setSeconds( now.getSeconds()+1 )

    document.getElementById('horario').innerText = template(now);

    setTimeout( updateHora, 1000 )
}
    
main()