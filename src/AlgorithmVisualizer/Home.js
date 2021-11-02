import React from 'react';
import './home.css';
import bgimg from './logo222.gif';
import logoimg from './logo11.gif';
import Typewriter from 'typewriter-effect';
import arrow from './arrow.png';
import ghub from './github.png';
import { Link } from 'react-router-dom';
function HomeHeader(){
    return(
        <header className='home-header'>
            <img id='logo' src={logoimg}></img>
            <div style={{ textAlign:'left',width:'100%',padding:'1% 0 0 0.5%'}}>Algo-View</div>
            <div id='ghub'><img id="ghubimg"src={ghub}></img></div>
        </header>
    )
}

function HomeMain(){
    return(
        <main className='home-main'>
        <div>
            <div id='tag-line'>
            <Typewriter
            options={{autoStart:true,loop:true}}
            onInit={(typewriter) => {
                typewriter.typeString('“ Grab the Rhythm of your Algorithm !”')
                .pauseFor(2500)
                .deleteAll()
                .start();
            }}
            />
            </div>
            <div id='defi'>
                <article>  An Algorithm Visualizer is a tool used 
                    for visualizing algorithms using animations and 
                    computer graphics.<br/>
                    <br/>
                    Check out my Sorting Visualizer tool comprising of 
                    different sorting algorithms along with their pseudocode and 
                    ongoing operations.
                </article>
                <div><img id='dwnarrow' src={arrow}></img></div>
            </div>
            <div>
                <Link to='/AlgoView'>
                    <div id='sortingVis'>Sorting Visualizer</div>
                </Link>
            </div>
        </div>
        <div ><img id='bgimg' src={bgimg}></img></div>
        </main>
    );
}

function HomeFooter(){
    return(
    <div className='foot'>
        <div style={{display:'inline-block'}}>© 2021 Kartik Sundriyal</div>
    </div>);
}

function HomeDisplay(){
    return(
        <>
        <HomeHeader/>
        <HomeMain/>
        <HomeFooter/>
        </>
    )
}


export default HomeDisplay;