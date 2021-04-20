import PrimarySearchAppBar from './appBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { green } from '@material-ui/core/colors';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {Link, useLocation} from "react-router-dom";
import firebase from './firebase';
import "firebase/auth";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const themeCustom = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    }
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection:'row',
    top:0,
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
  paper: {
    padding: theme.spacing(4),
    margin: 'auto',
    maxWidth: "100%",
    maxHeight: "100%"
  },
  paper2: {
    margin: 'auto',
    maxWidth: "100%",
    maxHeight: "100%",
    zIndex:0,
  },
  image: {
    width: 500,
    height: 500,
    borderRadius:15,
    borderWidth:1,
    zIndex:0
  },
  imageSmall: {
    width: 100,
    height: 100,
    borderRadius:1,
    borderWidth:1,
    marginLeft:5,
    zIndex:0

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius:5,
    zIndex:0
  },
  img2: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius:15,
    zIndex:0
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


function Product() {
    const classes = useStyles();
    const [urlArr,setUrlArr] = React.useState([]);
    const [data,setData] = React.useState({});
    var dataVar = {};
    const [name,setName] = React.useState("");
    const [price,setPrice] = React.useState(0);
    const [inStock,setStock] = React.useState(0);
    const [category,setCategory] = React.useState("");
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const [imgSrc,setImgSrc] = React.useState("");
    const [id,setId] = React.useState(-1);
    const [snack,setSnack] = React.useState(0);
    const [snackMessage,setSnackMessage] = React.useState("");
    const [snackSeverity,setSnackSeverity] = React.useState("success")
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        //console.log("setSnack")
        setSnack(0);
    };
    var idTemp = -1;
    var location = useLocation();
    const [uid,setUid] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const getMetaData = ()=>{
        //console.log(location);
        let splitData = location.pathname.split("/");
        setId(parseInt(splitData[splitData.length-1]));
        idTemp = parseInt(splitData[splitData.length-1]);
        //console.log(id,splitData,parseInt(splitData[splitData.length-1]))
    }

    const checkStatus =()=>{
        
        setRefreshing(true);
        firebase.auth().onAuthStateChanged(user =>{
            //console.log(user,"pakalam pa");
            if(user){
                //navigation1.navigate('MyTabs',{userId:user.uid.toString()});
                setUid(user.uid.toString());
                
            }
            setRefreshing(false);
        })
    }

    const getData = ()=>{
      var product = {};
      let splitData = location.pathname.split("/");
      fetch("http://127.0.0.1:8000/getProduct/?id="+splitData[splitData.length-1]).then((response)=>{
        //console.log(response)
        return response.json()
      }).then((response)=>{
        product = response;
        let tempData = product.result;
        tempData["key"] = splitData[splitData.length-1];
        setData(tempData)
        dataVar = tempData;
        let arr = [tempData.img_1,tempData.img_2,tempData.img_3];
        setName(tempData.name);
        setCategory(tempData.category);
        setPrice(tempData.price);
        setStock(tempData.quantity);
        setUrlArr(arr);
        setImgSrc(tempData.img_2)
        setRefreshing(false);
        //console.log(tempData);
        
        setData(tempData);
        return tempData;
      }).catch(err=>{
        console.log("something went wrong!",err);
        return [];
        setRefreshing(false);
      });
    }

    const constructor = ()=>{
        if(constructorFlag == 0){

            let tempData = [
                {
                    key:1, name: "Smart 12 Inch tv samsung", Price: 26900, 
                    src1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8P-nx0FswkMiwW5wCA5hZcPG1H5kG57DAyg&usqp=CAU",
                    src2:"https://images-na.ssl-images-amazon.com/images/I/61UTlibhl%2BL._SY741_.jpg",
                    src3:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcc1K6-WPl6yl84xsY7rROhOMznnJ0FS9gew&usqp=CAU",
                    stock:1,category:"TV"
                },
                {
                    key:2, name: "Smart 15 Inch android tv phiilips ", Price: 38000, 
                    src1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpRVqfWMlrypPhH4ta1uzWO0Cm_IqCQdU3g&usqp=CAU",
                    src2:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWoQ0fFDZyGiaEgCLSdfi3_PNc4US_Cv8LA&usqp=CAU",
                    src3:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCd0MB2bEFUXPlZxLTl0J3vI3Z8Jnw2J4UA&usqp=CAU",
                    stock:1,
                    category:"TV"
                },
            ]
            setConstructorFlag(1);
            getMetaData();
            let temp = getData();
            idTemp = 1;
            console.log("data",temp)
            //setData(tempData[idTemp]);
            //console.log(idTemp,tempData,"data")
            //setImgSrc(tempData[idTemp].src1);
            checkStatus();
            //console.log(data,tempData)  
            
            //setViewData(tempData);

        }
    }


    const addProduct = ()=>()=>{
        console.log("add Product",dataVar,data)
        try{
            const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: data,userId:uid})
                };
            fetch('http://127.0.0.1:8000/addToCart/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data,"recieved"));

            setSnack(1);
            setSnackMessage("product added Successfully!");
            setSnackSeverity("success");
        }
        catch(err){
            setSnack(1);
            setSnackMessage("Something went wront!");
            setSnackSeverity("info");
        }
    }

    const changeSrc = (src)=>()=>{
        console.log("src changed");
        var url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQ2QicbufytX1bTxF3xcQUBKpLoaSWb9dEA&usqp=CAU";
        setImgSrc(src)
    }

    constructor();

    return (
        <div className="App" style={{
    backgroundColor:"#F1F3F4"}}>
            <PrimarySearchAppBar />
            <div className={classes.root}>
                <div className={classes.paper}>
                    <Grid container spacing={8}>
                        
                        <Grid item xs container direction="row" >
                            <Grid item xs container direction="column" spacing={2} alignItems="flex-start">
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall} onClick={changeSrc(urlArr[0])}>
                                            <img className={classes.img}  src={urlArr[0]} />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall} onClick={changeSrc(urlArr[1])}>
                                            <img className={classes.img}  src={urlArr[1]} />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall} onClick={changeSrc(urlArr[2])}>
                                            <img className={classes.img}  src={urlArr[2]} />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                            </Grid>
                            <div className={classes.paper2} style={{height:"100%",}}>
                                    <ButtonBase  className={classes.image}>
                                        <img className={classes.img2} id="mainImg" src={imgSrc} />
                                    </ButtonBase >
                            </div>
                        </Grid>
                        <Grid item xs sm container alignItems="center" justifyContent="flex-start" >
                            <Grid item xs container direction="column" spacing={2} alignItems="flex-start" style={{marginLeft:"-5%",backgroundColor:"white",padding:15,borderRadius:15}}>
                                <Typography gutterBottom variant="h4">
                                    {name}
                                </Typography>

                                <Chip label={category} color="primary" />

                                <Grid item container direction="row" spacing={2} alignItems="center">
                                    <Typography gutterBottom variant="subtitle1">
                                        Price:
                                    </Typography>
                                    <Typography gutterBottom variant="h6">
                                        {price}
                                    </Typography>
                                </Grid>
                                <Typography gutterBottom variant="subtitle1">
                                        Inclusive of all Taxes
                                </Typography>
                                <Typography gutterBottom variant="h6" style={{ color: green[500] }}>
                                        <GolfCourseIcon />   {inStock>10?"In Stock":inStock == 0?"Sold Out":"Hurry up,Only few left"}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<AddShoppingCartIcon />}
                                    onClick={addProduct()}
                                    >
                                    Add to cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Backdrop className={classes.backdrop} open={refreshing} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={snack} autoHideDuration={3000} onClose={handleSnackClose}>
                <Alert  severity={snackSeverity} onClose={handleSnackClose}>
                {snackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Product;