document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
      {
        name: 'crane',
        img: 'images/crane.png'
      },
      {
        name: 'parrot',
        img: 'images/parrot.png'
      },
      {
        name: 'crane',
        img: 'images/crane.png'
      },
      {
        name: 'parrot',
        img: 'images/parrot.png'
      }
    ];

    // Cards are randomly mixed and sorted
    cardArray.sort(() => 0.5 - Math.random())
    console.log(cardArray)

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenIDs = []
    let cardsWon = []

    function createBoard(){
        for (let i=0; i < cardArray.length; i++){
            const card = document.createElement('img')
            card.setAttribute('src','images/blank.jpg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }
    

    function flipCard(){
        let cardID = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardID].name)
        cardsChosenIDs.push(cardID)
        this.setAttribute('src',cardArray[cardID].img)
        if (cardsChosen.length ===2){
            setTimeout(checkForMatch, 500)
        }
        console.log(cardsChosenIDs)
    }

    function checkForMatch(){
        const cards = document.querySelectorAll('img')

        // Do DoubleClick on same Image. Switch to blank.jpg
        if(cardsChosenIDs[0] === cardsChosenIDs[1]){
            alert('Do not select the same Image!')
            cards[cardsChosenIDs[0]].setAttribute('src','images/blank.jpg') 
            cards[cardsChosenIDs[1]].setAttribute('src','images/blank.jpg') 
        } else if(cardsChosen[0] === cardsChosen[1]){
            //  alert('Match found')
            cards[cardsChosenIDs[0]].setAttribute('src','images/white.png') 
            cards[cardsChosenIDs[1]].setAttribute('src','images/white.png') 
            cards[cardsChosenIDs[0]].removeEventListener('clicks', flipCard)
            cards[cardsChosenIDs[1]].removeEventListener('clicks', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[cardsChosenIDs[0]].setAttribute('src','images/blank.png') 
            cards[cardsChosenIDs[1]].setAttribute('src','images/blank.png') 
        }
        cardsChosen = []
        cardsChosenIDs = []
        resultDisplay.textContent = cardsWon.length //textContent is the same as InnerHTML
        if(cardsWon.length == cardArray.length/2){
            resultDisplay.textContent = 'You Won'
        }

        console.log(cardsChosen)
        console.log(cardsWon)
        
    }

    createBoard()
    
    


}
)