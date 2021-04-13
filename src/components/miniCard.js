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

const useStyles = makeStyles((theme) => ({
   root: {
    maxWidth: 345,
    margin:10
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
 
 
}));

function MiniCard() {
    const classes = useStyles();
    return (
        <div className="App">
            <Grid item xs>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcc1K6-WPl6yl84xsY7rROhOMznnJ0FS9gew&usqp=CAU"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Flat 32 Inch Tv Samsumg
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Price: 24200
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            
        </div>
    );
    }

export default MiniCard;