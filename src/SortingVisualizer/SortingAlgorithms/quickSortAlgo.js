function quickSortInp(arr,speed){
    const animations=[];
    let showVals=false;
    if(arr.length<=25){
        showVals=true;
    }
    const lw=0;
    const hgh=arr.length-1;
    quickSort(arr,lw,hgh,animations);
    animate(animations,speed,showVals);
}
function quickSort(arr,lw,hgh,animations){
	if(lw<hgh){
	let pivot = arr[hgh];
    animations.push([hgh,"purple"]);
    let j=lw-1;
	for(let i=lw;i<hgh;i++){
        animations.push([i,"orange"]);
    	if(arr[i]<=pivot){
            animations.push([i,"green"]);
            animations.push([i,"turquoise"]);
        	j++;
            if(i!==j){
            animations.push([i,j,"yellow"]);
            const temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
            animations.push([i,arr[i],j,arr[j]]);
            animations.push([i,j,"turquoise"]);
            }
        }
        else{
            animations.push([i,"red"]);
            //animations.push([i,arr[i],i,arr[i]]);
            animations.push([i,"turquoise"]);
        }
    }
    animations.push([j+1,hgh,"#ffff08"]);
    const tmp=arr[hgh];
    arr[hgh]=arr[j+1];
    arr[j+1]=tmp;
    animations.push([j+1,arr[j+1],hgh,arr[hgh]]);
    animations.push([j+1,hgh,"turquoise"]);
    quickSort(arr,lw,j,animations);
    quickSort(arr,j+2,hgh,animations);
   }
}


function animate(animations,speed,showVals){
    for(let itr=0;itr<animations.length;itr++){
        if(animations[itr].length===2){
            const[br,color]=animations[itr];
             setTimeout(()=>{
                document.getElementById(br).style.backgroundColor=color;
                operationsInfo(br,br,color);
            },speed*itr);
        }
        else if(animations[itr].length===4){
            const [br1,br1Height,br2,br2Height]=animations[itr];
             setTimeout(()=>{
                    document.getElementById(br1).style.height=`${br1Height}px`;
                    document.getElementById(br2).style.height=`${br2Height}px`;
                    if(showVals){
                    document.getElementById(`${br1}`+'span').innerHTML=br1Height;
                    document.getElementById(`${br2}`+'span').innerHTML=br2Height;
                    }
                    },speed*itr);
        }
        else{
            const [br1,br2,color]=animations[itr];
            setTimeout(()=>{
                document.getElementById(br1).style.backgroundColor=color;
                document.getElementById(br2).style.backgroundColor=color;
                operationsInfo(br1,br2,color);
            },speed*itr);
        }
        setTimeout(()=> {if(animations[itr]===animations[animations.length-1]){
            openThem();
            document.getElementById('oprns').innerHTML= "`` Your Array is Sorted ✔🎉 ``";
            algoLineHighlighter("all");
            }},speed*itr);

    }

}

function operationsInfo(br1,br2,color){
    const oprElmnt=document.getElementById('oprns');
    const br1Val=document.getElementById(br1).style.height.slice(0,-2);
    const br2Val=document.getElementById(br2).style.height.slice(0,-2);
    if(color==='purple'){
        oprElmnt.innerHTML='Setting '+br1Val+' as Pivot!';
        algoLineHighlighter('lines');
    }
    else if(color==='orange'){
        oprElmnt.innerHTML='Checking if '+br1Val+' < Pivot';
        algoLineHighlighter('line5');
    }
    else if(color==='yellow'){
        oprElmnt.innerHTML='Swapping '+br1Val+' with '+br2Val+' ( storingIndex element )';
        algoLineHighlighter('line6');
    }
    else if(color==='#ffff08'){
        oprElmnt.innerHTML='Swapping Pivot with '+br1Val+' (element at storingIndex+1)';
        algoLineHighlighter('line7');
    }
    else if(color==='green'){
        oprElmnt.innerHTML='Yes it is!'
    }
    else if(color==='red'){
        oprElmnt.innerHTML="No it's Not!"
    }
}

function algoLineHighlighter(line){
    document.getElementById('line1').style.backgroundColor='transparent';
    document.getElementById('line2').style.backgroundColor='transparent';
    document.getElementById('line3').style.backgroundColor='transparent';
    document.getElementById('line4').style.backgroundColor='transparent';
    document.getElementById('line5').style.backgroundColor='transparent';
    document.getElementById('line6').style.backgroundColor='transparent';
    document.getElementById('line7').style.backgroundColor='transparent';
    if(line==='lines'){
        document.getElementById('line1').style.backgroundColor='black';
        document.getElementById('line2').style.backgroundColor='black';
        document.getElementById('line3').style.backgroundColor='black';
    }
    else if(line==='line5'|| line==='line6'){
        document.getElementById(line).style.backgroundColor='black';
        document.getElementById('line4').style.backgroundColor='black';
    }
    else if(line!=='all'){
        document.getElementById(line).style.backgroundColor='black';
    }
}

function openThem(){
    const btns=document.getElementsByTagName('button');
            for(let i=0;i<btns.length;i++){
                btns[i].disabled=false;
            }
            document.getElementById('szSlider').disabled=false;
            document.getElementById('spSlider').disabled=false;
}

function backToOriginalColor(){
    const allBars=document.getElementsByClassName('array-bars');
    setTimeout (()=>{
        for(let idx=0;idx < allBars.length;idx++){
        allBars[idx].style.backgroundColor="turquoise";
        }
    },1000);
}
export default quickSortInp;