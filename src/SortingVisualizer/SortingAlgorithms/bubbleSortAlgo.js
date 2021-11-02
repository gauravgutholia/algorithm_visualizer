function bubbleSortInp(arr,speed){
    const animations=[];
    let showVals=false;
    if(arr.length<=25){
        showVals=true;
    }
    bubbleSort(arr,animations);
    animate(animations,speed,showVals);
}


function bubbleSort(arr,animations){
    for(let i=0;i<arr.length-1;i++){
        for(var j=0;j<arr.length-i-1;j++){
            animations.push([j,j+1,"yellow"]);
            if(arr[j]>arr[j+1]){
                animations.push([j,j+1,"green"]);
                const tmp=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=tmp;
                animations.push([j,arr[j],j+1,arr[j+1]]);
                animations.push([j,j+1,"turquoise"]);
            }
            else{
                animations.push([j,j+1,"red"]);
                animations.push([j,j+1,"turquoise"]);
            }
        }
        animations.push([j,"#e15d44"]);
    }
    animations.push([0,"#e15d44"]);
 }

function animate(animations,speed,showVals){
    for(let itr=0;itr<animations.length;itr++){
        if(animations[itr].length===4){
            const [br1,br1Height,br2,br2Height] = animations[itr];
            setTimeout(()=>{
                operationsInfo(br1,br2,"swap");
                document.getElementById(br1).style.height=`${br1Height}px`;
                document.getElementById(br2).style.height=`${br2Height}px`;
                if(showVals){
                document.getElementById(`${br1}`+'span').innerHTML=br1Height;
                document.getElementById(`${br2}`+'span').innerHTML=br2Height;
                }
            },speed*itr);
        }
        else if(animations[itr].length===2){
            const [br,color]=animations[itr];
            setTimeout(() => {
                document.getElementById(br).style.backgroundColor=color;
                operationsInfo(br,br,color);
            }, speed*itr);
        }
        else{
            const [br1,br2,color]=animations[itr];
            setTimeout(()=>{
                document.getElementById(br1).style.backgroundColor=color;
                document.getElementById(br2).style.backgroundColor=color;
                if(color!=='turquoise')
                operationsInfo(br1,br2,color);
            },speed*itr);
        }
        
        setTimeout(()=> {
            if(animations[itr]===animations[animations.length-1]){
            const btns=document.getElementsByTagName('button');
            for(let i=0;i<btns.length;i++){
                btns[i].disabled=false;
                }
            document.getElementById('szSlider').disabled=false;
            document.getElementById('spSlider').disabled=false;
            document.getElementById('oprns').innerHTML= "`` Your Array is Sorted ✔🎉 ``";
            algoLineHighlighter("all");
            backToOriginalColor();
            }},speed*itr);
    }
}

function operationsInfo(br1,br2,color){
    const oprElmnt=document.getElementById('oprns');
    const br1Val=document.getElementById(br1).style.height.slice(0,-2);
    const br2Val=document.getElementById(br2).style.height.slice(0,-2);
    if(color==='yellow'){
    algoLineHighlighter('line3');
    oprElmnt.innerHTML= 'checking if '+br1Val+' > '+br2Val;
    }
    else if(color==='red')
    oprElmnt.innerHTML= 'No '+br1Val+' !> '+br2Val;
    else if(color==='green')
    oprElmnt.innerHTML= 'Yes '+br1Val+' > '+br2Val+' || '+'SWAP Them!';
    else if(color==='#e15d44'){
        algoLineHighlighter('passDone');
        oprElmnt.innerHTML= br1Val+' is now in Sorted position.';
    }
    else {
    algoLineHighlighter('line4');
    oprElmnt.innerHTML= br1Val+' and '+br2Val +' are being SWAPPED!';
    }
}


function algoLineHighlighter(line){
    document.getElementById('line1').style.backgroundColor='transparent';
    document.getElementById('line2').style.backgroundColor='transparent';
    document.getElementById('line3').style.backgroundColor='transparent';
    document.getElementById('line4').style.backgroundColor='transparent';
    if(line==='passDone'){
        document.getElementById('line1').style.backgroundColor='black';
        document.getElementById('line2').style.backgroundColor='black';
    }
    else if(line!=="all")
    document.getElementById(line).style.backgroundColor='black';
}

function backToOriginalColor(){
    const allBars=document.getElementsByClassName('array-bars');
    setTimeout (()=>{
        for(let idx=0;idx < allBars.length;idx++){
        allBars[idx].style.backgroundColor="turquoise";
        }
    },1000);
}

 export default bubbleSortInp;