const audio=document.getElementById("audio");
const playbtn=document.getElementById("playbtn");
let isplaying=false;
playbtn.addEventListener("click",()=>{
    if(isplaying){
        audio.pause();
        playbtn.textContent="hello";
    }else{
        audio.play();
        playbtn.textContent="⏸";
    }
    isplaying=!isplaying;
});


// module.exports=app;
