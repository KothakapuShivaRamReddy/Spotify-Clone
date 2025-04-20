        const audio=document.querySelectorAll("#audio");
        const btn=document.querySelectorAll("#playbtn");
        let isplaying=false;
    btn.forEach((b)=>{  b.textContent="▶";
        b.addEventListener("click", () => {
            if(isplaying){
                audio.forEach((a)=>{ a.pause();});
                b.textContent = "▶";
            }else{
                audio.forEach((a)=>{ a.play();});
                 b.textContent = "⏸";
            } isplaying=!isplaying;
            // if (b.textContent === "▶") {
            //     b.textContent = "⏸";
            // } else {
            //     b.textContent = "▶";
            }); 
        });
       

// module.exports=app;
