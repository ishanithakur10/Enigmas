
function createBurst(){
    let mainContainer=document.querySelector(".animation-container");
    let burst=document.querySelector(".burst");
    let lines=document.querySelectorAll(".line");

    burst.style.top=Math.random()*innerHeight+"px";
    burst.style.left=Math.random()*innerWidth+"px";

    lines.forEach((lineee)=>{
        const colors=["yellow","orange","lemon"];
        const randomColor=colors[Math.floor(Math.random()* colors.length)];
        lineee.style.background=randomColor;
    })

    let burstClone=burst.cloneNode(true);

    mainContainer.appendChild(burstClone);

    // setTimeout(()=>{
    //     burstClone.removeChild();
    // },100);
}

    setInterval(createBurst,500);
    



