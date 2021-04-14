import PrimarySearchAppBar from './components/appBar';
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
    maxHeight: "100%"
  },
  image: {
    width: 500,
    height: 500,
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
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius:1,
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
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const [imgSrc,setImgSrc] = React.useState("https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg");
    const [id,setId] = React.useState(-1);
    var idTemp = -1;
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
        { key: 5, label: 'Angular' },
        { key: 6, label: 'jQuery' },
     
    ]);
    var location = useLocation();

    const getMetaData = ()=>{
        console.log(location);
        let splitData = location.pathname.split("/");
        setId(parseInt(splitData[splitData.length-1]));
        idTemp = parseInt(splitData[splitData.length-1]);
        console.log(id,splitData,parseInt(splitData[splitData.length-1]))
    }

    const constructor = ()=>{
        if(constructorFlag == 0){

            let tempData = [
                {
                    key:1, name: "Smart 12 Inch tv samsung", Price: 26900, 
                    src1:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8P-nx0FswkMiwW5wCA5hZcPG1H5kG57DAyg&usqp=CAU",
                    src2:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHEGYXv30RbfDIllC4j7rrx6XeHFCcd_LPKQ&usqp=CAU",
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
            setData(tempData[idTemp]);
            console.log(idTemp,tempData,"data")
            setImgSrc(tempData[idTemp].src1);
            
            console.log(data,tempData)  
            let arr = [tempData[idTemp].src1,tempData[idTemp].src2,tempData[idTemp].src3];
            setUrlArr(arr)
            //setViewData(tempData);

        }
    }

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    const changeSrc = (src)=>()=>{
        console.log("src changed");
        var url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRQ2QicbufytX1bTxF3xcQUBKpLoaSWb9dEA&usqp=CAU";
        setImgSrc(src)
    }

    constructor();

    return (
        <div className="App">
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
                            <div className={classes.paper2}>
                                    <ButtonBase  className={classes.image}>
                                        <img className={classes.img} id="mainImg" src={imgSrc} />
                                    </ButtonBase >
                            </div>
                        </Grid>
                        <Grid item xs sm container alignItems="center">
                            <Grid item xs container direction="column" spacing={2} alignItems="flex-start">
                                <Typography gutterBottom variant="h4">
                                    {data.name}
                                </Typography>

                                <Chip label="Pipes" color="primary" />

                                <Grid item container direction="row" spacing={2} alignItems="center">
                                    <Typography gutterBottom variant="subtitle1">
                                        Price:
                                    </Typography>
                                    <Typography gutterBottom variant="h6">
                                        5600
                                    </Typography>
                                </Grid>
                                <Typography gutterBottom variant="subtitle1">
                                        Inclusive of all Taxes
                                </Typography>
                                <Typography gutterBottom variant="h6" style={{ color: green[500] }}>
                                        <GolfCourseIcon />   In Stock
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<AddShoppingCartIcon />}
                                    >
                                    Add to cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Product;