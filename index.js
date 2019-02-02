var wordInput = document.getElementById("word-input");

function getCharacterCount() {
    var characterCount = document.getElementById("character-count");
    if (wordInput.value.length > 0) {
        characterCount.innerHTML = wordInput.value.trim().split("").length
    } else {
        characterCount.innerHTML = 0
    }
}

function getWordCount() {
    var wordCount = document.getElementById("word-count");
    if (wordInput.value.length > 0) {
        wordCount.innerHTML = wordInput.value.trim().split(" ").length
    } else {
        wordCount.innerHTML = 0
    }
}

function getSentenceCount() {
    var sentenceCount = document.getElementById("sentence-count");
    var wordArray = wordInput.value.split(" ");
    var punctuation = [".", "!", "?"];
    var sentenceArray = wordArray.filter(x => punctuation.includes(x[x.length-1]));
    if (wordInput.value.length > 0) {
        sentenceCount.innerHTML = sentenceArray.length
    } else {
        sentenceCount.innerHTML = 0
    }
}

function getMostUsedWord() {
    var mostUsedWord = document.getElementById("most-used-word");
    var wordArray = wordInput.value.split(" ");
    var initialCount = 1;
    var count = 0;
    for (var i=0; i<wordArray.length; i++)
    {
        for (var j=i; j<wordArray.length; j++)
        {
            if (wordArray[i] == wordArray[j]) {
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
    } else {
        mostUsedWord.innerHTML = ""
    }
}

document.getElementById("word-input").onkeyup =  function() {
    getCharacterCount();
    getWordCount();
    getSentenceCount();
    getMostUsedWord();
}

getCharacterCount();
getWordCount();
getSentenceCount();
getMostUsedWord();