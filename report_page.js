var m;
var tmp = [], tmpv = [];
function record(){
    var every_weight = [];
    var j = 0;
    for(var i = 0; i < localStorage.length; i++){
        var find = localStorage.key(i);
        var str = find.indexOf("-w-");
        if(find.match("-w-")) {
            var ymd = find.substring(str+3, find.length).split("/");
            //data[j][0] = gd(ymd[0], ymd[1]-1, ymd[2])-57900000;
            tmp[j] = ymd[2];
            tmpv[j] = localStorage.getItem(find);
            j++;
            if(j==7){

            }
        }
    }
    for(var i = 0; i<j; i++){
        for(var k = i+1; k< j; k++){
            if(parseInt(tmp[i])>parseInt(tmp[k])){
                var t = tmp[i];
                tmp[i] = tmp[k];
                tmp[k] = t;
                t = tmpv[i];
                tmpv[i] = tmpv[k];
                tmpv[k] = t;
            }
        }
    }
    for(var i = 0; i<7; i++){
        data[i][1] = tmpv[i];
        if(i>=j) data[i][1] = tmpv[j-1];
    }
}
function gd(year, month, day) {
    return new Date(year, month, day).getTime();
}

var data = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]];
        var dataset = [{label: "體重(kg)",data: data}];
 
        var options = {
            series: {
                lines: { show: true }
            },
            xaxis:  {
                mode: "time",
                tickSize:[1,"day"],
                max: 6
            },
            yaxis:  {
                min: 40
            }
        };
 
var Name;
        $(document).ready(function () {
            record();
            $.plot($("#flot-placeholder"), dataset, options);

            Name = localStorage.getItem("now");
            $("#weightbutton").click(function(){
                var Weight = document.getElementById("weight");
                if(!isNaN(Weight.value) && Weight.value != ""){
                
                var today = new Date();
                localStorage.setItem(Name + "-w-" + today.getFullYear() + "/" + parseInt(today.getMonth()+1) + "/" + today.getDate(), Weight.value);
                localStorage.setItem(Name + "-weight", Weight.value);
                Weight.value="";
                }
                else{
                    alert("請輸入正確的數字格式！");
                    Weight.value="";
                }
                record();
                $.plot($("#flot-placeholder"), dataset, options);
            });
        });
