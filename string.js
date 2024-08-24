const txtInput = document.querySelector(".inputs input"),
checkBtn = document.querySelector(".inputs button"),
infoTxt =document.querySelector(".info-txt");
let filterInput;

checkBtn.addEventListener("click", () => {
    // split the user input characters and reversing them
    // joining them in a single word
    // let reverseInput = filterInput.split("").reverseInput().join(""); is not working for me. I've checked through google and youtube to see how I can fix it, and I even had some web developer friends look at it and they say that it's being called correctly. unsure how to fix this...
    // what it should be doing is= Word > W o r d > d r o W > droW
    // it should also take words that are separated by a space and joining it together.
    let reverseInput = filterInput.split("").reverseInput().join("");
// if statement saying if the filter input is the same as the reverse input it either is or isn't a palindrome
infoTxt.style.display = "block";
    if (filterInput != reverseInput) {
    return infoTxt.innerHTML = `No, <span>'${txtInput.value}'</span> isn't a palindrome!`;
}
return infoTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is a palindrome!`;
});

txtInput.addEventListener("keyup", () => {
    // I removed all spaces and all special characters from entered value
    let filterInput = txtInput.value.toLowerCase().replace(/[^A-Z0-9]/ig, "");
    if(filterInput) { 
       return checkBtn.classList.add("active");
    }
    infoTxt.style.display = "none";
    checkBtn.classList.remove("active");
});