var sporttb, recordtb, n;
var Name, Weight, calorie = [];
var time = 30, flag = [], consume_cal; // 單位:分鐘
var today = new Date();
function start(){
  Name = localStorage.getItem("now");
  Weight = localStorage.getItem(Name + "-weight");
  sporttb = document.getElementById("sport");
  recordtb = document.getElementById("record");

  store = Name + "-s-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate();
  for(var i=0; i<29; i++) flag[i] = true;
  $.getJSON("https://api.myjson.com/bins/w5mnk", function(result){
    
    $.each( result, function( key, val ) {
        if(val[0]%2) sporttb.innerHTML += "<tr><td id = 'name" + val[0] + "'>" + key + "</td></tr>";
        else sporttb.innerHTML += "<tr class = 'odd'><td id = 'name" + val[0] + "'>" + key + "</td></tr>";
        calorie[val[0]] = val[1];
        
    });
    $("[id^=name]").click(function(){
        n = this.id.substring(4, this.id.length);
        consume_cal = Weight*time*calorie[n];
        recordtb.innerHTML+="<tr><td>"+this.innerHTML+"</td><td id = 'time'"+n+">"+time +"</td><td>"+consume_cal+"</td><td><input type='button' id='btn"+n+"' onclick='advise(this)' value='修改'><input type = 'button' id='del"+n+"' onclick='remove(this)' value='刪除'><tr>";
    }); 
  });

}

function advise(e){
    n = e.id.substring(3, e.id.length);
    if(flag){
        document.getElementById("time"+ n)
    }
}

function remove(e){
    alert(e.id);
}
window.addEventListener("load", start, false);