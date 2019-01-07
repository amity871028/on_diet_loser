var submitbtn;
var Name, boy, girl, other, Birth, Height, Weight, Target;

function start(){
    submitbtn = document.getElementById("submit");
    submitbtn.addEventListener("click", add, false);
}

function add(){
    Name = document.getElementById("Name");
    s = document.getElementsByName("sex");
    var sex; 
    for(var i in s){
        if(s[i].checked == true) Sex = s[i];  
    }
    Birth = document.getElementById("birth");
    Height = document.getElementById("height");
    Weight = document.getElementById("weight");
    Target = document.getElementById("target");

    var flag = false;
    if(Name.value== ""|| birth.value == "" || height.value == "" || weight.value == "" || Target.value=="") alert("請填選欄位!");
    else{
        for(var i = 0; i < localStorage.length; i++){
            if(localStorage.key(i) == Name.value + "-name") {
                flag = true;
                alert("已註冊過囉！");
                var ans = prompt("要用" + Name.value + "登入嗎？(是/否)", "是");
                if(ans == "是") {
                    localStorage.setItem("now", Name.value);
                    window.location.href = "main_interface.html";
                }
                else window.location.reload();
            }
        }
        if(!flag){
            var today = new Date();
            localStorage.setItem(Name.value + "-name", Name.value);
            localStorage.setItem(Name.value + "-sex", Sex.id);
            localStorage.setItem(Name.value + "-birth", Birth.value);
            localStorage.setItem(Name.value + "-height", Height.value);
            localStorage.setItem(Name.value + "-weight", Weight.value);
           
            localStorage.setItem(Name.value + "-w-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate(), Weight.value);
            localStorage.setItem(Name.value + "-crt_water", "0");
            localStorage.setItem(Name.value + "-target", Target.value);
            localStorage.setItem("now", Name.value);
            window.location.href = "main_interface.html";
        }
        
    }
    
}


window.addEventListener("load", start, false);