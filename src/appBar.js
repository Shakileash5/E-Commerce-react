import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import { useHistory } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Asynchronous from "./searchbar";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from './firebase';
import "firebase/auth";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const theme = createMuiTheme({
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
  },
 
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
   paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius:15,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLoggedIn,setIsLogged] = React.useState(0);
  const [error,setError] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [constructorHasRun,setConstructorHasRun] = React.useState(false);
  const [snack,setSnack] = React.useState(0);
  const [snackMessage,setSnackMessage] = React.useState("");
  const [snackSeverity,setSnackSeverity] = React.useState("success")
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log("setSnack")
    setSnack(0);
  };
  const [values, setValues] = React.useState({
    userName: '',
    password: '',
    email: '',
    weightRange: '',
    showPassword: false,
  });
  const [isLoading, setLoading] = React.useState(false);
  const [screen,setScreen] = React.useState(0);
  const [uid,setUid] = React.useState('');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpen = () => {
    setOpen(true);
    setScreen(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signInPress = ()=>()=>{
    if(values.email!="" && values.password!=""){
            setOpen(false);
            setRefreshing(true);
            firebase.auth().signInWithEmailAndPassword(values.email,values.password).then((response)=>{
                const uid = response.user.uid;
                console.log(uid,":: uid");
                //navigation1.navigate('MyTabs',{userId:uid.toString()});
                setSnack(1);
                setSnackMessage("SignedIn successfully!");
                setSnackSeverity("success");
                setUid(uid.toString());
            }).catch(err =>{
                console.log("err",err);
                setError(1);
                setSnack(1);
                setSnackMessage("Please enter Valid Data!");
                setSnackSeverity("error");
            }).finally(()=>{
                setRefreshing(false);
                setOpen(false);
            });
        }
        else{
            setSnack(1);
            setSnackMessage("Please enter Valid Data!");
            setSnackSeverity("error");
            setOpen(false);
        }
  }

  const signupPress = ()=>()=>{
        console.log("signUp")
        if(values.userName!='' && values.password!=''){
            setOpen(false);
            setRefreshing(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then((response) => {
                    const uid = response.user.uid;
                    console.log("uid ::: ",uid);
                    setUid(uid.toString());
                    setSnack(1);
                    setSnackMessage("Signed up successfully");
                    setSnackSeverity("success");
                   // navigation1.navigate("Login")
                }).catch(err =>{
                     console.log("err",err);
                     setError(1);
                     setSnack(1);
                     setSnackMessage("Please enter Valid Data!");
                     setSnackSeverity("error");
                     //setErrorMessage(err.message); 
                }).finally(()=>{
                    setRefreshing(false);
                    setOpen(false);
                });
        }
        else{
            setError(1);
            setSnack(1);
            setSnackMessage("Please enter Valid Data!");
            setSnackSeverity("error");
            //setErrorMessage("Enter userName and password");
            setOpen(false);
        }
    }
  
  const logOut = ()=>()=>{
      //console.log("Logged out");
      try{
        firebase.auth().signOut();
        console.log("logged Out")
        setIsLogged(0);
        setOpen(false);
        setSnack(1);
        setSnackMessage("logged Out Succesfully!")
      }
      catch(err){
        console.log("Error",err)
      }
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
    {
      screen==0?
        <div>
        <h2 id="simple-modal-title">SignIn</h2>
        <Grid container direction={"row"}>
          <Grid item>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            
            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                id="standard-adornment-email"
                type={'text'}
                value={values.email}
                onChange={handleChange('email')}
              />
          </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={clsx(classes.margin, classes.textField)}>
            
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
          </Grid>
        </Grid>
            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{marginTop:10}}
            onClick={signInPress()}
            >
            signIn
        </Button>
        <Typography variant="body1">
          haven't signed Up yet?<Typography variant="body1" color="secondary" onClick={()=>{setScreen(1)}}>
          signup
        </Typography>
        </Typography>
        </div>
        :
        <div>
        <h2 id="simple-modal-title">SignUp</h2>
        <Grid container direction={"row"}>
          <Grid item>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            
            <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                id="standard-adornment-email"
                type={'text'}
                value={values.email}
                onChange={handleChange('email')}
              />
          </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={clsx(classes.margin, classes.textField)}>
            
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
          </FormControl>
          </Grid>
        </Grid>
            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{marginTop:10}}
            onClick={signupPress()}
            >
            signUp
        </Button>
        <Typography variant="body1">
          Already signed in?
          <Typography variant="body1" color="secondary" onClick={()=>{setScreen(0)}}>
            signIn
          </Typography>
        </Typography>
      
        </div>
        }
        
    </div>
  );

  const navigateTo = (flag)=>()=>{
    if(flag == 1){
      history.push("/cart")
    }
    else if(flag == 0){
      history.push("/")

    }
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        isLoggedIn?
        <MenuItem onClick={logOut()}>LogOut</MenuItem>
        :
        <MenuItem onClick={handleOpen}>SignIn</MenuItem>
      }


    </Menu>
  );

  const constructor = ()=>{
        if(constructorHasRun){
            return;
        }
        console.log("act like constructor");
        //retrieveData();
        //setRefreshing(true);
        firebase.auth().onAuthStateChanged(user =>{
            //console.log(user,"pakalam pa");
            if(user){
                //navigation1.navigate('MyTabs',{userId:user.uid.toString()});
                setUid(user.uid.toString());
                setIsLogged(1)
            }
            //setRefreshing(false);
        })
        setConstructorHasRun(true);
    }
    constructor();
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
    <ThemeProvider theme={theme}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap onClick={navigateTo(0)}>
            WEB-FX
          </Typography>
          <Asynchronous/>   
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit" onClick={navigateTo(1)}>
              <Badge badgeContent={17} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      {renderMobileMenu}
      {renderMenu}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Backdrop className={classes.backdrop} open={refreshing} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={snack} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert  severity={snackSeverity} onClose={handleSnackClose}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
