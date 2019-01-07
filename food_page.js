var foodtb, recordtbf, record_info, record_n;
var Name, Weight, unitname, g = [], calorie = [], n;
var unit = [], flag = [], sum_cal;
var today = new Date();
var store, sum = 0;
var all=[], all_n=[];
function start(){
  document.getElementById("preview_progressbarTW_img").src = "picture\\empty.png";
  Name = localStorage.getItem("now");
  Weight = localStorage.getItem(Name + "-weight");
  foodtb = document.getElementById("food");
  recordtbf = document.getElementById("recordf");
  store = Name + "-f-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate();
  //loadsearches();
  for(var i = 0; i <185; i++) {
    flag[i] = true;
  }
  $.getJSON("https://api.myjson.com/bins/u1ry0", function(result){
    var i = 0;
    $.each( result, function( key, val ) {
        if(i%2 == 0) foodtb.innerHTML += "<tr><td>" + key + "</td></tr>";
        else foodtb.innerHTML += "<tr class = 'odd'><td>" + key + "</td></tr>";
        i++;
    });
    $("td").click(function(){
      var now = this.innerHTML;
      $.each( result, function( key, val ) {
        
        if(key == now) {
          n = val[0];
          unitname = val[1];
          unit[n] = (parseInt(val[1]));
          if(isNaN(unit[n])) unit[n] = 1;
          g[n] = val[2];
          calorie[n] = val[3];
        }
    });
    if(localStorage.getItem(store)==null) {
      record_info=""; record_n="";
    }
    else{
      record_info=localStorage.getItem(store);
      record_n=localStorage.getItem(store+"n");
    }
    sum_cal = unit[n]*calorie[n];
    if(g[n] == "") recordtbf.innerHTML+="<tr><td id ='name" + n + "'>" + this.innerHTML + "</td><td id = 'unit" + n + "'>" + unitname + "</td><td id ='g"+n+ "' style='text-align: center'>" + "/" + "</td><td id ='calorie"+n+ "'>" + sum_cal + "卡</td><td><input type = 'button' id ='btn"+n+"' onclick='advise(this)' value = '修改'><input type = 'button' id = 'delbtn"+n+"' onclick='del(this)' value = '刪除'></td></tr>";
    else recordtbf.innerHTML+="<tr><td id ='name" + n + "'>" + this.innerHTML + "</td><td id = 'unit" + n + "'>" + unitname + "</td><td id ='g"+n+ "'>" + g[n] + "</td><td id ='calorie"+n+ "'>" + sum_cal + "卡</td><td><input type = 'button' id ='btn"+n+"' onclick='advise(this)' value = '修改'><input type = 'button' id = 'delbtn"+n+"' onclick='del(this)' value = '刪除'></td></tr>";
    record_n+= n +" ";
    record_info += this.innerHTML+" "+unit[n]+" "+g[n]+" "+calorie[n]+" ";
    localStorage.setItem(store, record_info);  
    localStorage.setItem(store+"n", record_n);
    sum+=sum_cal;
    localStorage.setItem(Name+"-today_eat", sum);
    calculate();
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
  calculate();
}
var unittext, gtext, Newunit;
function advise(e){
  n = e.id.substring(3, e.id.length);
  if(flag[n]){
    unittext = document.getElementById("unit"+n);
    gtext = document.getElementById("g"+n);
    unittext.innerHTML = "<input type = 'text' id = 'newunit'>";
    Newunit = document.getElementById("newunit");
    Newunit.value = unit[n];
    flag[n] = false;
  }
  else{
    unit[n] = Newunit.value ;
    unittext.innerHTML = unit[n];
    var a_g = unit[n]*g[n];
    sum_cal = unit[n]*calorie[n];
    document.getElementById("g"+n).innerHTML = a_g;
    document.getElementById("calorie"+n).innerHTML = sum_cal.toFixed(1);
    flag[n] = true;
    all[4*(n-1)] = document.getElementById("name"+n).innerHTML;
    all[4*(n-1)+1] = unit[n];
    all[4*(n-1)+2] = g[n];
    all[4*(n-1)+3] = calorie[n];
    all_n[n-1] = n;
    loadsearches();  
    calculate();
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
  for(var i =4*r, j=r ; i< all_n.length-2; i+=4, j++){
    all[i] = all[i+4];
    all[i+1] = all[i+5];
    all[i+2] = all[i+6];
    all[i+3] = all[i+7];
    all_n[j] = all_n[j+1];
  }
  all[i]=""; all[i+1]=""; all[i+2]=""; all[i+3]="";
  all_n[j]="";
  all_n.length -= 1; 
  loadsearches();
}

function loadsearches(){  
  record_info=""; record_n="";
  for(var i=0, j=0; i<all.length-1; i+=4, j++){
    if(all[i]!=""){
      record_info += all[i]+" "+all[i+1]+" "+all[i+2]+" "+all[i+3]+" ";
      unit[j] = all[i+1];
      g[j] = all[i+2];
      calorie[j] = all[i+3];
      record_n += all_n[j] + " ";
    }
  }
  localStorage.setItem(store, record_info);  
  localStorage.setItem(store+"n", record_n);
  recordtbf.innerHTML = "";

  sum = 0;
  for(var i = 0, j = 0; i < (all.length-1); i+=4, j++){
    var a_g = unit[j]*g[j];
    sum_cal = unit[j]*calorie[j];
    if(all_n[j]!=undefined && all_n[j]!=""){
      recordtbf.innerHTML+="<tr><td id = 'name"+all_n[j]+"'>" + all[i] + "</td><td id = 'unit" + all_n[j] + "'>" + all[i+1] + "</td><td id ='g"+all_n[j]+ "'>" + a_g + "</td><td id = 'calorie"+all_n[j]+"'>"+ sum_cal +"卡</td><td><input type = 'button' id ='btn"+all_n[j]+"' onclick='advise(this)' value = '修改'><input type = 'button' id = 'delbtn"+all_n[j]+"' onclick='del(this)' value = '刪除'></td></tr>";
    }
    sum += sum_cal;
  }
  localStorage.setItem(Name+"-today_eat", sum);
  calculate();
}

function calculate(){
  var Height = localStorage.getItem(Name + "-height");
  var ideal = Height*Height*22/10000;
  var sugest = ideal*30;
  var dif = localStorage.getItem(Name+"-today_eat") - localStorage.getItem(Name+"-today_sport");
  var photo = document.getElementById("shape");
  if(dif<sugest) photo.src = "picture/shape1.png";
  else if(dif>=sugest && dif<sugest+300) photo.src = "picture/shape2.png";
  else if(dif>=sugest+300 && dif<sugest+600) photo.src = "picture/shape3.png";
  else if(dif>sugest+600) photo.src = "picture/shape4.png";
  console.log(dif);
  console.log(sugest);
}

function readURL(input){
  if(input.files && input.files[0]){
    var imageTagID = input.getAttribute("targetID");
    var reader = new FileReader();
    reader.onload = function (e) {
       var img = document.getElementById(imageTagID);
       img.setAttribute("src", e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
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