import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PrimarySearchAppBar from './appBar';
import MiniCard from "./components/miniCard";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import blue from '@material-ui/core/colors/blue';
import { useHistory } from 'react-router';
import firebase from './firebase';
import "firebase/auth";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    backgroundColor:"#F6F6F7",
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
      padding:20,
      borderRadius:10,
      margin:10,
      backgroundColor:"white"}
}));

function Cart() {
    const classes = useStyles();
    const history = useHistory();
    const [totalQuantity,setTotalQuantity] = React.useState(0);
    const [totalPrice,setTotalPrice] = React.useState(0);
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const [imgSrc,setImgSrc] = React.useState("https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg");
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
        { key: 5, label: 'Angular' },
        { key: 6, label: 'jQuery' },
     
    ]);

    const [data,setData] = React.useState([]);
    const [viewData,setViewData] = React.useState([]);
    const [uid,setUid] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const getSummary = (datas)=>{
        let quantity = 0;
        let price = 0;
        
        datas.forEach(element => {
            price = price+element.Price;
            console.log(price,element,element.Price)
            quantity = quantity+1
        });
        console.log(price)
        setTotalPrice(price);
        setTotalQuantity(quantity);
    }

    const checkStatus = ()=>()=>{
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

    const constructor = ()=>{
        if(constructorFlag == 0){

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
            checkStatus();
            setData(tempData);
            getSummary(tempData);
            //setViewData(tempData);

        }
    }

    const deleteData = (id)=>()=>{
        console.log("deleted");
        let tempData = data.slice();
        tempData.splice(id,1);
        getSummary(tempData);
        setData(tempData);
    }

    const navigateTo = (flag)=>()=>{
        //history.push("/product");
        if( flag>=0){
            history.push("/product/"+flag);
        }

        console.log("clicked")
    };


    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    constructor();
    return (
        <div className="App" className={classes.root}>
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
                        key={data.key}
                        className={classes.chip}
                        variant="outlined"
                        color="primary"
                        />
                    </li>
                    );
                })}
            </Paper>
            <Typography align="left" variant="h4" style={{margin:20}}>
                My Cart
            </ Typography>
            <Grid container direction="row" spacing={1} alignItems="flex-start" className={classes.contentList} >
                <Grid item  alignItems="flex-start"  >
                    {   data.map((datas,i)=>{
                            return(
                            <Grid key={i} item sm container >
                                <div  className={classes.items}>
                                    <Grid container spacing={5} >
                                        <div className={classes.paper2} onClick={navigateTo(i)}>
                                                    
                                            <img className={classes.img} id="mainImg" src={imgSrc} />
                                                    
                                        </div>
                                        <Grid item xs sm container alignItems="flex-start">
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
                                                        {datas.Price}
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
                                    color="primary"
                                    className={classes.button}
                                    >
                                    Place Order
                                </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={refreshing} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
    }

export default Cart;