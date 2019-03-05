const wordInput = document.getElementById("word-input");

//Returns character count by splitting the text into individual characters and returning the length
function getCharacterCount() {
    const characterCount = document.querySelector(".character-count-span");
    if (wordInput.value.length > 0) {
        characterCount.innerHTML = wordInput.value.trim().split("").filter(ch => ch.trim() != "").length;
    } else {
        characterCount.innerHTML = 0;
    };
};

//Returns word count by splitting the text according to space and returning the length
function getWordCount() {
    const wordCount = document.querySelector(".word-count-span");
    if (wordInput.value.length > 0) {
        wordCount.innerHTML = wordInput.value.trim().split(" ").length;
    } else {
        wordCount.innerHTML = 0;
    };
};

//Returns sentence count by splitting the text into words, filterning words that end with punctuation marks and returning the length
function getSentenceCount() {
    const sentenceCount = document.querySelector(".sentence-count-span");

    // we can split each sentence on punctuation and newline
    const wordArray = wordInput.value.split(/[.!?\n]/);

    if (wordInput.value.length > 0) {
        sentenceCount.innerHTML = wordArray.length-1;
    } else {
        sentenceCount.innerHTML = 0;
    };
};

//Returns most used word by splitting the text into words, getting the count of each word and returning the word that appears the most
function getMostUsedWord() {
    const mostUsedWord = document.querySelector(".most-used-word-span");
    let wordArray = wordInput.value.trim().split(/\s+/);
    let wordsMap = {};

    wordArray.map(word => {
      word = word.toLowerCase().replace(/[.!?]/g, "");
      if (wordsMap.hasOwnProperty(word)) {
        wordsMap[word]++;
      } else {
        wordsMap[word] = 1;
      }
    });

    word = Object.keys(wordsMap).reduce((a, b) => wordsMap[a] > wordsMap[b] ? a : b);
    if (word) {
        mostUsedWord.innerHTML = `${word} (${wordsMap[word]} times)`;
    } else {
        mostUsedWord.innerHTML = "";
    };
};

/* Okay this function is a bit tricky so bear with me.
It's meant to convert text to sentence case
So it registers a word after punctuation mark or at the beginning of a new line and sets the first character in uppercase.*/
function sentenceCase() {
    // Convert text to array of words
    var value = wordInput.value.trim().split(" ");
    console.log(value);
    var punctuation=[".","?","!"];
    //Convert all text to lowercase since that's how sentences are.
    var converted = value.map(x => x.toLowerCase());
    console.log(converted);
    //Okay so now we're going to loop through the array
    for (var i = 0; i < converted.length; i++) {
        //Get the word in the array
        var word = converted[i];
        console.log(word);
        //This if condition is for words that precede a new line. Say you have "Start hello\nworld\nbye", that's how it appears in the array
        if (word.match(/\n/g)) {
            //So we split the word at the new line => ["hello","world","bye"]
            word = word.split("\n");
            console.log(word);
            //Remember we don't want the word preceding the new line so we splice it => ["world","bye"]
            words = word.splice(1);
            console.log(words);
            console.log(word);
            //Then we map our function to convert all words after the new line to a capital letter and join them with new lines so they resemble the original => "World\nBye"
            var joinedWords = words.map(x => x.charAt(0).toUpperCase() + x.substr(1)).join('\n');
            console.log(joinedWords);
            //Okay, I wrote this code and even I know it's convoluted but basically at this point
            //We replace the words in the original word array with the converted words array and join it with the new line; => "hello\nWorld\nBye"
            word.push(joinedWords);
            word = word.join('\n');
            console.log(word);
            //AND THEN we replace the word in the converted array
            converted.splice(i,1,word);
            //Simple right. But oh no, we're not done.
        }
        //Okay so this sentence variable is basically the next word after the current word i.e. converted[i+1]
        var sentence = i < converted.length-1 ? converted[i+1] : "";
        //We use this if condition to target the first word at the beginning of the text and convert it to sentence case
        if (i==0) {
            word = word.charAt(0).toUpperCase() + word.substr(1);
            converted.splice(i,1,word)
        }
        //And then the simple function that I thought was the only thing we'd require. Lol.
        //If the current word contains any of the punctuations defined above, convert the next word to sentence case.
        if (punctuation.includes(word[word.length-1]) && sentence.length>0) {
            sentence = sentence.charAt(0).toUpperCase() + sentence.substr(1);
            converted.splice(i+1,1,sentence)
        }
    }
    wordInput.value = converted.join(" ");
};

//Function to convert text to title case by converting the first word of every letter to a capital letter
function titleCase() {
    var value = wordInput.value.trim().split(" ");
    var converted = value.map(x => x.charAt(0).toUpperCase() + x.substr(1).toLowerCase()).join(" ");
    wordInput.value = converted;
};

//Function to convert text to lower case by converting everything to lower case (not redundant at all actually)
function lowerCase() {
    var value = wordInput.value.split(" ");
    var converted = value.map(x => x.toLowerCase()).join(" ");
    wordInput.value = converted;
}

//Function to convert text to upper case by converting everything to upper case (very necessary comment, ey?)
function upperCase() {
    var value = wordInput.value.split(" ");
    var converted = value.map(x => x.toUpperCase()).join(" ");
    wordInput.value = converted;
};

document.getElementById("word-input").onkeypress = function() {
    wordInput.onkeyup = function(event) {
        // only run these functions if enter, ".", "!", "?", or backspace are pressed
        if (event.keyCode === 13 || event.keyCode === 190 || event.keyCode === 191 || event.keyCode === 49 || event.keyCode === 8) {
            getSentenceCount();
            getMostUsedWord();
        };

        // only run this function if spacebar or backspace is pressed
        if (event.keyCode === 32 || event.keyCode === 8) {
            getWordCount();
        };

        // this needs to run all the time
        getCharacterCount();
    }
}

document.getElementById("sentence-case").onclick = function() {
    sentenceCase();
}

document.getElementById("title-case").onclick = function() {
    titleCase();
}

document.getElementById("lower-case").onclick = function() {
    lowerCase();
}

document.getElementById("upper-case").onclick = function() {
    upperCase();
}