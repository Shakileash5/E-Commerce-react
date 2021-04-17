import PrimarySearchAppBar from './appBar';
import MiniCard from "./components/miniCard";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import {Link, useLocation} from "react-router-dom";
import { useHistory } from 'react-router';
import firebase from './firebase';
import "firebase/auth";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function Search() {
    const classes = useStyles();
    const history = useHistory();
    const [data,setData] = React.useState([]);
    const [viewData,setViewData] = React.useState([]);
    var location = useLocation();
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

    const navigateToProduct = (flag)=>()=>{
        //history.push("/product");
        if( flag >=0){
            history.push("/product/"+flag);
        }
    };


    const getData = ()=>{
      var products = {};
      let splitData = location.pathname.split("/");
      let arr = [];
      console.log(splitData,"keywords");
      fetch("http://127.0.0.1:8000/getSearchResults/?keyword="+splitData[splitData.length-1]).then((response)=>{
        console.log(response)
        return response.json()
      }).then((response)=>{
        products = response;
        console.log("products",products)
        
          //console.log(products.result,"products");
          let arr = [];
          products.result.map((data) => {
                //console.log(key,products.result[key])
                arr.push(data)
            })
        //setOptions(arr);
        setData(arr);
        console.log(arr,"iy")
        return arr;
        
        setRefreshing(false);
      
      }).catch(err=>{
        console.log("something went wrong!",err);
        return [];
        setRefreshing(false);
      });
    }

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
            let arr = getData();
            console.log("whats happening",arr)
            //setData(arr);
            setRefreshing(false);
            //setViewData(tempData);

        }
    }
    constructor();

    return (
        <div className="App" style={{height:"100%"}}>
            <PrimarySearchAppBar />
            
            <Paper component="ul" className={classes.root2}>
                {chipData.map((data) => {
                    let icon;

                    if (data.label === 'React') {
                    icon = <TagFacesIcon />;
                    }

                    return (
                    <li key={data.key} >
                        <Chip
                        icon={icon}
                        label={data.label}
                        
                        className={classes.chip}
                        variant="outlined"
                        color="primary"
                        />
                    </li>
                    );
                })}
            </Paper>
            <div style={{justify:"center",alignSelf:"center",margin: 20}}>
            <Grid container spacing={1} direction="row">
              {
                data.map((data,i)=>{
                  console.log(data.img_1)
                  return(
                    <div key={data.key} onClick={navigateToProduct(data.key)}>
                        <MiniCard name={data.name} price ={data.price} image={data.img_1} />
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
    );
    }

export default Search;