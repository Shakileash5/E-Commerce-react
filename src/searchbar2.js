import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useHistory,  } from 'react-router';
import {BrowserRouter as Router } from "react-router-dom";

const Asynchronous = () => {

const [myOptions, setMyOptions] = useState([])

  const history = useHistory();
const getDataFromAPI = (val) => {
	console.log("Options Fetched from API",val)

	fetch('https://reqres.in/api/users?page=2').then((response) => {
	return response.json()
	}).then((res) => {
	//console.log(res.data)
	for (var i = 0; i < res.data.length; i++) {
		myOptions.push(res.data[i].first_name)
	}
	setMyOptions(myOptions)
	})
    

}

const navigateTo = (flag)=>{
        //history.push("/product");
        console.log("cebi",flag)
        //history.push("/search");
        if( flag){
            history.push("/search/"+flag);
        }
    };

const keyPress = (e)=>{
      if(e.keyCode == 13){
         //console.log('value', e.target.value);
         //navigateTo( e.target.value)
		 let r = "/search/tv"+e.target.value;
        history.push(r);
         // put the login here
      }
     //navigateTo(e.target.value)
      //
   }


return (
	<Autocomplete
        id = {"d2"}
		style={{ width: 500 }}
		freeSolo
		autoComplete
         getOptionSelected={(option, value) => {navigateTo(value.name)}}
		autoHighlight
		options={myOptions}
        onChange={(val)=>{console.log("see what is this",val)}}
		renderInput={(params) => (
		<TextField {...params}
			onChange={(val)=>{getDataFromAPI(val)}}
            onKeyDown={(e)=>{keyPress(e)}}
			label="Search Box"
            variant="outlined"
		/>
		)}
	/>
);
}

export default Asynchronous
