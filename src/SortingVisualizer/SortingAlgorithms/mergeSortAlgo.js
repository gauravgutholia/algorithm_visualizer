function mergeSort(orgArray,speed){
    const animations=[];
    const arr=orgArray.slice();
    let showVals=false;
    if(arr.length<=25){
        showVals=true;
    }
    actualMergeSort(orgArray,0,arr.length-1,arr,animations);
    animate(animations,speed,showVals);
    return orgArray;
}

function actualMergeSort(orgArray,stIndex,endIndex,arr,animations){
    if(stIndex !== endIndex){
       const m=Math.floor((stIndex+endIndex)/2);
    actualMergeSort(arr,stIndex,m,orgArray,animations);
    actualMergeSort(arr,m+1,endIndex,orgArray,animations);
    merge(orgArray,stIndex,endIndex,arr,m,animations);
  }
}


function merge(orgArray,stIndex,endIndex,arr,m,animations){
    animations.push(['subarray',stIndex,endIndex]);
    let i=stIndex;
    let j=m+1;
    let k=stIndex;
    while(i<=m && j<=endIndex){
        animations.push([i,j,"orangered"]);
        animations.push([i,j,"turquoise"]);
        if(arr[i]<=arr[j]){
            animations.push([i,'green']);
            animations.push([i,k,'yellow']);
            animations.push([k,arr[i]]);
            orgArray[k]=arr[i];
            animations.push([i,k,'turquoise']);
            i += 1;
            }
        else{
            animations.push([j,'green']);
            animations.push([j,k,'yellow']);
            animations.push([k,arr[j]]);
            orgArray[k]=arr[j];
            animations.push([j,k,'turquoise']);
            j += 1;
            }
        k++;
        }
    while (i <=m) {
    animations.push([i,"#fd4705"]);
    animations.push([i,k,"yellow"]);
    animations.push([k,arr[i]]);
    orgArray[k] = arr[i];
    animations.push([i,k,'turquoise']);
    i++;
    k++;
    }
    while (j <=endIndex) {
    animations.push([j,"#fd4705"]);
    animations.push([j,k,"yellow"]);
    animations.push([k,arr[j]]);
    orgArray[k] = arr[j];
    animations.push([j,k,"turquoise"]);
    j++;
    k++;
    }
}

function animate(animations,speed,showVals){
    for(let itr=0;itr<animations.length;itr++){
        if(animations[itr].length===3){
            if(animations[itr][0]==='subarray'){
                setTimeout(() => {
                    subArrayColor(animations[itr][1],animations[itr][2]);
                }, itr*speed); 
            }
            else{
            const [b1,b2,color] = animations[itr];
            setTimeout(()=>{
                document.getElementById(b1).style.backgroundColor=color;
                document.getElementById(b2).style.backgroundColor=color;
                if(color!=="turquoise"){
                    operationsInfo(b1,b2,color);
                }
            },speed*itr);
          }
        }
        else if(animations[itr].length===2)
        {
            if(Number.isInteger(animations[itr][1])){
                const [br,newHeight] = animations[itr];
                setTimeout(() => {
                    if(showVals){
                        document.getElementById(`${br}`+'span').innerHTML=newHeight;
                        }
                    document.getElementById(br).style.height=`${newHeight}px`;
                }, itr*speed);
            }
            else {
                const [br,color] = animations[itr];
                setTimeout(() => {
                    document.getElementById(br).style.backgroundColor=color;
                    operationsInfo(br,br,color);
                }, itr*speed);
            }
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
                }},speed*itr);
    }
}


function subArrayColor(first,last){
    for(let indx=first;indx<=last;indx++){
        document.getElementById(indx).style.backgroundColor='red';
    }
    operationsInfo(first,last,'red');
}

function operationsInfo(br1,br2,color){
    const oprElmnt=document.getElementById('oprns');
    const br1Val=document.getElementById(br1).style.height.slice(0,-2);
    const br2Val=document.getElementById(br2).style.height.slice(0,-2);
    if(color==='red'){
        algoLineHighlighter("line2");
        oprElmnt.innerHTML="merging values from "+br1Val+" to "+br2Val;
    }
    else if(color==='orangered'){
        algoLineHighlighter("lines");
        oprElmnt.innerHTML='comparing '+br1Val+' and '+br2Val;
    }
    else if(color==='green'){
        oprElmnt.innerHTML= br1Val + " is smaller";
        algoLineHighlighter("copy");
    }
    else if(color==='yellow'){
        oprElmnt.innerHTML="copying "+br1Val+" at index "+br2;
    }
    else if(color==='#fd4705'){
        algoLineHighlighter("line7");
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
        document.getElementById('line3').style.backgroundColor='black';
        document.getElementById('line4').style.backgroundColor='black';
    }
    else if(line==='copy'){
        document.getElementById('line4').style.backgroundColor='black';
        document.getElementById('line5').style.backgroundColor='black';
        document.getElementById('line6').style.backgroundColor='black';
    }
    else if(line!=='all'){
        document.getElementById(line).style.backgroundColor='black';
    }
}
export default mergeSort;