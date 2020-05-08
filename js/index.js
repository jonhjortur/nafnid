const wordsBank = "#Hekla Sóley#";

$(document).ready(function() {
  const words = wordsBank.toUpperCase().split('#');

  let chooseOne = 0;
  let mysteryWord = [];
  let myWord = [];
  let strWord = '';
  let correctLetters = [];
  let wrongLetters = [];
  let wrongTryCounter = 0;

  // creating the keyboard
  for (let i = 65; i <= 90; i++){
    $('#keyboard').append(
      `<button id="${String.fromCharCode(i)}" class="btn btn-outline-secondary keyboard">${String.fromCharCode(i)}</button>`
      );

      if(i === 65) {$('#keyboard').append(
        `<button id="${'Á'}" class="btn btn-outline-secondary keyboard">${'Á'}</button>`
        );}

      if(i === 68) {$('#keyboard').append(
        `<button id="${'Ð'}" class="btn btn-outline-secondary keyboard">${'Ð'}</button>`
        );}

      if(i === 69) {$('#keyboard').append(
        `<button id="${'É'}" class="btn btn-outline-secondary keyboard">${'É'}</button>`
        );}

      if(i === 73) {$('#keyboard').append(
        `<button id="${'Í'}" class="btn btn-outline-secondary keyboard">${'Í'}</button>`
        );}

      if(i === 79) {$('#keyboard').append(
        `<button id="${'Ó'}" class="btn btn-outline-secondary keyboard">${'Ó'}</button>`
        );}

      if(i === 85) {$('#keyboard').append(
        `<button id="${'Ú'}" class="btn btn-outline-secondary keyboard">${'Ú'}</button>`
        );}

      if(i === 89) {$('#keyboard').append(
        `<button id="${'Ý'}" class="btn btn-outline-secondary keyboard">${'Ý'}</button>`
        );
        $('#keyboard').append(
          `<button id="${'Þ'}" class="btn btn-outline-secondary keyboard">${'Þ'}</button>`
          );
        $('#keyboard').append(
          `<button id="${'Æ'}" class="btn btn-outline-secondary keyboard">${'Æ'}</button>`
          );
        $('#keyboard').append(
          `<button id="${'Ö'}" class="btn btn-outline-secondary keyboard">${'Ö'}</button>`
          );
      }
        // console.log(String.fromCharCode(i))
  }

  newGame();

  function newGame() {
    chooseOne = 1;// Math.floor(Math.random() * words.length);
    mysteryWord = ['H','E','K','L','A','q','S','Ó','L','E','Y'];
    myWord = [];
    strWord = '';
    correctLetters = [];
    wrongLetters = [];
    wrongTryCounter = 0;

    // clean the keyboard
    for (let i = 65; i <= 90; i++){
      $(`#${String.fromCharCode(i)}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    }

    $(`#${'Á'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Ð'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'É'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Í'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Ó'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Ú'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Ý'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Þ'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Æ'}`).removeClass().addClass('btn btn-outline-secondary keyboard');
    $(`#${'Ö'}`).removeClass().addClass('btn btn-outline-secondary keyboard');

    // Hreinsa út alla aukastafina sem ég bæti við þegar borðið er smíðað.

    // creating Mistery Word
    buildMisteryWord();

    // Create the Gallows image
    $('img').attr('src', `img/g0.jpg`);

    // console.log(mysteryWord.join(''));
  }

  // creating the Hidden Word
  function buildMisteryWord() {
    strWord = '';
    myWord = [];
    for (let w = 0; w <= mysteryWord.length - 1; w++){
      if (correctLetters.includes(mysteryWord[w])) {
        myWord.push(mysteryWord[w]);
        
        strWord += `<span class="letter" id="${mysteryWord[w]}">${mysteryWord[w]}</span>`;
      } else {
        strWord += `<span class="letter">&nbsp;</span>`;
      }
    }
    // print the word below the keyboard
    $('#word').html(strWord);
    
    // test if the actual word is equal to mistery word. If yes, call gameOver function
    if (myWord.length === mysteryWord.length) {
      for (let i = 0; i < myWord.length; i++) {
        if (myWord[i] != mysteryWord[i]) {
          return false;
        }
      }
      gameOver('WON');
    }
  }
  guess('q')
  // listen to the click buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', event => {
      const {currentTarget} = event;
      let chosenLetter = currentTarget.getAttribute('id');
      guess(chosenLetter);
    })
  })
  
  // listen to the type keyboard
  // document.addEventListener('keypress', event => {
  //   const {key, keyCode} = event;
  //   let chosenLetter = key.toUpperCase();
  //   // only letters
  //   if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122 || key === 'Ó')) {
  //     guess(chosenLetter);
  //   }
  // })
  
  function guess(chosenLetter) {
    if (mysteryWord.includes(chosenLetter)) {
      if (!correctLetters.includes(chosenLetter)) {
        if(chosenLetter === 'S') {
        correctLetters.push('q');
        }
        correctLetters.push(chosenLetter);
        $(`#${chosenLetter}`).addClass('btn-success disabled').removeClass('btn-outline-secondary');
      }
    } else {
      if (!wrongLetters.includes(chosenLetter)) {
        wrongLetters.push(chosenLetter);
        $(`#${chosenLetter}`).addClass('btn-danger disabled').removeClass('btn-outline-secondary');
        wrongTryCounter += 2;
        if (wrongTryCounter === 6) {
          gameOver('LOST');
          console.log(mysteryWord)
          console.log(myWord)
        }
      }
      $('img').attr('src', `img/g${wrongTryCounter}.jpg`);
    }
    buildMisteryWord();
  }

  function gameOver(value) {
    if (value === 'WON') {
      setTimeout(() => {
        alert('RÉTT! Hún heitir Hekla Sóley Jónsdóttir');
        // location.reload();
        newGame();
  		}, 100);
    } else {
      setTimeout(() => {
        alert('Úps! Reyndu aftur.');
        // location.reload();
        newGame();
  		}, 100);
    }
  }

})
