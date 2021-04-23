import PrimarySearchAppBar from './appBar';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router';
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
    flex:1,
    direction:"row",
    justifyContent:"center",
    height:"100%",
    backgroundColor:"white",
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
    alignItems:"flex-start",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  contentList:{
    justify:"center",
    width:"90%",
    margin:20,
    flex:1,
    borderWidth:1,
    borderRadius:15,
    boxShadow: "2px 2px 3px 2px #9E9E9E",
    padding:20,
    //backgroundColor:"#F6F6F7",
    backgroundColor:"#F1F3F4"
  },
  paper2: {
    margin: 'auto',
    padding:10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius:15,
    borderWidth:1,

  },
  imageSmall: {
    width: 100,
    height: 100,
    borderRadius:1,
    borderWidth:1,
    margin:5

  },
  img: {
    margin: '10',
    display: 'block',
    maxWidth: 250,
    maxHeight: 250,
    borderRadius:5,
  },
  items:{
      //boxShadow: "2px 3px 2px 2px #9E9E9E",
      height:"100%",
      minWidth:700,
      padding:20,
      borderRadius:10,
      margin:10,
      backgroundColor:"white"
    }
}));

function Cart() {
    const classes = useStyles();
    const history = useHistory();
    const [totalQuantity,setTotalQuantity] = React.useState(0);
    const [totalPrice,setTotalPrice] = React.useState(0);
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const [snack,setSnack] = React.useState(false);
    const [snackMessage,setSnackMessage] = React.useState("");
    const [snackSeverity,setSnackSeverity] = React.useState("success");
    const [data,setData] = React.useState([]);
    const [orderData,setOrderData] = React.useState([]);
    var orderRequests = [];
    const [uid,setUid] = React.useState('');
    var userId = "";
    const [refreshing, setRefreshing] = React.useState(false);
    const orderStatus = {
        0:["Waiting","orange"],
        1:["Accepted","green"],
        2:["Rejected","red"]
    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        //console.log("setSnack")
        setSnack(false);
    };
    const getSummary = (datas)=>{
        let quantity = 0;
        let price = 0;
        
        datas.forEach(element => {
            //console.log(element.price)
            let tempPrice = element.price;
            //console.log(tempPrice)
            tempPrice = parseInt(tempPrice)
            price = price+tempPrice;
            //console.log(price,element,element.price)
            quantity = quantity+1
        });
        //console.log(price)
        setTotalPrice(price);
        setTotalQuantity(quantity);
    }

    const checkStatus = ()=>{
        setRefreshing(true);
        firebase.auth().onAuthStateChanged(user =>{
            //console.log(user,"pakalam pa");
            if(user){
                //navigation1.navigate('MyTabs',{userId:user.uid.toString()});
                setUid(user.uid.toString());
                setUid(user.uid.toString());
                userId = user.uid.toString();
                //console.log(user.uid.toString(),"dfghj",uid,userId)
                getData();
                getOrders();
            }
            setRefreshing(false);
        })
    }

    const getData = ()=>{
            
            fetch("http://127.0.0.1:8000/getCart/?uid="+userId).then((response)=>{
                //console.log(response)
                return response.json()
            }).then((response)=>{
                let products = response.result;
                console.log("products",products);
                if(products==null){
                    products=[]
                }
                else{
                    products.map((val)=>{
                        if(typeof(val.price)=="string"){
                            let tempP = val.price.split(",");
                            tempP = parseInt(tempP.join(""))
                            val.price = tempP;
                        }
                        return null
                    });
                }
                setData(products);
                getSummary(products);
            }).catch(err=>{
                console.log("something went wrong!",err);
            });


    }


    const getOrders = ()=>{
        console.log(userId,"getOrders")
        fetch("http://127.0.0.1:8000/getUserOrders/?uid="+userId).then((response)=>{
                //console.log(response)
                return response.json()
            }).then((response)=>{
                let orders = response.result;
                console.log("orders",orders);
                if(orderData==null){
                    setOrderData([]);
                    setOrderData([]);
                }
                else{
                    setOrderData(orders);
                    orderRequests = orders;
                }
                console.log(orderRequests,"ordredata")
                
            }).catch(err=>{
                console.log("something went wrong!",err);
            });
    }   

    const placeOrderDb = ()=>()=>{
        try{
            const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({userId:uid})
                };
            fetch('http://127.0.0.1:8000/orderProducts/', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data,"recieved")
                let orders = data.result;
                console.log(orders)
                setOrderData(orders);
                setData([]);
                getSummary([]);
                }).finally(()=>{
                    setSnack(true);
                    setSnackMessage("product Ordered Successfully!");
                    setSnackSeverity("success");
                })

            
        }
        catch(err){
            setSnack(true);
            setSnackMessage("Something went wront!");
            setSnackSeverity("info");
        }
    }

    const constructor = ()=>{
        if(constructorFlag === 0){

            let tempData = [
                {
                    key:1, name: "Smart 12 Inch tv samsung", Price: 26900
                },
                {
                    key:2, name: "Smart 12 Inch tv samsung", Price: 26900
                },
            ]
            console.log("working");
            setConstructorFlag(1);
            getSummary(tempData);
            checkStatus();
        }
    }

    const deleteData = (id)=>()=>{
        //console.log("deleted");
        let tempData = data.slice();
        tempData.splice(id,1);
        getSummary(tempData);
        setData(tempData);
        try{
            const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: tempData,userId:uid})
                };
            fetch('http://127.0.0.1:8000/addToCart/', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data,"recieved"))
            .finally(()=>{
                setSnack(true);
                setSnackMessage("product deleted Successfully!");
                setSnackSeverity("warning");
            })

        }
        catch(err){
            setSnack(true);
            setSnackMessage("Something went wront!");
            setSnackSeverity("info");
        }
    }

    const navigateTo = (flag)=>()=>{
        //history.push("/product");
        if( flag>=0){
            history.push("/product/"+flag);
        }

        //console.log("clicked")
    };

    constructor();
    return (
        <div className={classes.root}>
            <PrimarySearchAppBar />
            <Backdrop className={classes.backdrop} open={refreshing} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Typography align="left" variant="h4" style={{margin:20}}>
                My Cart
            </ Typography>
            <Grid container direction="row" spacing={1} alignItems="flex-start" className={classes.contentList} >
                <Grid item  alignItems="flex-start" style={{width:700,marginRight:10}} >
                    {   data.map((datas,i)=>{
                            return(
                            <Grid key={i} item sm container >
                                <div  className={classes.items}>
                                    <Grid container spacing={5} >
                                        <div className={classes.paper2} onClick={navigateTo(i)}>
                                                    
                                            <img className={classes.img} alt="loading" id="mainImg" src={datas.img_1} />
                                                    
                                        </div>
                                        <Grid item  sm container alignItems="flex-start">
                                            <Grid item xs container direction="column"  alignItems="flex-start">
                                                <Typography gutterBottom variant="h6" align="left">
                                                    {datas.name}
                                                </Typography>

                                                <Chip label={datas.category} color="primary" />

                                                <Grid item container direction="row"  alignItems="center">
                                                    <Typography gutterBottom variant="subtitle1">
                                                        Price:
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6">
                                                        {datas.price}
                                                    </Typography>
                                                    <IconButton color="secondary" aria-label="upload picture" component="span" onClick={deleteData(i)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>)
                            } 
                        )     
                    }
            
                </Grid>
                
                {   
                data.length>=1?
                <Grid item style={{backgroundColor:"white",borderRadius:10,margin:15,padding:10,width:400}}  >
                    <Typography align="left" variant="h5" style={{marginBottom:20}}>
                        Payment Details
                    </Typography>
                    <Grid item>
                        <Typography align="left" variant="body1">
                            Total Items : {totalQuantity}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography align="left" variant="body1">
                            Total Amount : {totalPrice}
                        </Typography>
                    </Grid>
                    <Grid item style={{margin:10}}>
                        <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={placeOrderDb()}
                                    >
                                    Place order
                        </Button>
                    </Grid>
                </Grid>:
                <Typography align="left">
                    No items
                </Typography>
                }
                
            </Grid>

            <Typography align="left" variant="h4" style={{margin:20}}>
                My Orders
            </ Typography>
            <Grid container direction="row" spacing={1} alignItems="flex-start" className={classes.contentList} >
                <Grid item  alignItems="flex-start" style={{width:700}} >
                    {   //console.log("update",orderRequests)
                        orderData!=null?
                        orderData.map((datas,i)=>{
                            console.log("update",orderData);
                            return( 
                            <Grid key={i} item sm container  >
                                <div  className={classes.items}>
                                    <Grid container spacing={5} >
                                        <div className={classes.paper2} onClick={navigateTo(datas.key)}>
                                                    
                                            <img className={classes.img} alt="loading" id="mainImg" src={datas.img_1} />
                                                    
                                        </div>
                                        <Grid item  sm container alignItems="flex-start">
                                            <Grid item xs container direction="column"  alignItems="flex-start">
                                                <Typography gutterBottom variant="h6" align="left">
                                                    {datas.name}
                                                </Typography>

                                                <Chip label={datas.category} color="primary" />

                                                <Grid item container direction="row"  alignItems="center">
                                                    <Typography gutterBottom variant="subtitle1">
                                                        Price:
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6">
                                                        {datas.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid container direction="row">
                                                    <Grid item>
                                                        <p >
                                                            Status:  
                                                        </p>
                                                    </Grid>
                                                    <Grid item style={{backgroundColor:orderStatus[datas.status][1],borderRadius:5,height:25,margin:5,paddingLeft:6,paddingRight:6}}>
                                                        <p style={{color:"white"}}>
                                                           {orderStatus[datas.status][0]}
                                                        </p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>) 
                            } 
                        ):
                            <Typography align="left">
                                No Orders
                            </Typography>
                        
                    }
            
                </Grid>
            </Grid>
            <Snackbar open={snack} autoHideDuration={2000} onClose={handleSnackClose}>
                <Alert  severity={snackSeverity} onClose={handleSnackClose}>
                {snackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
    }

export default Cart;