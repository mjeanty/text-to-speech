const main = document.querySelector('main')
const textarea = document.getElementById('text')
const voicesSelect = document.getElementById('voices')
const readBtn= document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')


const data =[
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
      },
      {
        image: './img/food.jpg',
        text: "I'm Hungry"
      },
      {
        image: './img/tired.jpg',
        text: "I'm Tired"
      },
      {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
      },
      {
        image: './img/happy.jpg',
        text: "I'm Happy"
      },
      {
        image: './img/angry.jpg',
        text: "I'm Angry"
      },
      {
        image: './img/sad.jpg',
        text: "I'm Sad"
      },
      {
        image: './img/scared.jpg',
        text: "I'm Scared"
      },
      {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
      },
      {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
      },
      {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
      },
      {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
      }

]

data.forEach(createBox)

// create speech boxes
function createBox(item) {
    const box = document.createElement('div')

    const {image, text} = item

    box.classList.add('box')
    box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info">${text}</p>
    `;
    //speakevent
    box.addEventListener('click', () => {
      setTextMessage(text)
      speakText()

      //active effect
      box.classList.add('active')
      setTimeout(()=> box.classList.remove('active'), 800)


    })




    main.appendChild(box)

}
//initialize speech synth
const message = new SpeechSynthesisUtterance()

//store voices array
let voices=[]

function getVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option')
        option.value = voice.name
        option.innerText =`
            ${voice.name} ${voice.lang}
        `
        voicesSelect.appendChild(option)
    })
}
//settext
function setTextMessage(text) {
  message.text = text
}

//speaking text
function speakText(){
  speechSynthesis.speak(message)
}


//set voice
function setVoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value)
}


//changed voice
speechSynthesis.addEventListener('voiceschanged', getVoices)


// toggle box 
toggleBtn.addEventListener('click', () => 
document.getElementById('text-box').classList.toggle('show'))

// close button 
closeBtn.addEventListener('click', () => 
document.getElementById('text-box').classList.remove('show'))



//chnnge voise
voicesSelect.addEventListener('change', setVoice)

//read text button
readBtn.addEventListener('click', ()=> {
  setTextMessage(textarea.value)
  speakText()
})

getVoices()