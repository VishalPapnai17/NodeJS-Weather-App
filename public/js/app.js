console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')


//grabbing the two paragraphs 
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

p1.textContent = ''
p2.textcontent = ''



//fetching results from api
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = 'http://localhost:3000/weather?address=' + searchElement.value
    fetch(address).then((response)=>{
    response.json().then((data)=>{
            if(searchElement.value==='')
            {
                p1.textContent = 'Location must be Provided'
                p2.textContent = ''
            }    
            else if(data.error){
                    p1.textContent = data.error
                    p2.textContent = ''
            }
            else{
                p1.textContent = data.location
                p2.textContent = data.forcast
            }
        })
    })
})

