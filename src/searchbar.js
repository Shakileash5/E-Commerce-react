import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router';


export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [options, setOptions] = React.useState(["Michael", "Lindsay", "Tobias", "Byron", "George", "Rachel"]);
  const loading = open && options.length === 0;
  const [calledOnce,setCall] = React.useState(0);
  const navigateTo = (flag)=>{
        //history.push("/product");
        //console.log("cebi",flag)
        //history.push("/search");
        if( calledOnce===0 && flag){
            setCall(1);
            history.push("/search/"+flag);

        }
    };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
     //const response = await fetch("http://127.0.0.1:8000/getAllProducts/");
     //await sleep(1e3); // For demo purposes.
      //const countries = await response.json();
      var products = {};
      fetch("http://127.0.0.1:8000/getAllProducts/").then((response)=>{
        //console.log(response)
        return response.json()
      }).then((response)=>{
        products = response;
        //console.log("products",products)
        if (active) {
          //console.log(products.result,"products");
          let arr = [];
          Object.keys(products.result).map((key) => {
                //console.log(key,products.result[key])
                let temp = products.result[key].name.split(" ")
                temp = temp.slice(0,5);
                temp = temp.join(" ");
                arr.push({name:temp});
                return null;
            })
        setOptions(arr);
        //console.log(arr,options)
        }
      }).catch(err=>{
        console.log("something went wrong!",err);
      })
      //active
    
      
      
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  const keyPress = (e)=>{
      if(e.keyCode === 13){
         //console.log('value', e.target.value);
          history.push("/search/"+e.target.value)
         // put the login here
      }
     //navigateTo(e.target.value)
      //
   }

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: "60%",marginLeft:20,backgroundColor:"white",borderRadius:20,height:50,border: '0px solid rgba(0, 0, 0, 0.05)' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => {navigateTo(value.name)}}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onChange={(val)=>{console.log("fewbfui",val);}}
      renderInput={(params) => (
        <TextField
          onKeyDown={(e)=>{keyPress(e)}}
           style={{border: '0px solid rgba(0, 0, 0, 0.05)'}}  
          {...params}
          label="Search"
          variant="outlined"
          
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}