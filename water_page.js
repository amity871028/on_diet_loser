var text;
var return_pagebtn;
var add_waterbtn;
var crtwater;
var crt;
var Name;
var fishbowl;
function start(){
    Name = localStorage.getItem("now");
    text = document.getElementById("text");
    crt = document.getElementById("crt_p");
    fishbowl = document.getElementById("fishbowl");
    loadsearches();
    crt.innerHTML = "(目前" + crtwater + "ml)";
    return_pagebtn = document.getElementById("returnpage");
    return_pagebtn.addEventListener("click", function(){ window.location.href = "main_interface.html" }, false);

    add_waterbtn = document.getElementById("add");
    add_waterbtn.addEventListener("click", add, false);
}

function loadsearches(){
    var flag = false;
    for(var i = 0; i< localStorage.length; i++){
        var find = localStorage.key(i);
        if(find == Name + "-crt_water"){
            crtwater = localStorage.getItem(find);
            flag = true;
            break;
        }
    }
    if(!flag) localStorage.setItem(Name + "-crt_water", "0");
    pic();
}

function add(){
    var howmuch;
    howmuch = document.getElementById("howmuch");
    if(!isNaN(howmuch.value) && howmuch.value != ""){
        crtwater = parseInt(crtwater) + parseInt(howmuch.value);
        localStorage.setItem(Name + "-crt_water", crtwater);
        
        var today = new Date();
        localStorage.setItem(Name+ "-wt-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate(), crtwater);

        howmuch.value = "";
        crt.innerHTML = "(目前" + crtwater + "ml)";
        
        pic();
    }
    else {
        alert("請輸入正確的數字格式！");
        howmuch.value = 300;
    }
}

function pic(){
    console.log(crtwater);
    if(crtwater==0) fishbowl.src = "picture\\fishbowl_halftransparent.png";
    if(crtwater<300 && crtwater>0) fishbowl.src = "picture\\fishbowl_halftransparent1.png";
    else if(crtwater<600 && crtwater>=300 ) fishbowl.src = "picture\\fishbowl_halftransparent2.png";
    else if(crtwater<900 && crtwater>=600) fishbowl.src = "picture\\fishbowl_halftransparent3.png";
    else if(crtwater<1100 && crtwater>=900) fishbowl.src = "picture\\fishbowl_halftransparent4.png";
    else if(crtwater<1400 && crtwater>=1100) fishbowl.src = "picture\\fishbowl_halftransparent6.png";
    else if(crtwater<1700 && crtwater>=1400) fishbowl.src = "picture\\fishbowl_halftransparent7.png";
    else if(crtwater<2000 && crtwater>=1700) fishbowl.src = "picture\\fishbowl_halftransparent8.png";
    else if(crtwater>=2000) fishbowl.src = "picture\\fishbowl_halftransparent9.png";
}

function refresh(){
    crtwater = 0;
    localStorage.setItem(Name + "-crt_water", 0);
    loadsearches();
    crt.innerHTML = "(目前" + crtwater + "ml)";
    pic();
}

window.addEventListener("load", start, false);