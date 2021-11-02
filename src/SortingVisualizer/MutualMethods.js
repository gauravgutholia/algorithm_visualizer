function OpenThem(){
    const btns=document.getElementsByTagName('button');
            for(let i=0;i<btns.length;i++){
                btns[i].disabled=false;
            }
            document.getElementById('szSlider').disabled=false;
            document.getElementById('spSlider').disabled=false;
}

function BackToOriginalColor(){
    const allBars=document.getElementsByClassName('array-bars');
    setTimeout (()=>{
        for(let idx=0;idx < allBars.length;idx++){
        allBars[idx].style.backgroundColor="turquoise";
        }
    },1000);
}

function AlgoLineHighlighter(line){
    document.getElementById('line1').style.backgroundColor='transparent';
    document.getElementById('line2').style.backgroundColor='transparent';
    document.getElementById('line3').style.backgroundColor='transparent';
    document.getElementById('line4').style.backgroundColor='transparent';
    document.getElementById('line5').style.backgroundColor='transparent';
    document.getElementById('line6').style.backgroundColor='transparent';
    document.getElementById('line7').style.backgroundColor='transparent';
}

export {OpenThem,BackToOriginalColor,AlgoLineHighlighter};

