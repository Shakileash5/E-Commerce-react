import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
   root: {
    maxWidth: 345,
    minHeight:500,
    margin:10
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
 
 
}));

function MiniCard({name,price,image}) {
    const classes = useStyles();
    return (
        <div className="App">
            <Grid item >
                <Card className={classes.root}>
                    <CardActionArea>
                        <img
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image={image}
                        src={image}
                        style={{padding:10}}
                        resizeMode="cover"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={{padding:10}}>
                            {name}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Typography variant="body2" color="textSecondary" component="span" style={{margin:10}}>
                            Price: {price}
                        </Typography>
                    </CardActions>
                </Card>
            </Grid>
            
        </div>
    );
    }

export default MiniCard;