import React, {useState } from "react";
import ReactDOM from 'react-dom';
import './SortingVisualizer.css';
import mergeSort from './SortingAlgorithms/mergeSortAlgo';
import quickSortInp from './SortingAlgorithms/quickSortAlgo';
import bubbleSortInp from './SortingAlgorithms/bubbleSortAlgo';
import selectionSortInp from "./SortingAlgorithms/selectionSortAlgo";
import {OpenThem,BackToOriginalColor,AlgoLineHighlighter} from "./MutualMethods";

function disable(){
    const btns=document.getElementsByTagName('button');
    for(let i=0;i<btns.length;i++){
        btns[i].disabled=true;
    }
    document.getElementById('stop').style.visibility='visible';
    document.getElementById('stopbtn').disabled=false;
    document.getElementById('szSlider').disabled=true;
    document.getElementById('spSlider').disabled=true;
    showData('both');
}
function stopIt(stpUpdArray,array){
    const highestId = window.setTimeout(() => {
        for (let i = highestId; i >= 0; i--) {
          window.clearInterval(i);
        }
      }, 0);
    setTimeout(() => {
    OpenThem();
    AlgoLineHighlighter("all");  
    const updArray = ()=>{
        const arr = [];
        for(let i=0;i<array.length;i++){
            arr.push(parseInt(document.getElementById(i).style.height.slice(0,-2)));
        }
        stpUpdArray(arr);
    };
    updArray();
    }, 1000);
    BackToOriginalColor();
}

function mSort(arr,speed){
    ReactDOM.render(<strong>Merge Sort:</strong>,document.getElementById('algo-name'));
    disable();
    const algoData=["split each element into partition of size 1",
    "recursively merge adjacent partitions",
    "   comparing [leftPart vals to rightPart vals]",
    "      if leftPartVal <= rightPartVal",
    "         copy leftPartVal",
    "      else: copy rightPartVal",
    "      copy the remaining vals of both partitions"];
    ReactDOM.render(<AlgoInfo algoData={algoData}/>, document.getElementById('algo'));
    const finalSpeed = sortingSpeed(speed);
    mergeSort(arr,finalSpeed);
}

function qSort(arr,speed){
    ReactDOM.render(<strong>Quick Sort:</strong>,document.getElementById('algo-name'));
    disable();
    const algoData=['for each (unsorted) partition',
    '  set the last element as Pivot',
    "    storingIndx = partition's initial index - 1",
    "    for i=partition's starting indx To Pivot",
    "       if element[i] <= Pivot",
    "          storingIndx++; swap( i,storingIndx )",
    "    swap( pivot , storing index+1)"];
    ReactDOM.render(<AlgoInfo algoData={algoData}/>, document.getElementById('algo'));
    const finalSpeed = sortingSpeed(speed);
    quickSortInp(arr,finalSpeed);
}

function bSort(arr,speed){
    ReactDOM.render(<strong>Bubble Sort:</strong>,document.getElementById('algo-name'));
    disable();
    const algoData=['for i = 0 to ArrayLength-1',
    '   for i = 0 to indexOfLastUnsortedElement-1',
    '       if leftElement > rightElement','            swap( leftElement,rightElement )'];
    ReactDOM.render(<AlgoInfo algoData={algoData}/>, document.getElementById('algo'));
    const finalSpeed = sortingSpeed(speed);
    bubbleSortInp(arr,finalSpeed);
}

function slSort(arr,speed){
    ReactDOM.render(<strong>Selection Sort:</strong>,document.getElementById('algo-name'));
    disable();
    const algoData=['for i=0 to ArrayLength-1',
    '   set the first unsorted element as the minimum',
    '   for each of the unsorted elements',
    '       if element < currentMinimum',
    '           set element as new minimum',
    '   swap( minimum , first Unsorted_Index)'];
    ReactDOM.render(<AlgoInfo algoData={algoData}/>, document.getElementById('algo'));
    const finalSpeed=sortingSpeed(speed);
    selectionSortInp(arr,finalSpeed);
}


function showData(callFrom){
  const oprnDisplay=document.getElementById('oprns');
  const algoDisplay=document.getElementById('algo');
  if(callFrom==='both'){
    oprnDisplay.style.visibility='visible';
    algoDisplay.style.visibility='visible';
  }
  else if(callFrom==='opr'){
        if(oprnDisplay.style.visibility==='visible'){
            oprnDisplay.style.visibility='hidden';}
        else{oprnDisplay.style.visibility='visible';}
  }
  else{
        if(algoDisplay.style.visibility==='visible'){
            algoDisplay.style.visibility='hidden';}
        else{algoDisplay.style.visibility='visible';}
  }
}

