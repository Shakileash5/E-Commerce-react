import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
   root: {
    maxWidth: 345,
    backgroundColor:"#F1F3F4"
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

export const CategorySlider = () => {
  const classes = useStyles();
    const history = useHistory();
    const [constructorFlag,setConstructorFlag] = React.useState(0);
    const dummyData = {
      "TV":[
            {
                "name": "Kodak 80 cm (32 Inches) HD Certified Android LED TV 32HDX7XPRO (Black) (2020 Model)",
                "price": "13,799.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/81nYUryOxUL._SX679_.jpg",
                "key":"001"
            },
            {
                "name": "TCL 108 cm (43 inches) Full HD Certified Android Smart LED TV 43S6500FS (Black) (2020 Model)",
                "price": "25,890.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/81kRcfQZe%2BL._SX679_.jpg",
                "key":"002"
            },
            {
                "name": "Sanyo 108 cm (43 inches) Kaizen Series Full HD Certified Android LED TV XT-43FHD4S (Black) (2020 Model)",
                "price": "22,999.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/81CU76hBEyL._SX679_.jpg",
                "key":"003"
            },
            {
                "name": "Panasonic 100 cm (40 inches) Full HD Android Smart LED TV TH-40HS450DX (Black) (2020 Model)",
                "price": "24,999.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/91auveGcURL._SX679_.jpg",
                "key":"004"
            },
          ],
      "Fridge":[
            {
                "name": "LG 360 L 3 Star Inverter Linear Frost-Free Double Door Refrigerator (GL-T402JDS3, Dazzle Steel, Convertible)",
                "price": "43,190.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/61UTlibhl%2BL._SY741_.jpg",
                "key":"006"
            },
            {
                "name": "AmazonBasics 564 L Side-by-Side Door Refrigerator (Silver Steel Finish)",
                "price": "46,049.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/71DuofqGR8L._SX679_.jpg",
                "key":"007"
            },
            {
                "name": "Samsung 700 L Inverter Frost Free Side-by-Side Refrigerator (RS72R5001M9TL, Gentle Silver Matt, SpaceMax Technology)",
                "price": "71,990.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/61EcvMbH7zL._SY741_.jpg",
                "key":"008"
            },
            {
                "name": "Hisense 411 L 2 Star Inverter Frost-Free Double Door Refrigerator (RT488N4ASB2, Stainless steel)",
                "price": "34,990.00",
                "img_1": "https://images-na.ssl-images-amazon.com/images/I/51pwGjclxqL._SX679_.jpg",
                "key":"009"
               
            },
      ]

    } 
    const [refreshing, setRefreshing] = React.useState(false);
    
    const navigateTo = (flag)=>()=>{
        if( flag >=0){
            history.push("/product/"+flag);
        }
    };

    const constructor = ()=>{
        if(constructorFlag === 0){
            setRefreshing(true);
            setConstructorFlag(1);
            setRefreshing(false);

        }
    }
    //<Exper />
    constructor();
  return(
  
  <div style={{padding:10,
    backgroundColor:"#F1F3F4"}}>
          <Typography variant="h4" component="h3" align="left">
            Top Category
          </Typography>
      <Grid container alignItems="center" style={{margin:0, backgroundColor:""}}>
      <Grid item xs container>
      {
        Object.keys(dummyData).map((category,i)=>{
              return(
                <Grid key={i} container direction="row" style={{borderRadius:15,backgroundColor:"white",marginTop:20,marginBottom:20,}} alignItems="center" >
          <Grid item xs={4} >
            <Typography variant="h2" align="center" style={{margin:15}}>
              {category}
            </Typography>
          </Grid>

          <Grid item  >
            <Grid container direction="column" style={{padding:10,marginTop:10}} spacing={5}> 
              <Grid item container direction="row" onClick={navigateTo(dummyData[category][0].key)}>
                <Grid item>
                    <img style={{height:100,width:150}} alt="loading" src={dummyData[category][0].img_1} />
                </Grid> 
                <Grid item>
                    <Grid container direction="column" alignItems="flex-start" style={{width:250}}>
                      <Grid item>
                        <Typography variant="body2">
                         {dummyData[category][0].name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{padding:10}}>
                            Price : {dummyData[category][0].price}
                        </Typography>
                      </Grid>
                    
                    </Grid>
                </Grid> 
              </Grid>
              <Grid item container direction="row" onClick={navigateTo(dummyData[category][1].key)}>
                <Grid item>
                    <img style={{height:100,width:150}} alt="loading" src={dummyData[category][1].img_1} />
                </Grid> 
                <Grid item>
                    <Grid container direction="column" alignItems="flex-start" style={{width:250}}>
                      <Grid item>
                        <Typography variant="body2">
                          {dummyData[category][1].name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{padding:10}}>
                            Price : {dummyData[category][1].price}
                        </Typography>
                      </Grid>
                    
                    </Grid>
                </Grid> 
              </Grid>

            </Grid>
          </Grid>
          <Grid item >
            <Grid container direction="column" style={{padding:10,marginTop:10}} spacing={5}> 
              <Grid item container direction="row" onClick={navigateTo(dummyData[category][2].key)}>
                <Grid item>
                    <img style={{height:100,width:150}} alt="loading" src={dummyData[category][2].img_1} />
                </Grid> 
                <Grid item>
                    <Grid container direction="column" alignItems="flex-start" style={{width:250}}>
                      <Grid item>
                        <Typography variant="body2">
                          {dummyData[category][2].name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{padding:10}}>
                            Price : {dummyData[category][2].price}
                        </Typography>
                      </Grid>
                    
                    </Grid>
                </Grid> 
              </Grid>
              <Grid item container direction="row" onClick={navigateTo(dummyData[category][3].key)}>
                <Grid item>
                    <img style={{height:100,width:150}} alt="loading" src={dummyData[category][3].img_1} />
                </Grid> 
                <Grid item>
                    <Grid container direction="column" alignItems="flex-start" style={{width:250}}>
                      <Grid item>
                        <Typography variant="body2">
                          {dummyData[category][3].name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{padding:10}}>
                            Price : {dummyData[category][3].price}
                        </Typography>
                      </Grid>
                    
                    </Grid>
                </Grid> 
              </Grid>

            </Grid>
            
            

          </Grid>

        </Grid>

              )
        })
      }
      </Grid>
      </Grid>
      
            <Backdrop className={classes.backdrop} open={refreshing} >
              <CircularProgress color="inherit" />
            </Backdrop>

            
  </div>
   
    
    
)}