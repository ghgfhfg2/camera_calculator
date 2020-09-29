function tab($list,$con){
    let list = document.querySelectorAll($list);
    let con = document.querySelectorAll($con);
    Array.prototype.forEach.call(list,function(e){
        e.addEventListener('click',function(){
            var idx = this.getAttribute('data-tab-num');
            for(var i=0;i<con.length; i++){
                con[i].style.display = "none";
            }
            con[idx].style.display = "block";
        })
    })
}
tab('.gnb li','.con_box');


let aperture = document.querySelector('.aperture');
let aperValue = aperture.value;
let aperArr = ['1.0','1.4','2.0','2.8','4.0','5.6','8','11','16','22','32'];
let aperValue_i = 4;
function ape_minus(){
    if(aperValue_i>0){
        aperValue_i--
        aperture.value = aperArr[aperValue_i];
    }
}
function ape_plus(){
    if(aperValue_i<10){
        aperValue_i++
        aperture.value = aperArr[aperValue_i];
    }
}


let iso = document.querySelector('.iso');
let isoValue = iso.value;
let isoStop = 1;
function iso_minus(){
    if(isoValue>100){
        isoValue = isoValue/2
        iso.value = isoValue
        isoStop++
    }
}
function iso_plus(){
    if(isoValue<204800){
        isoValue = isoValue*2
        iso.value = isoValue
        isoStop--
    }
}

let shutter = document.querySelector('.shutter');
let shutterValue = shutter.value;
let shutterArr = ['120','60','30','15','8','4','2','1','1/2','1/4','1/8','1/15','1/30','1/60','1/125','1/250','1/500','1/1000','1/2000','1/4000','1/8000'];
let shutterValue_i = 14;
function shutter_minus(){
    if(shutterValue_i>0){
        shutterValue_i--
        shutter.value = shutterArr[shutterValue_i];
    }
}
function shutter_plus(){
    if(shutterValue_i<20){
        shutterValue_i++
        shutter.value = shutterArr[shutterValue_i];
    }
}

let light = document.querySelector('.light');
let ex_shutter = document.querySelector('.ex_shutter');
let lightValue = light.value;
let lightStop = 14;
    ex_shutter.innerHTML = shutterArr[lightValue]
light.addEventListener('input',function(){
    lightValue = light.value;
    lightStop = document.querySelector('#lightVal').value = lightValue;
    ex_shutter.innerHTML = shutterArr[lightValue];
})


let nd = document.querySelector('.nd');
let ndValue = nd.value;
let ndArr = ['0','2','4','8','16','32','64','128','256','500','1000','2000','4000','8000','16000','32000','64000','128000','256000','512000','1000000'];
let ndValue_i = 0;
function nd_minus(){
    if(ndValue_i>0){
        ndValue_i--
        nd.value = ndArr[ndValue_i];
    }
}
function nd_plus(){
    if(ndValue_i<20){
        ndValue_i++
        nd.value = ndArr[ndValue_i];
    }
}


function basicSet(){
    let input = document.querySelectorAll('.resultSelect_box input');
    let dlBox = document.querySelectorAll('.basic_setting_input dl');
    for(let i=0; i< input.length; i++){
        let resultInput = input[i].value;
        input[i].addEventListener('input',function(){
            for(var j=0; j<dlBox.length; j++){
                dlBox[j].style.display = 'flex'
            }
            document.getElementById(resultInput).style.display = 'none';
        })        
    }    
}
basicSet();

