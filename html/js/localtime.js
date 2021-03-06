function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    
    var time = h + ":" + m + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    if((h >= 7) && session == "PM"){
        document.body.style.backgroundImage = "url('img/unnamed.png')";
        document.body.style.background = "repeat: no-repeat;";
        document.body.style.background = "size: 100% ";
    }
    setTimeout(showTime, 1000);
    
}

showTime();
