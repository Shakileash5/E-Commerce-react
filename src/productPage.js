import PrimarySearchAppBar from './appBar';
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
import {useLocation} from "react-router-dom";
import firebase from './firebase';
import "firebase/auth";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection:'row',
    top:0,
    alignItems:"flex-start",
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
    const [snack,setSnack] = React.useState(false);
    const [snackMessage,setSnackMessage] = React.useState("");
    const [snackSeverity,setSnackSeverity] = React.useState("success")
    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        //console.log("setSnack")
        setSnack(false);
    };
    var location = useLocation();
    const [uid,setUid] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

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
        setData(tempData);
        return tempData;
      }).catch(err=>{
        console.log("something went wrong!",err);
        setRefreshing(false);
        return [];
      });
    }

    const constructor = ()=>{
        if(constructorFlag === 0){

            setConstructorFlag(1);
            //getMetaData();
            getData();
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
            .then(data => console.log(data,"recieved"))
            .finally(()=>{
                setSnack(true);
                setSnackMessage("product added Successfully!");
                setSnackSeverity("success");
            })

            
        }
        catch(err){
            setSnack(true);
            setSnackMessage("Something went wront!");
            setSnackSeverity("info");
        }
    }

    const changeSrc = (src)=>()=>{
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
                                            <img className={classes.img} alt="loading"  src={urlArr[0]} />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall} onClick={changeSrc(urlArr[1])}>
                                            <img className={classes.img} alt="loading" src={urlArr[1]} />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall} onClick={changeSrc(urlArr[2])}>
                                            <img className={classes.img} alt="loading" src={urlArr[2]} />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                            </Grid>
                            <div className={classes.paper2} style={{height:"100%",}}>
                                    <ButtonBase  className={classes.image}>
                                        <img className={classes.img2} alt="loading" id="mainImg" src={imgSrc} />
                                    </ButtonBase >
                            </div>
                        </Grid>
                        <Grid item xs sm container alignItems="center"  >
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
                                        <GolfCourseIcon />   {inStock>10?"In Stock":inStock === 0?"Sold Out":"Hurry up,Only few left"}
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