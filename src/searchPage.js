import PrimarySearchAppBar from './appBar';
import MiniCard from "./components/miniCard";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
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
        //history.push("/product");
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
    );
    }

export default Search;