        const audios=document.querySelectorAll("#audio");
        const buttons=document.querySelectorAll("#playbtn");
        const player=document.querySelector(".songplay");
        const progress=document.querySelector(".progress-bar");
        const startTimeSpan = document.querySelector(".start-time");
        const totalTimeSpan = document.querySelector(".tot-time");
        const prev=document.querySelector(".preplay");
        const next=document.querySelector(".nextplay");
        const volumebar=document.querySelector(".volume-bar");
        let isplaying=false;
       
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            // Pause other audios
            audios.forEach((audio, i) => {
                if (i !== index) {
                    audio.pause();
                    buttons[i].textContent = "▶";
                }

            });
          
            const currentAudio = audios[index];
            if (currentAudio.paused) {
                currentplayindex=index;
                currentAudio.currentTime=0;//all songs play from first

                currentAudio.play();
                btn.textContent = "⏸";
                player.src="./project/pause-button.png";
                
               timing(currentAudio,progress,totalTimeSpan,startTimeSpan);
            } else {
                currentAudio.pause();
                btn.textContent = "▶";
                player.src="./project/player_icon3.png";
            }
            // currentAudio.addEventListener("loadmetadata",()=>{
            //     progress.max=Math.floor(currentAudio.duration);
            //     totalTimeSpan.textContent = formatTime(currentAudio.duration);
            // });
            // currentAudio.addEventListener("timeupdate",()=>{
            //     progress.value=Math.floor(currentAudio.currentTime);
            //     startTimeSpan.textContent = formatTime(currentAudio.currentTime);
            // });
            
            
        });
    });
    
    //     player.addEventListener("click",()=>{
    //         audios.forEach((audio,i)=>{
    //             const currentAudio = audios[i];
    //          if(currentAudio.paused){    
    //         if(i===currentplayindex){
    //         const currentAudio = audios[currentplayindex];
    //         currentAudio.play();
    //         player.src="./project/pause-button.png";
    //         timing(currentAudio,progress,totalTimeSpan,startTimeSpan);      
    //         }else{
    //             currentAudio.play();
    //         player.src="./project/pause-button.png";
    //         timing(currentAudio,progress,totalTimeSpan,startTimeSpan);

    //         }}
    //         else{
    //             currentAudio.pause();
    //             player.src="./project/player_icon3.png";

    //         }
    // });
    // }
    // );

    
    player.addEventListener("click",()=>{
        const currentAudio = audios[currentplayindex];
        if(currentAudio.paused){
            
            
            currentAudio.play();
            player.src="./project/pause-button.png";
            timing(currentAudio,progress,totalTimeSpan,startTimeSpan);
            
        }
        else{
            currentAudio.pause();
            player.src="./project/player_icon3.png";
        }
    });
    
// module.exports=app;
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
function timing(currentAudio,progress,totalTimeSpan,startTimeSpan){
   if( currentAudio.readyState>=1){
    
        progress.max=Math.floor(currentAudio.duration);
        totalTimeSpan.textContent = formatTime(currentAudio.duration);
    }
  else{ currentAudio.addEventListener("loadedmetadata",()=>{
    progress.max=Math.floor(currentAudio.duration);
    totalTimeSpan.textContent = formatTime(currentAudio.duration);
});

}
    currentAudio.addEventListener("timeupdate",()=>{
        progress.value=Math.floor(currentAudio.currentTime);
        const value=(progress.value/progress.max) * 100;
        progress.style.background = `linear-gradient(to right, #1ED760 ${value}%, #ccc ${value}%)`;
        startTimeSpan.textContent = formatTime(currentAudio.currentTime);
    });
    progress.addEventListener("input",()=>{
        currentAudio.currentTime=progress.value;
        const value=(progress.value/progress.max) * 100;
        progress.style.background = `linear-gradient(to right, #1ED760 ${value}%, #ccc ${value}%)`;
    })
}
  next.addEventListener("click",()=>{
    audios[currentplayindex].pause();
    currentplayindex++;
    if(currentplayindex>=audios.length) {currentplayindex=0;}
    const currentAudio=audios[currentplayindex];
    currentAudio.currentTime=0;
    currentAudio.play();
    player.src="./project/pause-button.png";
    timing(currentAudio,progress,totalTimeSpan,startTimeSpan);
  }
);
prev.addEventListener("click",()=>{
    audios[currentplayindex].pause();
    currentplayindex--;
    if(currentplayindex<0) {currentplayindex=audios.length-1;}
    const currentAudio=audios[currentplayindex];
    currentAudio.currentTime=0;
    currentAudio.play();
    player.src="./project/pause-button.png";
    timing(currentAudio,progress,totalTimeSpan,startTimeSpan);
  }
);const audiovol=document.querySelector(".volume");
volumebar.addEventListener("input",()=>{
    const currentAudio=audios[currentplayindex];
    currentAudio.volume=volumebar.value/100;
    const value=currentAudio.volume;
});
audiovol.addEventListener("click",()=>{
    const currentAudio=audios[currentplayindex];
    if(currentAudio.volume==0){
        currentAudio.volume=0.5;
        volumebar.value=10;
        audiovol.classList.replace("fa-volume-xmark","fa-volume-high");
        // audiovol.innerHTML= <i class="fa-solid fa-volume-high control-item  volume"></i>
    }
    else{
        volumebar.value=0;
        currentAudio.volume=0;
        audiovol.classList.replace("fa-volume-high","fa-volume-xmark");//to place mute icon
        // audiovol.innerHTML=<i class="fa-solid fa-volume-xmark" style="color: #e20303;"></i>
    }
}
)