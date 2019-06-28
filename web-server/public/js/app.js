const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const messageOne = document.querySelector('#m1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."

    const location = weatherInput.value
    
    fetch(`http://localhost:3000/weather?location=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Today in ${data.location} it's ${data.summary} and the temperature is ${data.temp} C and ${Number(data.constProb)*100} % chance of rain.`
            }
        })
          
    })
    weatherInput.value = ""     
})