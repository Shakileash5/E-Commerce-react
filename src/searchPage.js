import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import PrimarySearchAppBar from './components/appBar';
import MiniCard from "./components/miniCard";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
        { key: 5, label: 'Angular' },
        { key: 6, label: 'jQuery' },
     
    ]);
    
    const navigateTo = (flag)=>()=>{
        //history.push("/product");
        if( flag == 1){
            history.push("/product");
        }

        console.log("clicked")
    };


    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
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
            <div style={{justify:"center",alignSelf:"center",margin: 20}}>
            <Grid container >
                <div onClick={navigateTo(1)}>
                    <MiniCard  />
                </div>
                
                <MiniCard />
                <MiniCard />
                <MiniCard />
                <MiniCard />
                <MiniCard />
                <MiniCard />
            </Grid>
            
            </div>
        </div>
    );
    }

export default Search;