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
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import CategoryIcon from '@material-ui/icons/Category';
import Modal from '@material-ui/core/Modal';
import MuiAlert from '@material-ui/lab/Alert';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function valuetext(value) {
  return `${value}°C`;
}

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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius:15,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Search() {
    const classes = useStyles();
    const history = useHistory();
    const [data,setData] = React.useState([]);
    const [viewData,setViewData] = React.useState([]);
    const [minMaxValue, setMinMax] = React.useState([0, 10]);
    var maxPrice = -1;
    var minPrice = 1000000;
    const [modalStyle] = React.useState(getModalStyle);
    var location = useLocation();
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const [priceModal,setPriceModal] = React.useState(0);
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

    const handleChange = (event, newValue) => {
        let arr = [];
        
        viewData.map((value)=>{
          
          let price = value.price.split(",");
          price = price.join("")
          price = parseInt(price)
          //console.log(price,minMaxValue,price>=minMaxValue[0])
          if(price>=minMaxValue[0] & price<=minMaxValue[1]){
            arr.push(value)
            //console.log("inside",value)
          }
        });
        console.log(arr,"data ",viewData)
        setMinMax(newValue);
        setData(arr)
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div style={{width:300}}>
              <Typography id="range-slider" gutterBottom>
                Price range
              </Typography>
              <Slider
                value={minMaxValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min = {0}
                max = {100000}
                getAriaValueText={valuetext}
              />
            </div>
        </div>
    );

    const sortPrice = ()=>()=>{
      let tempArr = data;
      console.log(tempArr)
      tempArr.sort(function(a,b){
        if (a.price<b.price){
          return -1
        }
        if(a.price>b.price){
          return 1
        }
        else{
          return 0
        }
      });
      console.log(tempArr);
      setViewData(tempArr);
      setData(tempArr);
    }

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
                let price = data.price.split(",");
                price = price.join("")
                price = parseInt(price)
                if(minPrice>price){

                  minPrice = price;
                  console.log(minPrice,price)
                }
                if(maxPrice<price){
                  maxPrice = price;
                  console.log(maxPrice,data.price,price)
                }
                setMinMax([minPrice,maxPrice]);
                arr.push(data);
            })
        //setOptions(arr);
        setData(arr);
        setViewData(arr);
        console.log(viewData,"iy",maxPrice,minPrice)
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
        <div className="App" style={{height:"100%",
    backgroundColor:"#F1F3F4"}}>
            <PrimarySearchAppBar />
            
            <Paper component="ul" className={classes.root2}>
                  
                    <li >
                        <Chip
                        icon={<LocalAtmIcon />}
                        label={"Price"}
                        clickable
                        onClick={()=>{setPriceModal(1)}}
                        className={classes.chip}
                        variant="outlined"
                        color="primary"
                        />
                    </li>
                    <li >
                        <Chip
                        icon={<FeaturedPlayListIcon />}
                        label={"Sort"}
                        clickable
                        onClick={sortPrice()}
                        className={classes.chip}
                        variant="outlined"
                        color="primary"
                        />
                    </li>
                    <li >
                        <Chip
                        icon={<CategoryIcon />}
                        label={"Category"}
                        clickable
                        className={classes.chip}
                        variant="outlined"
                        color="primary"
                        />
                    </li>
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
            <Modal
              open={priceModal}
              onClose={()=>{setPriceModal(0);}}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              >
              {body}
            </Modal>
        </div>
    );
    }

export default Search;