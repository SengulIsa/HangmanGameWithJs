const word_el= document.getElementById('word');
const popup=document.getElementById('popup-container');
const message_el=document.getElementById('success-message');
const wrongLetters_el=document.getElementById('wrong-letters');
const items=document.querySelectorAll('.item');
const message_elmnt=document.getElementById('message');
const playAgainBtn=document.getElementById('play-again');

const correctLetters= [];
const wrongLetters=[];
let selectedword= getRandomWord();

function getRandomWord(){
    const words=["javascrıpt","java","python","html","css","ruby","kotlın","swıft"];

    return words[Math.floor(Math.random()*words.length)];
}


function displayWord(){
    

     word_el.innerHTML=`
     ${selectedword.split('').map(letter =>`
     
     <div class="letter">
        ${correctLetters.includes(letter) ? letter: ''}
     </div>
     
     
     `).join('')}
     `;
        const w= word_el.innerText.replace(/\n/g,'');
        if(w===selectedword){
            popup.style.display='flex';
            message_el.innerText='Congratulations You winn';
        }
}

function updateWrongLetters(){
    wrongLetters_el.innerHTML=`
    ${wrongLetters.length>0?'<h3>Wrong Letters</h3>' :''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}

    `;
    items.forEach((item,index) =>{
       const errorCount=wrongLetters.length;
       if(index<errorCount){
        item.style.display='block';
       } 
       else{
        item.style.display='none';
       }
    })
    if(wrongLetters.length===items.length){
        popup.style.display='flex';
        message_el.innerText='Unfortunately you lost the game...';

    }
}

function displayMessage(){
    message_elmnt.classList.add('show'); 
    setTimeout(function(){
        message_elmnt.classList.remove('show');
    },2000);
}

playAgainBtn.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedword=getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display='none';

});
 window.addEventListener('keydown',function(e){
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter=e.key;
        if(selectedword.includes(letter)){
            if(!correctLetters.includes(letter)){
                    correctLetters.push(letter);
                    displayWord();
                }
                else{
                    displayMessage();
                 
                }
        }
         else
         {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else{
                displayMessage();
            }
        }
    }
 });

displayWord();