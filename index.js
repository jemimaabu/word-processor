var wordInput = document.getElementById("word-input");

// global sentence counter
let sentenceCounter = 0;

function getCharacterCount() {
    var characterCount = document.querySelector(".character-count-span");
    if (wordInput.value.length > 0) {
        characterCount.innerHTML = wordInput.value.trim().split("").filter(ch => ch.trim() != "").length
    } 

    // we can remove this if we begin with 0 as the default in the html file
    else {
        characterCount.innerHTML = 0
    }
}

function getWordCount() {
    var wordCount = document.querySelector(".word-count-span");
    if (wordInput.value.length > 0) {
        wordCount.innerHTML = wordInput.value.trim().split(" ").length
    } 
    
    // we can remove this if we begin with 0 as the default in the html file
    else {
        wordCount.innerHTML = 0
    }
}

function getSentenceCount() {
    let sentenceCountSpan = document.querySelector(".sentence-count-span");
    // we can calculate the sentences by adding 1 to the global counter each time this is run
    sentenceCountSpan.innerHTML = ++sentenceCounter;
}

let wordHash = {};

function getMostUsedWord() {
    var mostUsedWord = document.querySelector(".most-used-word-span");
    var wordArray = wordInput.value.split(" ");
    var initialCount = 1;
    var count = 0;
    for (var i=0; i<wordArray.length; i++)
    {
        for (var j=i; j<wordArray.length; j++)
        {
            // this will catch duplicate words that fall at the end of a sentence
            if (wordArray[i].replace(/[.!?]/g, "").toLowerCase() == wordArray[j].replace(/[.!?]/g, "").toLowerCase()) {
                count++;
                if (initialCount<count){
                    initialCount = count; 
                    var word = wordArray[i];
                }
            }
        }
        count=0;
    }
    if (word) {
        mostUsedWord.innerHTML = `${word} (${initialCount} times)`
    } 
    
    // we can remove this if we begin with 0 as the default in the html file
    else {
        mostUsedWord.innerHTML = ""
    }
}

document.getElementById("word-input").onkeyup = function(event) {

    // only run these functions if ".", "!", or "?" are pressed
    if (event.keyCode === 190 || event.keyCode === 191 || event.keyCode === 49) {
        getSentenceCount();
        getMostUsedWord();
    }

    // only run this function if spacebar is pressed
    if (event.keyCode === 32) {
        getWordCount();
    }

    // this needs to run all the time
    getCharacterCount();
}