let chkLeng = 0;
let resultTxt = document.querySelector('.result_txt')
function basicSetResult(){
    let resultSelect = document.getElementsByName('resultSelect');
    let resultTit = document.querySelector('.basic_con_box .result_box dt');    
    let selectVal
    let calcStop
    for(let i=0; i<resultSelect.length; i++){
        if (resultSelect[i].checked == true) {
            selectVal = resultSelect[i].nextElementSibling.textContent;
            chkLeng = 1;
        }
    }    
    if(chkLeng == 1){
    resultTit.innerHTML = selectVal;
    }
    if(selectVal == '조리개'){
        calcStop = lightStop - (shutterValue_i + isoStop + ndValue_i) + 5
        if(calcStop >= 0){
            resultTxt.innerHTML = "f "+aperArr[calcStop]
            if(calcStop > 10){
                resultTxt.innerHTML = "노출오버"
            }
        }
        else{
            resultTxt.innerHTML = "노출부족"
        }
    }
    if(selectVal == '셔터스피드'){
        calcStop = lightStop - (aperValue_i + isoStop + ndValue_i) + 5
        if(calcStop >= 0){
            resultTxt.innerHTML = shutterArr[calcStop] + "s"
            if(calcStop > 20){
                resultTxt.innerHTML = "노출오버"
            }
        }
        else{
            resultTxt.innerHTML = "노출부족"
        }
    }
    if(selectVal == '감도'){
        calcStop = lightStop - (shutterValue_i + aperValue_i + ndValue_i) + 5
        if(calcStop < 0){
            resultTxt.innerHTML = Math.pow(2,Math.abs(calcStop)+1)*100
            if(calcStop == -1){
                resultTxt.innerHTML = 400
            }
            if(calcStop < -11){
                resultTxt.innerHTML = "노출부족"
            }
        }     
        else if(calcStop == 1){
            resultTxt.innerHTML = 100
        }
        else if(calcStop == 0){
            resultTxt.innerHTML = 200
        }
        else{
            resultTxt.innerHTML = "노출오버"
        }
    }
    if(selectVal == 'nd필터'){
        calcStop = lightStop - (shutterValue_i + isoStop + aperValue_i) + 5
        if(calcStop >= 0){
            resultTxt.innerHTML = ndArr[calcStop]
            if(calcStop > 20){
                resultTxt.innerHTML = "노출오버"
            }
        }
        else{
            resultTxt.innerHTML = "노출부족"
        }
    }
    
}


let basicInput = document.querySelectorAll('.basic_con_box input');
let btn = document.querySelectorAll('.basic_setting_input button');
for(let i =0; i<basicInput.length; i++){
    basicInput[i].addEventListener('input',basicSetResult)
}
btn.forEach(btn => {
    btn.addEventListener('click', basicSetResult)
})


const timelabse = document.forms.timelabse;
let shots = timelabse.shots,
    interval = timelabse.interval,
    fps_num = timelabse.fps_num,
    fps_select = document.timelabse.fps_select,
    shotTime = document.getElementById('shotTime'),
    playTime = document.getElementById('playTime'),
    realTime = document.getElementById('realTime');

function fpsInput(){    
    let checked = document.querySelector('input[name="fps_select"]:checked');
    if(checked){
        let val = checked.value;
        fps_num.value = val;
    }
}

fps_select.forEach(function(){
    this.addEventListener('input',fpsInput)
});
fps_num.addEventListener('click',function(){
    let checked = document.querySelector('input[name="fps_select"]:checked');
    if(checked){
        checked.checked = false;
    this.value = ""
    }    
});

function result(){
    let shotsVal = shots.value,
        intervalVal = interval.value,
        fps_numVal = fps_num.value,
        seconds = shotsVal*intervalVal,
        hour = parseInt(seconds/3600),
        min = parseInt((seconds%3600)/60),
        sec = seconds%60,
        seconds2 = shotsVal/fps_numVal,
        hour2 = parseInt(seconds2/3600),
        min2 = parseInt((seconds2%3600)/60),
        sec2 = (seconds2%60).toFixed(1);
    shotTime.innerHTML = hour + "시간 " + min + "분 " +  sec + "초"
    if(fps_numVal != 0 && shotsVal != 0){
        playTime.innerHTML = hour2 + "시간 " + min2 + "분 " +  sec2 + "초"
    }

    let date = new Date;
    date.setSeconds(date.getSeconds() + seconds);
    let hourrPlus = date.getHours();
    let minPlus = date.getMinutes();
    let secPlus = date.getSeconds();
    const resulTime =  `${hourrPlus}시 ${minPlus}분 ${secPlus}초`;
    realTime.innerHTML = resulTime

} 





