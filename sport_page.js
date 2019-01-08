var sporttb, recordtb, record_info, record_n;
var Name, Weight, calorie = [], n;
var time = [], flag = [], consume_cal; // 單位:分鐘
var today = new Date();
var store, sum = 0;
var all=[], all_n=[];
function start(){
  Name = localStorage.getItem("now");
  Weight = localStorage.getItem(Name + "-weight");
  sporttb = document.getElementById("sport");
  recordtb = document.getElementById("record");
  store = Name + "-s-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate();
  for(var i = 0; i <29; i++) {
    time[i] = 30; flag[i] = true;
  }
  $.getJSON("https://api.myjson.com/bins/w5mnk", function(result){
    var i = 0;
    $.each( result, function( key, val ) {
        if(i%2 == 0) sporttb.innerHTML += "<tr><td>" + key + "</td></tr>";
        else sporttb.innerHTML += "<tr class = 'odd'><td>" + key + "</td></tr>";
        i++;
    });
    $("td").click(function(){
      var now = this.innerHTML;
      $.each( result, function( key, val ) {
        
        if(key == now) {
          n = val[0];
          calorie[n] = val[1];
        }
      });
      if(localStorage.getItem(store)==null) {
        record_info=""; record_n="";
      }
      else{
        record_info=localStorage.getItem(store);
        record_n=localStorage.getItem(store+"n");
      }
      consume_cal = Weight*calorie[n]*time[n]/60;
      recordtb.innerHTML+="<tr><td id ='name" + n + "'>" + this.innerHTML + "</td><td id = 'time" + n + "'>" + time[n] + "</td><td id ='consume"+n+ "'>" + consume_cal.toFixed(1) + "卡</td><td><input type = 'button' id ='btn"+n+"' onclick='advise(this)' value = '修改'><input type = 'button' id = 'delbtn"+n+"' onclick='del(this)' value = '刪除'></td></tr>";
      record_n+= n +" ";
      record_info += this.innerHTML+" "+time[n]+" "+calorie[n]+" ";
      localStorage.setItem(store, record_info);  
      localStorage.setItem(store+"n", record_n);
      sum += consume_cal;
      localStorage.setItem(Name+"-today_sport", sum);
      if(localStorage.getItem(store)) {
        all = localStorage.getItem(store).split(" ");
      all_n = localStorage.getItem(store+"n").split(" ");
      }
    });
  });
  if(localStorage.getItem(store)) {
    all = localStorage.getItem(store).split(" ");
  all_n = localStorage.getItem(store+"n").split(" ");
  }
  loadsearches();
}
var timetext, Newtime;
function advise(e){
  n = e.id.substring(3, e.id.length);
  if(flag[n]){
    timetext = document.getElementById("time"+n);
    timetext.innerHTML = "<input type = 'text' id = 'newtime'>";
    Newtime = document.getElementById("newtime");
    Newtime.value = time[n];
    flag[n] = false;
  }
  else{
    time[n] = Newtime.value;
    timetext.innerHTML = time[n];
    consume_cal = Weight*calorie[n]*time[n]/60;
    document.getElementById("consume"+n).innerHTML = consume_cal.toFixed(1);
    flag[n] = true;
    all[3*n] = document.getElementById("name"+n).innerHTML;
    all[3*n+1] = time[n];
    all_n[n] = n;
    loadsearches();
  }
}

function del(e){
  var del_n = e.id.substring(6, e.id.length);
  var r;
  for(var i = 0; i < all_n.length; i++){
    if(del_n == all_n[i]) {
      r = i;  break;
    }
  }
  for(var i =3*r, j=r ; i< all_n.length-2; i+=3, j++){
    all[i] = all[i+3];
    all[i+1] = all[i+4];
    all[i+2] = all[i+5];
    all_n[j] = all_n[j+1];
  }
  all[i]=""; all[i+1]=30; all[i+2]="";
  all_n[j]="";
  all_n.length -= 1; 
  loadsearches();
}

function loadsearches(){
  record_info=""; record_n="";
  for(var i=0, j=0; i<all.length-1; i+=3, j++){
    if(all[i]!=""){
      record_info += all[i]+" "+all[i+1]+" "+all[i+2]+" ";
      time[j] = all[i+1];
      calorie[j] = all[i+2];
      record_n += all_n[j] + " ";
    }
  }
  localStorage.setItem(store, record_info);  
  localStorage.setItem(store+"n", record_n);
  recordtb.innerHTML = "";
  sum = 0;
  for(var i = 0, j = 0; i < (all.length-1); i+=3, j++){
    consume_cal = Weight*calorie[j]*time[j]/60;
    if(all_n[j]!=undefined && all_n[j]!=""){
      recordtb.innerHTML+="<tr><td id = 'name"+all_n[j]+"'>" + all[i] + "</td><td id = 'time" + all_n[j] + "'>" + all[i+1] + "</td><td id ='consume"+all_n[j]+ "'>" + consume_cal.toFixed(1) + "卡</td><td><input type = 'button' id ='btn"+all_n[j]+"' onclick='advise(this)' value = '修改'><input type = 'button' id = 'delbtn"+all_n[j]+"' onclick='del(this)' value = '刪除'></td></tr>";
    }
    sum += consume_cal;
  }
  localStorage.setItem(Name+"-today_sport", sum);
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