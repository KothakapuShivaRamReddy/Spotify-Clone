        const audios=document.querySelectorAll("#audio");
        const buttons=document.querySelectorAll("#playbtn");
        const player=document.querySelector(".songplay");
        const progress=document.querySelector(".progress-bar");
        const startTimeSpan = document.querySelector(".start-time");
        const totalTimeSpan = document.querySelector(".tot-time");
        let isplaying=false;
    // btn.forEach((b,index)=>{ 
    //     b.addEventListener("click", () => {
    //         if(isplaying){
    //             audio.forEach((a)=>{ a.pause();});
    //             b.textContent = "▶";
    //         }else{
    //             audio.forEach((a)=>{ a.play();});
    //              b.textContent = "⏸";
    //         } isplaying=!isplaying;
    //         // if (b.textContent === "▶") {
    //         //     b.textContent = "⏸";
    //         // } else {
    //         //     b.textContent = "▶";
    //         }); 
    //     });
       
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
                // currentAudio.addEventListener("loadedmetadata",()=>{
                //     progress.max=Math.floor(currentAudio.duration);
                //     totalTimeSpan.textContent = formatTime(currentAudio.duration);
                // });
                // currentAudio.addEventListener("timeupdate",()=>{
                //     progress.value=Math.floor(currentAudio.currentTime);
                //     startTimeSpan.textContent = formatTime(currentAudio.currentTime);
                // });currentAudio.addEventListener("loadmetadata",()=>{
                    currentAudio.addEventListener("loadedmetadata",()=>{
                        progress.max=Math.floor(currentAudio.duration);
                        totalTimeSpan.textContent = formatTime(currentAudio.duration);
                    });
                    currentAudio.addEventListener("timeupdate",()=>{
                        progress.value=Math.floor(currentAudio.currentTime);
                        startTimeSpan.textContent = formatTime(currentAudio.currentTime);
                    });
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
    
    
// module.exports=app;
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
