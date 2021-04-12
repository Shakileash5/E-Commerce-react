import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
//import HorizontalScroll from './horizontalScroll.js';
//import HorizontalScroll from 'react-scroll-horizontal'
import styled, { createGlobalStyle } from "styled-components";
import Exper from "./experiment.js";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const SampleCard = styled.div`
  position: relative;
  height: 300px;
  width: 500px;
  background-color: #111f30;
  margin-right: 75px;
  flex-shrink: 0;
`;

const SampleCards = React.memo(() =>
  Array(5)
    .fill(0)
    .map((_e, i) => <Cards key={`sampleCard-${i}`} />)
);

 function Cards(){
   
  return(
    <div style={{padding:10,margin:5,borderRadius:5,borderWidth:1}} >
    <img
      src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"
      alt="Second slide"
      style={{height:100,width:100}}
    />    
    <Typography variant="h5" component="h5" align="left">  
          Pipes
    </Typography>
    </div>
  )
}

    const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  backgroundColor:'black',
  color:"white",
};

export const CategorySlider = () => (
  
<div style={{padding:10}}>
        <Typography variant="h4" component="h3" align="left">
          Top Category
        </Typography>
       <Exper />

          
    </div>
   
    
    
)