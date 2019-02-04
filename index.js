var wordInput = document.getElementById("word-input");

// global sentence counter
let sentenceCounter = 0;

function getCharacterCount() {
    var characterCount = document.querySelector(".character-count-span");
    if (wordInput.value.length > 0) {
        characterCount.innerHTML = wordInput.value.trim().split("").filter(ch => ch.trim() != "").length;
    } else {
        characterCount.innerHTML = 0;
    };
};

function getWordCount() {
    var wordCount = document.querySelector(".word-count-span");
    if (wordInput.value.length > 0) {
        wordCount.innerHTML = wordInput.value.trim().split(" ").length;
    } else {
        wordCount.innerHTML = 0;
    };
};

function getSentenceCount() {
    var sentenceCount = document.querySelector(".sentence-count-span");

    // we can split each sentence on punctuation and newline
    let wordArray = wordInput.value.split(/[.!?\n]/);
    
    if (wordInput.value.length > 0) {
        sentenceCount.innerHTML = wordArray.length-1;
    } else {
        sentenceCount.innerHTML = 0;
    };
};

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
                };
            };
        };
        count=0;
    };
    if (word) {
        mostUsedWord.innerHTML = `${word} (${initialCount} times)`;
    } else {
        mostUsedWord.innerHTML = "";
    };
}

document.getElementById("word-input").onkeyup = function(event) {

    // only run these functions if enter, ".", "!", "?", or backspace are pressed
    if (event.keyCode === 13 || event.keyCode === 190 || event.keyCode === 191 || event.keyCode === 49 || event.keyCode === 8) {
        getSentenceCount();
        getMostUsedWord();
    };

    // only run this function if spacebar or backspace is pressed
    if (event.keyCode === 32 || event.keyCode === 8) {
        getWordCount();
    }''

    // this needs to run all the time
    getCharacterCount();
}
