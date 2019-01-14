var sporttb, recordtb, n;
var Name, Weight, calorie = [];
var time = 30, flag = []; // 單位:分鐘
var today = new Date();
var all = [], all_n = [];
function start(){
  Name = localStorage.getItem("now");
  Weight = localStorage.getItem(Name + "-weight");
  sporttb = document.getElementById("sport");
  recordtb = document.getElementById("record");

  store = Name + "-s-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate();
  for(var i=0; i<40; i++) flag[i] = true;

 
  $.getJSON("https://api.myjson.com/bins/w5mnk", function(result){
    $.each( result, function( key, val ) {
        if(val[0]%2) sporttb.innerHTML += "<tr class = 'even'><td id = 'name" + val[0] + "'>" + key + "</td></tr>";
        else sporttb.innerHTML += "<tr class = 'odd'><td id = 'name" + val[0] + "'>" + key + "</td></tr>";
        calorie[val[0]] = val[1];
       
    });
    $("[id^=name]").click(function(){
        n = this.id.substring(4, this.id.length);
        var obj = this;
        addprocess(obj);
        
    }); 
    loadsearches();
  });
}

function addprocess(e){
    var todo=true;
    for(var i=0; i<all.length; i+=3) {
        if(e.innerHTML == all[i]) {
            todo=false;
            break;
        }
    }
    if(todo){
        if(localStorage.getItem(store)){
            all = localStorage.getItem(store).split(" ");
            all_n = localStorage.getItem(store+"n").split(" ");
        }
        var len = all_n.length;
        all[len*3] = e.innerHTML;
        all[len*3+1] = time;
        all[len*3+2] = calorie[n];
        all_n[len] = n;
        
        var storetext="", storen="";
        
        for(var i=0; i<all.length; i++) {
            if(i == all.length-1) storetext+=all[i];
            else storetext+=all[i]+" ";
        }
        for(var i=0; i<all_n.length; i++) {
            if(i == all_n.length-1) storen+=all_n[i];
            else storen+=all_n[i] + " ";
        }
        localStorage.setItem(store,storetext);
        localStorage.setItem(store+"n",storen);
        loadsearches();
    }
    else alert("已經新增過囉！");
}
var Newtime;
function update(e){
    n = e.id.substring(3, e.id.length);
    if(flag[n]){
        document.getElementById("time"+n).innerHTML = "<input type='text' id='newtime' autofocus>";
        flag[n] = false;
    }
    else{
        Newtime = document.getElementById("newtime").value; 
        document.getElementById("time"+n).innerHTML = Newtime;
        var tmp;
        for(var i=0; i<all_n.length; i++){
            if(all_n[i]==n) {
                tmp = i;    break;
            }
        }
        all[3*i+1] = Newtime;
        var storetext="";
        for(var i=0; i<all.length; i++) {
            if(i == all.length-1) storetext+=all[i];
            else storetext+=all[i]+" ";
        }
        localStorage.setItem(store,storetext);
        flag[n] = true;
        loadsearches();
    }
}

function remove(e){
    n = e.id.substring(3, e.id.length);
    var tmp;
    for(var i=0; i<all_n.length; i++){
        if(all_n[i]==n) {
            tmp = i;    break;
        }
    }
    var storetext="", storen="";
    if(tmp == all_n.length-1) all_n.length--;
    for(var i=0; i<all_n.length; i++) {
        if(i==tmp) continue;
        if(i == all_n.length-1) {
            storetext+=all[3*i]+" "+all[3*i+1]+" "+all[3*i+2];
            storen+=all_n[i];
        }
        else {
            storetext+=all[3*i]+" "+all[3*i+1]+" "+all[3*i+2]+" ";
            storen+=all_n[i]+" ";
        }
    }
    if(storen == "") {
        localStorage.removeItem(store+"n");
        localStorage.removeItem(store);
        all = [];
        all_n = [];
    }
    else{
        localStorage.setItem(store,storetext);
        localStorage.setItem(store+"n",storen);
    }
    loadsearches();
}

function loadsearches(){
    recordtb.innerHTML="";
    if(localStorage.getItem(store)){
        all = localStorage.getItem(store).split(" ");
        all_n = localStorage.getItem(store+"n").split(" ");
    }
    var sum = 0;
    for(i=0; i<all_n.length; i++){
      if(all_n[i]=="") break;
      var consume_cal = Weight*all[3*i+1]*all[3*i+2]/60;
      recordtb.innerHTML+="<tr><td>"+all[3*i]+"</td><td id = 'time"+all_n[i]+"'>"+all[3*i+1] +"</td><td>"+consume_cal.toFixed(1)+"</td><td><input type='button' id='btn"+all_n[i]+"' onclick='update(this)' value='修改'><input type = 'button' id='del"+all_n[i]+"' onclick='remove(this)' value='刪除'><tr>";
      sum += parseFloat(consume_cal);
    }
    localStorage.setItem(Name + "-today_sport", sum);
}

function add(){
    var selfname, selftime, selfconsume_cal;
    selfname = prompt("請輸入活動名稱：");
    selfconsume_cal = prompt("請輸入每30分鐘消耗卡路里：");
    if(selfname != "" && selfconsume_cal != "" && selfname != null  && selfconsume_cal != null){
        if(isNaN(selfconsume_cal)) alert("請輸入正確格式！");
        else{
            for(var i = 29; i < 40; i++){
                if($("#time"+i).length == 0) {
                    n = i;  break;
                }
                if(i==39) alert("抱歉自行新增只能給這麼多了！"); 
            }
            var tmp = document.createElement("td");
            tmp.innerHTML = "<tr><td id = 'name" + n + "'>" + selfname + "</td></tr>";
            calorie[n] = Number(selfconsume_cal*2/Weight).toFixed(1);
            var obj = tmp;
            addprocess(obj);
        }
    }
}

(function(document) {
    'use strict';
    // 建立 LightTableFilter
    var LightTableFilter = (function(Arr) {
      var _input;
      // 資料輸入事件處理函數
      function _onInputEvent(e) {
        _input = e.target;
        var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
        Arr.forEach.call(tables, function(table) {
          Arr.forEach.call(table.tBodies, function(tbody) {
            Arr.forEach.call(tbody.rows, _filter);
          });
        });
      }
      // 資料篩選函數，顯示包含關鍵字的列，其餘隱藏
      function _filter(row) {
        var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
        row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
      }
      return {
        // 初始化函數
        init: function() {
          var inputs = document.getElementsByClassName('light-table-filter');
          Arr.forEach.call(inputs, function(input) {
            input.oninput = _onInputEvent;
          });
        }
      };
    })(Array.prototype);
    // 網頁載入完成後，啟動 LightTableFilter
    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'complete') {
        LightTableFilter.init();
      }
    });
  })(document);
window.addEventListener("load", start, false);