function Header(props){
    const[speed,setSpeed]=useState(4);
    return(
        <header className="pghead">
            <div className='lftHdrDiv'>
                <div className='gnaButton'>
                    <button style={{cursor:'pointer'}} onClick={()=>props.nArray(props.arr.length)}>Generate New Array!</button>
                </div>
                <div style={{marginLeft:'2%'}}>
                    <div><span>ArraySize :</span></div>
                    <input type="range" className='sizeSlider' id='szSlider' min='5' max='150' defaultValue={100} 
                    title={props.arr.length} onChange={(event)=>props.nArray(parseInt(event.target.value))}></input>
                </div>
                <div>
                <div><span>Speed:</span></div>
                    <input type="range" className='speedSlider' id='spSlider' min='1' max='6' defaultValue={4} 
                    title={speed} onChange={(event)=>setSpeed(parseInt(event.target.value))}></input>
                </div>
            </div>
            <div className="separator"></div>
            <div className='center-head'>SORTING VISUALIZER</div>
            <div className="separator"></div>
            <div className='srtbtns'>
                <button onClick={()=>bSort(props.arr,speed)}>BubbleSort</button>
                <button onClick={()=>slSort(props.arr,speed)}>SelectionSort</button>
                <button onClick={() =>mSort(props.arr,speed)}>Merge Sort</button>
                <button onClick={()=>qSort(props.arr,speed)}>Quick Sort</button>
            </div>
        </header>
    );
}


function Div(props){
    let arr=props.arr;
    return(
      <div className="main-container">
        <div className='info-outer'>
                <div className='instructions'>
                    <div></div>
                </div>
                <div id='alg'>
                    <div id='algo-name'></div>
                    <div id='stop'><button id='stopbtn' onClick={()=>stopIt(props.stpUpdArray,props.arr)}>Stop</button></div>
                </div>
                <div className='info-container'>
                        <div className="oprns-container">
                        <div id='oprns-clk' onClick={()=>showData('opr')}>{'>'}</div>
                        <div id='oprns'></div>
                        </div>
                        <div className="algo-container">
                        <div id='algo-clk' onClick={()=>showData('algo')}><div id="algo-arrow">{'>'}</div></div>
                        <div id='algo'></div>
                        </div>
                </div>
        </div>
        <div className='bars-outer'>
                <div className="bars-container">
                    {arr.map( (value, idx) =>(
                    <div className="array-bars"  key={idx} id={idx} title={value+' at index '+idx} style={{height: `${value}px`,width:props.width}}>
                        <div id={idx+'span'} className="bar-val">{arr.length<=25?value:null}</div>
                        </div>   // using ` ` template strings for dynamic expressions.
                    ))}
                    <div className='shadow'>
                    </div>
                </div>
        </div>
      </div>
    );
  }


//AlgoInfo component:
function AlgoInfo(props){
    return(
        <div>
            <div id='line1'><pre>{props.algoData[0]}</pre></div>
            <div id='line2'><pre>{props.algoData[1]}</pre></div>
            <div id='line3'><pre>{props.algoData[2]}</pre></div>
            <div id='line4'><pre>{props.algoData[3]}</pre></div>
            <div id='line5'><pre>{props.algoData[4]}</pre></div>
            <div id='line6'><pre>{props.algoData[5]}</pre></div>
            <div id='line7'><pre>{props.algoData[6]}</pre></div>
        </div>
    );
}

function resetArray(n) {
    const arr=[];
    for(let i=1;i<=n;i++){
        arr.push(randomNumInRange(8,550));
       }
    return arr;
    }

//PARENT COMPONENT :-
function Display(){
    const [width,setWidth] = useState('5px');
    const [array,updArray] = useState(resetArray(100));
    const stpUpdArray = (arr) => {updArray(arr)};
    const createArr=(no_of_bars)=>{
        ReactDOM.render(<AlgoInfo algoData={[]}/>,document.getElementById('algo'));
        document.getElementById('oprns').innerHTML='';
        document.getElementById('stop').style.visibility='hidden';
        ReactDOM.render(<div></div>,document.getElementById('algo-name'));
        if(no_of_bars<=25){
            setWidth('30px');
        }
        else if(no_of_bars<=50){
            setWidth('12px');
        }
        else if(no_of_bars<=70){
            setWidth('7px');
        }
        else if(no_of_bars<=100){
            setWidth('5px');
        }
        else {
            setWidth('2.6px');
        }
        updArray(resetArray(no_of_bars));
        };
    return(
    <div>
    <Header nArray={createArr} arr={array}/>
    <Div arr={array} width={width} stpUpdArray={stpUpdArray}/>
    </div>
    );
}

function randomNumInRange(min,max){
    return Math.floor(Math.random() * (max-min+1) + min);
}


function sortingSpeed(speed){
    switch (speed) {
        case 1:
            return 1500;
        case 2:
            return 500;
        case 3:
            return 100;
        case 4:
            return 50;
        case 5:
            return 15;
        case 6:
            return 2;
        default:
            console.log("Something is wrong!");
            break;
    }
}
export default Display;