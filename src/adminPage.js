import PrimarySearchAppBar from './appBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { useHistory } from 'react-router';
import firebase from './firebase';
import "firebase/auth";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

function Admin() {
    const classes = useStyles();
    const history = useHistory();
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const [snack,setSnack] = React.useState(false);
    const [snackMessage,setSnackMessage] = React.useState("");
    const [snackSeverity,setSnackSeverity] = React.useState("success");
    const [data,setData] = React.useState([]);
    const [orderData,setOrderData] = React.useState([]);
    const [uid,setUid] = React.useState('');
    var todoOrder = [];
    var userId = "";
    const [refreshing, setRefreshing] = React.useState(false);
    const [state, setState] = React.useState({
        orders: true,
        accepted: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        //console.log("setSnack")
        setSnack(false);
    };

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
                //
                fetch("http://127.0.0.1:8000/isAdmin/?id="+userId).then((response)=>{
                //console.log(response)
                return response.json()
                }).then((response)=>{
                    if(response.result==false){
                        history.push("/");
                    }
                });

                getOrders();
                getData();
            }
            setRefreshing(false);
        })
    }

    const getData = ()=>{
            
            fetch("http://127.0.0.1:8000/getAcceptedData/").then((response)=>{
                return response.json()
            }).then((response)=>{
                console.log(response)
                let acceptData = response.result;
                if(response.status!=200){
                    acceptData = []
                }
                todoOrder = acceptData.slice(0);
                console.log(todoOrder,"acceptedData",acceptData)
            }).catch(err=>{
                console.log("something went wrong!",err);
            }).finally(()=>{
                console.log(todoOrder,"acceptedData")
            })


    }


    const getOrders = ()=>{
        console.log(userId,"getOrders")
        fetch("http://127.0.0.1:8000/getAllOrders/").then((response)=>{
                console.log(response)
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
                }
                
            }).catch(err=>{
                console.log("something went wrong!",err);
            });
    }   

    const acceptData = (idx)=>()=>{
        try{
            const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({userId:uid,acceptData:orderData[idx]})
                };
            fetch('http://127.0.0.1:8000/acceptOrder/', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data,"recieved")
                if(data.status == 200){
                    let orders = data.result[1];
                    console.log(orders)
                    setOrderData(orders);
                }

            }).finally(()=>{
                setSnack(true);
                setSnackMessage("product accepted Successfully!");
                setSnackSeverity("success");
            })            
        }
        catch(err){
            setSnack(true);
            setSnackMessage("Something went wront!");
            setSnackSeverity("info");
        }
    }

    const rejectData = (idx)=>()=>{
        try{
            const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({userId:uid,rejectData:orderData[idx]})
                };
            fetch('http://127.0.0.1:8000/rejectOrder/', requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data,"recieved")
                if(data.status == 200){
                    let orders = data.result;
                    console.log(orders)
                    setOrderData(orders);
                }

            }).finally(()=>{
                setSnack(true);
                setSnackMessage("product Rejected Successfully!");
                setSnackSeverity("warning");
            })            
        }
        catch(err){
            setSnack(true);
            setSnackMessage("Something went wront!");
            setSnackSeverity("info");
        }
    }

    const constructor = ()=>{
        if(constructorFlag == 0){

            console.log("working");
            setConstructorFlag(1);
            checkStatus();
            //setData(tempData);
            
            
            //setViewData(tempData);

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
        <div className="App" className={classes.root}>
            <PrimarySearchAppBar />
            <Backdrop className={classes.backdrop} open={refreshing} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <FormGroup style={{margin:25}}>
                <FormControlLabel
                    control={
                    <Switch
                        checked={state.accepted}
                        onChange={handleChange}
                        name="accepted"
                        color="primary"
                    />
                    }
                    label="See accepted orders"
                />
            </FormGroup>

            {
                state.accepted==true?
                <div>  
                    <Typography align="left" variant="h4" style={{margin:20}}>
                        Accepted Orders
                    </ Typography>
                    <Grid container direction="row" spacing={1} alignItems="flex-start" className={classes.contentList} >
                        <Grid item  alignItems="flex-start" style={{width:700}} >
                            {   
                                todoOrder==[]?
                                todoOrder.map((datas,i)=>{
                                    
                                    return( 
                                    <Grid key={i} item sm container  >
                                        <div  className={classes.items}>
                                            <Grid container spacing={5} >
                                                <div className={classes.paper2} onClick={navigateTo(datas.key)}>
                                                            
                                                    <img className={classes.img} id="mainImg" src={datas.img_1} />
                                                            
                                                </div>
                                                <Grid item  sm container alignItems="flex-start">
                                                    <Grid item xs container direction="column"  alignItems="flex-start">
                                                        <Typography gutterBottom variant="h6" align="left">
                                                            {datas.name}
                                                        </Typography>

                                                        <Chip label="Pipes" color="primary" />

                                                        <Grid item container direction="row"  alignItems="center">
                                                            <Typography gutterBottom variant="subtitle1">
                                                                Price:
                                                            </Typography>
                                                            <Typography gutterBottom variant="h6">
                                                                {datas.price}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid container direction="row" spacing={2}>
                                                            <Grid item>
                                                                <Button
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    className={classes.button}
                                                                    startIcon={<ClearIcon />}
                                                                    onClick={rejectData(i)}
                                                                    >
                                                                    Reject
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    className={classes.button}
                                                                    startIcon={<CheckIcon />}
                                                                    onClick={acceptData(i)}
                                                                    >
                                                                    Accept
                                                                </Button>
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
                                        No Orders{todoOrder}
                                    </Typography>
                                
                            }
                    
                        </Grid>
                    </Grid>
                </div>:
                null
            }




            <Typography align="left" variant="h4" style={{margin:20}}>
                My Orders 
            </ Typography>
            <Grid container direction="row" spacing={1} alignItems="flex-start" className={classes.contentList} >
                <Grid item  alignItems="flex-start" style={{width:700}} >
                    { 
                        orderData!=null?
                        orderData.map((datas,i)=>{
                            console.log("update",orderData);
                            return( 
                            <Grid key={i} item sm container  >
                                <div  className={classes.items}>
                                    <Grid container spacing={5} >
                                        <div className={classes.paper2} onClick={navigateTo(datas.key)}>
                                                    
                                            <img className={classes.img} id="mainImg" src={datas.img_1} />
                                                    
                                        </div>
                                        <Grid item  sm container alignItems="flex-start">
                                            <Grid item xs container direction="column"  alignItems="flex-start">
                                                <Typography gutterBottom variant="h6" align="left">
                                                    {datas.name}
                                                </Typography>

                                                <Chip label="Pipes" color="primary" />

                                                <Grid item container direction="row"  alignItems="center">
                                                    <Typography gutterBottom variant="subtitle1">
                                                        Price:
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6">
                                                        {datas.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid container direction="row" spacing={2}>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            className={classes.button}
                                                            startIcon={<ClearIcon />}
                                                            onClick={rejectData(i)}
                                                            >
                                                            Reject
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.button}
                                                            startIcon={<CheckIcon />}
                                                            onClick={acceptData(i)}
                                                            >
                                                            Accept
                                                        </Button>
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

export default Admin;