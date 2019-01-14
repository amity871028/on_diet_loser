var foodtb, recordtb, n;
var Name, Weight, unitname, g = [], calorie = [];
var unit = [], flag = [], sum_cal;
var today = new Date();
var all=[], all_n=[];
function start(){
  document.getElementById("preview_progressbarTW_img").src = "picture\\empty.png";
  Name = localStorage.getItem("now");
  Weight = localStorage.getItem(Name + "-weight");
  foodtb = document.getElementById("food");
  recordtb = document.getElementById("recordf");
  
  store = Name + "-f-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate();
  for(var i = 0; i <200; i++) flag[i] = true;
  $.getJSON("https://api.myjson.com/bins/u1ry0", function(result){
    $.each( result, function( key, val ) {
        if((val[0]-1)%2) foodtb.innerHTML += "<tr class = 'even'><td id = 'name" + parseInt(val[0]-1) + "'>" + key + "</td></tr>";
        else foodtb.innerHTML +=  "<tr class = 'odd'><td id = 'name" + parseInt(val[0]-1) + "'>" + key + "</td></tr>";
        unit[val[0]-1] = val[1];
        g[val[0]-1] = val[2];
        calorie[val[0]-1] = val[3];
    });
    $("[id^=name]").click(function(){
      n = this.id.substring(4, this.id.length);
      var obj = this;
      addprocess(obj);
    }); 
    loadsearches();
  });
  loadsearches();
}

function addprocess(e){
  var todo=true;
  for(var i=0; i<all.length; i+=4) {
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
      all[len*4] = e.innerHTML;
      all[len*4+1] = unit[n];
      all[len*4+2] = g[n];
      all[len*4+3] = calorie[n];
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

var Newunit;
function update(e){
    n = e.id.substring(3, e.id.length);
    if(flag[n]){
        document.getElementById("unit"+n).innerHTML = "<input type='text' id='newunit' autofocus>";
        flag[n] = false;
    }
    else{
        Newunit = document.getElementById("newunit").value; 
        document.getElementById("unit"+n).innerHTML = Newunit;
        var tmp;
        for(var i=0; i<all_n.length; i++){
            if(all_n[i]==n) {
                tmp = i;    break;
            }
        }
        all[4*i+1] = Newunit;
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
          storetext+=all[4*i]+" "+all[4*i+1]+" "+all[4*i+2]+" "+all[4*i+3];
          storen+=all_n[i];
      }
      else {
        storetext+=all[4*i]+" "+all[4*i+1]+" "+all[4*i+2]+" "+all[4*i+3]+" ";
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
    var new_g = all[4*i+2]*parseFloat(all[4*i+1]);
    var sum_cal = all[4*i+3]*parseFloat(all[4*i+1]);
    
    recordtb.innerHTML+="<tr><td>"+all[4*i]+"</td><td id = 'unit"+all_n[i]+"'>"+all[4*i+1] +"</td><td>"+new_g+"</td><td>"+sum_cal+"</td><td><input type='button' id='btn"+all_n[i]+"' onclick='update(this)' value='修改'><input type = 'button' id='del"+all_n[i]+"' onclick='remove(this)' value='刪除'><tr>";
    sum += parseFloat(sum_cal);
  }
  localStorage.setItem(Name + "-today_eat", sum);
  calculate();
}

function add(){
  var selfname, selfg, selfcal;
  selfname = prompt("請輸入食物名稱：");
  selfg = prompt("請輸入1份有幾克：");
  selfcal = prompt("請輸入1份幾大卡");
  if(selfname != "" && selfg != "" && selfcal != "" && selfname != null  && selfg != null && selfcal != null){
      if(isNaN(selfg) || isNaN(selfcal)) alert("請輸入正確格式！");
      else{
          for(var i = 185; i < 200; i++){
              if($("#unit"+i).length == 0) {
                  n = i;  break;
              }
              if(i==199) alert("抱歉自行新增只能給這麼多了！"); 
          }
          var tmp = document.createElement("td");
          tmp.innerHTML = "<tr><td id = 'name" + n + "'>" + selfname + "</td></tr>";
          unit[n] = "1份";
          g[n] = selfg;
          calorie[n] = selfcal;
          var obj = tmp;
          addprocess(obj);
      }
  }
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