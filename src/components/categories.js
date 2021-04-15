import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
//import HorizontalScroll from './horizontalScroll.js';
//import HorizontalScroll from 'react-scroll-horizontal'
import styled, { createGlobalStyle } from "styled-components";
//import Exper from "./experiment.js";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import MiniCard from "./miniCard";
import { useHistory } from 'react-router';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const SampleCard = styled.div`
  position: relative;
  height: 300px;
  width: 500px;
  background-color: #111f30;
  margin-right: 75px;
  flex-shrink: 0;
`;
const useStyles = makeStyles((theme) => ({
   root: {
    maxWidth: 345,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  root2: {
    display: 'flex',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    alignItems:"flex-start"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
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

export const CategorySlider = () => {
  const classes = useStyles();
    const history = useHistory();
    const [data,setData] = React.useState([]);
    const [viewData,setViewData] = React.useState([]);
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
        { key: 5, label: 'Angular' },
        { key: 6, label: 'jQuery' },
     
    ]);
    const [refreshing, setRefreshing] = React.useState(false);
    
    const navigateTo = (flag)=>()=>{
        if( flag >=0){
            history.push("/product/"+flag);
        }
    };

    const constructor = ()=>{
        if(constructorFlag == 0){
            setRefreshing(true);
            let tempData = [
                {
                    key:1, name: "Smart 12 Inch tv samsung", Price: 26900
                },
                {
                    key:2, name: "Smart 12 Inch tv samsung", Price: 26900
                },
            ]
            setConstructorFlag(1);
            setData(tempData);
            setRefreshing(false);
            //setViewData(tempData);

        }
    }
    //<Exper />
    constructor();
  return(
  
  <div style={{padding:10}}>
          <Typography variant="h4" component="h3" align="left">
            Top Category
          </Typography>
        <div style={{justify:"center",alignSelf:"center",margin: 20}}>
            <Grid container spacing={1} direction="row">
              {
                data.map((data,i)=>{
                  return(
                    <div key={data.key} onClick={navigateTo(i)}>
                        <MiniCard name={data.name} price ={data.Price} />
                    </div>
                  );
                })
              }
                
            </Grid>
            
            </div>
            <Backdrop className={classes.backdrop} open={refreshing} >
              <CircularProgress color="inherit" />
            </Backdrop>

            
  </div>
   
    
    
)}