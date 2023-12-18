//for new quoteseverytome
const quoteApiUrl = "https://api.quotable.io/random?minLength=100&maxLength=140";

const quoteSection=document.getElementById("quote");
const userInput =document.getElementById("quote-input");
let quote="";
let time=60;
let timer="";
let mistake=0;

//for this var a method that gets the quote
const renderNewQuote=async()=>{
    const response=await fetch(quoteApiUrl);
    let data=await response.json(); //data stored from the url 
    quote =data.content;
    
    let arr=quote.split("").map((value)=>{
        return "<span class='quote-chars'>" +value+"</span>";
    });

    quoteSection.innerHTML+=arr.join("");
}

//For comparison and red and green color
userInput.addEventListener("input",()=>{
    let quoteChars=document.querySelectorAll(".quote-chars");
    //array from span tags
    quoteChars=Array.from(quoteChars);
    //array of user chars
    let userInputChars=userInput.value.split("");
    
    quoteChars.forEach((char,index)=>{
        //ifchar(quote char)==userInputChars[index](input character)
        if(char.innerText==userInputChars[index]){
            char.classList.add("success");
        }
        //for nothing ->empty
        else if(userInputChars[index]==null){
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }
            else{
                char.classList.remove("fail");
            }
        }
        //wrong
        else{
            if(!char.classList.contains("fail")){
                mistake+=1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText=mistakes;
        }
        //if all correct
        let check=quoteChars.every((element)=>{
            return element.classList.contains("success");
        }); 
        if(check){
            displayResult();
        }
    });
});

//Updatig the time and for displaying results
function updateTimer(){
    if(time==0){
        displayResult();
    }else{
        document.getElementById("timer").innerHTML=--time+"s";
    }
}

//Timer Reduce
const timeReduce=()=>{
    time=60;
    timer=setInterval(updateTimer,1000);
};

//Results
const displayResult=()=>{
    document.querySelector(".result").style.display="block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display="none";
    userInput.disabled=true;
    let timeTaken=1;
    if(time!=0){
        timeTaken=(60-time)/100;
    }
    document.getElementById("wpm").innerHTML=(userInput.value.length/5/timeTaken).toFixed(2)+"wpm";
    document.getElementById("accuracy").innerText=Math.round(((userInput.value.length-mistake)/userInput.value.length)*100)+"%";

};

//Start Test
const startTest=()=>{
    mistakes=0;
    timer="";
    userInput.disabled=false;
    timeReduce()
    document.getElementById("start-test").style.display="none";
    document.getElementById("stop-test").style.display="block";
};

window.onload=()=>{
    userInput.value="";
    document.getElementById("start-test").style.display="block";
    document.getElementById("stop-test").style.display="none";
    userInput.disabled=true;  
    renderNewQuote();  
};
