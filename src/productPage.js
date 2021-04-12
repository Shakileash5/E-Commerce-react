import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
    padding: theme.spacing(3),
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
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    alignItems:"flex-start"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


function Product() {
    const classes = useStyles();
    
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
        { key: 5, label: 'Angular' },
        { key: 6, label: 'jQuery' },
     
    ]);
    
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
            <div className={classes.root}>
                <div className={classes.paper}>
                    <Grid container spacing={8}>
                        
                        <Grid item xs container direction="row">
                            <Grid item xs container direction="column" spacing={2} alignItems="flex-start">
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall}>
                                            <img className={classes.img}  src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall}>
                                            <img className={classes.img}  src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paper2}>
                                        <ButtonBase  className={classes.imageSmall}>
                                            <img className={classes.img}  src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" />
                                        </ButtonBase >
                                    </Paper>
                                </Grid>
                            </Grid>
                            <div className={classes.paper2}>
                                    <ButtonBase  className={classes.image}>
                                        <img className={classes.img}  src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" />
                                    </ButtonBase >
                            </div>
                        </Grid>
                        <Grid item xs={15} sm container alignItems="center">
                            <Grid item xs container direction="column" spacing={2} alignItems="flex-start">
                                <Typography gutterBottom variant="h4">
                                    Royal pipes 3Mg 45G total quality
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