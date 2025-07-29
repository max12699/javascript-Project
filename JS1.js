const input = document.querySelector(".input-field");
const typingtext = document.querySelector(".typingtext p");
const timeLeft = document.querySelector(".time span");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const CPM = document.querySelector(".CPM span");
const button = document.querySelector(".button");

let timer;
let maxtime = 60;
let time = maxtime;
let charindex = 0;
let mistake = 0;
let istyping = false;

function loadParagraph() {
  const paragraphs = [
    "Avoid daydreaming about the years to come.",
    "You are the most important person in your whole life.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Only demonstrate your strength when it’s really required.",
    "Subscribe to Drop X Out"
  ];

  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  typingtext.innerHTML = '';

  for (const char of paragraphs[randomIndex]) {
    typingtext.innerHTML += `<span>${char}</span>`;
  }

 const spans = typingtext.querySelectorAll('span')[0];
  if (spans.length > 0) {
    spans[0].classList.add('active', 'text-orange-500');
  }

  document.addEventListener('keydown',()=> input.focus())
  typingtext.addEventListener("click",()=> {
    input.focus()
  })
}
function startTimer() {
  if (time > 0) {
    time--;
    timeLeft.innerText = time;

    // WPM Calculation
    const elapsedTime = maxtime - time; // in seconds
    const wordsTyped = (charindex - mistake) / 5;
    const wpmval = Math.round(wordsTyped / (elapsedTime / 60));

    wpm.innerText = (wpmval > 0 && isFinite(wpmval)) ? wpmval : 0;
  } else {
    clearInterval(timer);
  }


}

function initTyping() {
  const chars = typingtext.querySelectorAll('span');
  const typedChar = input.value.charAt(charindex);

  if (charindex < chars.length )
 {
    if(!istyping){
        timer = setInterval(startTimer,1000)
        istyping = true 
    }

    if(typedChar === "")return

    if ( typedChar===chars[charindex].innerText) {
      chars[charindex].classList.add('correct');
      
    } else {
      chars[charindex].classList.add('incorrect');
      mistake++;
      mistakes.innerText = mistake;
    }
    chars[charindex].classList.remove("active")
    charindex++;

    if(charindex < chars.length){
        chars[charindex].classList.add("active")
    }

    CPM.innerText = charindex-mistake
  }
  else{
    clearInterval(timer)
    input.value=""
  }
}

function reset() {
  loadParagraph();
  clearInterval(timer);

  time = maxtime;
  charindex = 0;
  mistake = 0;
  istyping = false;

  input.value = "";

  // ✅ Reset UI
  timeLeft.innerText = time;
  mistakes.innerText = mistake;
  wpm.innerText = 0;
  CPM.innerText = 0;
}



input.addEventListener("input",initTyping)
button.addEventListener("click",reset)
loadParagraph();
