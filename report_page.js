
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
        data[i] = tmpv[i];
    }
}
function gd(year, month, day) {
    return new Date(year, month, day).getTime();
}

var data =[12, 19, 3, 5, 2, 3];
var Name;
        $(document).ready(function () {
            record();
            var ctx = document.getElementById("flot-placeholder").getContext('2d');
            //$.plot($("#flot-placeholder"), dataset, options);

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["", "", "", "", "", ""],
                    datasets: [{
                        label: '體重(kg)',
                        data: data,
                        backgroundColor: "lightseagreen",
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                },
            });
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
            });
        });
