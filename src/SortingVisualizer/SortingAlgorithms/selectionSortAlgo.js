function selectionSortInp(arr,speed){
    const animations=[];
    let showVals=false;
    if(arr.length<=25){
        showVals=true;
    }
    selectionSort(arr,animations);
    animate(animations,speed,showVals);
}

function selectionSort(arr,animations){
    for(var i=0;i<arr.length-1;i++){
        let min_indx = i;
        animations.push([min_indx,"#800280"]);
    	for(let j=i+1;j<arr.length;j++){
            animations.push([j,"yellow"]);
            animations.push([j,"turquoise"]);
        	if(arr[j]<arr[min_indx]){
                animations.push([min_indx,"turquoise"]);
            	min_indx=j;
                animations.push([min_indx,"purple"]);
            	}
        }
        const temp=arr[min_indx];
        arr[min_indx]=arr[i];
        arr[i]=temp;
        animations.push([min_indx,i,"red"]);
        animations.push([i,arr[i],min_indx,arr[min_indx]]);
        animations.push([min_indx,"turquoise"]);
        animations.push([i,"darkgreen"]);
    }
    animations.push([i,"darkgreen"]);
}

function animate(animations,speed,showVals){
    for(let itr=0;itr<animations.length;itr++){
        if(animations[itr].length===4){
            const [br1,br1Height,br2,br2Height]=animations[itr];
            setTimeout(() => {
                document.getElementById(br1).style.height=`${br1Height}px`;
                document.getElementById(br2).style.height=`${br2Height}px`;
                operationsInfo(br1,br2,'swap');
                if(showVals){
                document.getElementById(`${br1}`+'span').innerHTML=br1Height;
                document.getElementById(`${br2}`+'span').innerHTML=br2Height;
                }
            }, speed*itr);
        }
        else if(animations[itr].length===3){
            const [br1,br2,color]=animations[itr];
            setTimeout(() => {
                operationsInfo(br1,br2,color);
                document.getElementById(br1).style.backgroundColor=color;
                document.getElementById(br2).style.backgroundColor=color;
            }, speed*itr);
        }
        else{
            const [br,color]=animations[itr];
            setTimeout(() => {
                operationsInfo(br,br,color);
                document.getElementById(br).style.backgroundColor=color;
            }, speed*itr);
        }
        setTimeout(()=> {if(animations[itr]===animations[animations.length-1]){
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
        oprElmnt.innerHTML='checking if '+br1Val+' < current Minimum';
        algoLineHighlighter('line4');
    }
    else if(color==='purple'){
        oprElmnt.innerHTML='setting '+br1Val+' as new minimum';
        algoLineHighlighter('line5');
    }
    else if(color==='#800280'){
        oprElmnt.innerHTML='setting '+br1Val+' as current minimum';
        algoLineHighlighter('lines')
    }
    else if(color==='red'){
        oprElmnt.innerHTML='swapping '+br1Val+' (minimum) with '+br2Val+' (first unsorted element)';
        algoLineHighlighter('line6');
    }
    else if(color==='darkgreen'){
        oprElmnt.innerHTML=br1Val+' is now in sorted position';
    }
}

function algoLineHighlighter(line){
    document.getElementById('line1').style.backgroundColor='transparent';
    document.getElementById('line2').style.backgroundColor='transparent';
    document.getElementById('line3').style.backgroundColor='transparent';
    document.getElementById('line4').style.backgroundColor='transparent';
    document.getElementById('line5').style.backgroundColor='transparent';
    document.getElementById('line6').style.backgroundColor='transparent';
    if(line==="lines"){
        document.getElementById("line1").style.backgroundColor='black';
        document.getElementById("line2").style.backgroundColor='black';
        document.getElementById("line3").style.backgroundColor='black';
        }
    else if(line!=="all"){
        document.getElementById(line).style.backgroundColor='black';
    }
}


function backToOriginalColor(){
    const allBars=document.getElementsByClassName('array-bars');
    setTimeout (()=>{
        for(let idx=0;idx < allBars.length;idx++){
        allBars[idx].style.backgroundColor="turquoise";
        }
    },500);
}

export default selectionSortInp;