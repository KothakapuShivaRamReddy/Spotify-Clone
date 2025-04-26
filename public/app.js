        const audios=document.querySelectorAll("#audio");
        const buttons=document.querySelectorAll("#playbtn");
        const player=document.querySelector(".songplay");
        const progress=document.querySelector(".progress-bar");
        const startTimeSpan = document.querySelector(".start-time");
        const totalTimeSpan = document.querySelector(".tot-time");
        const prev=document.querySelector(".preplay");
        const next=document.querySelector(".nextplay");
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
        startTimeSpan.textContent = formatTime(currentAudio.currentTime);
    });
    progress.addEventListener("input",()=>{
        currentAudio.currentTime=progress.value;
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
);