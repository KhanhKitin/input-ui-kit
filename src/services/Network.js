import axios from 'axios';

const domain = ""

const getHeader = () => {
  		return {
  			headers: {
  			 'Access-Control-Allow-Headers': 'Content-Type',
  			 'Access-Control-Allow-Methods': 'POST',
  			 "Content-Type": "application/json",
  			 'Access-Control-Allow-Origin': '*',  }
  			}
  	}
const getHeaderUpload = () => {
  		return {
  			headers: {
  			 'Access-Control-Allow-Headers': 'Content-Type',
  			 'Access-Control-Allow-Methods': 'POST',
  			 "Content-Type": "application/json",
  			 'Access-Control-Allow-Origin': '*',
  			 'ParentCode':"HDI_UPLOAD",
  			 'UserName':"ADMIN_UPLOAD_B2B2C",
  			 'Secret':"HDI_UPLOAD_198282911FASE1239212",
  			 'environment':"LIVE",
  			 'DeviceEnvironment':"WEB",
  			 'ActionCode':"UPLOAD_VIETJET",
  			  }
  			}
  	}
const post = (url, params) => {
		return new Promise((resolve, rejected)=>{
		 	axios.post(domain+url, params, getHeader()).then(function (response) {
		    	return resolve(response.data)
			  })
			  .catch(function (error) {
			  	 return rejected(error)
			})
		 })
	  }

const upload = (formdata) => {
		return new Promise((resolve, rejected)=>{
		 	axios.post("https://dev-hyperservices.hdinsurance.com.vn/upload", formdata, getHeaderUpload()).then(function (response) {
		    	return resolve(response.data)
			  })
			  .catch(function (error) {
			  	 return rejected(error)
			})
		 })
}


const get = (url, host = null) => {
		return new Promise((resolve, rejected)=>{
			var curl = "";
			if(host){
				curl = host+url
			}else{
				curl = domain+url
			}
			axios.get(curl).then(function (response) {
	 			return resolve(response.data)
			  })
			  .catch(function (error) {
			   return rejected(error)
			})
		})
	  }

const del = (url) => {
	 	return new Promise((resolve, rejected)=>{
		 	axios.delete(domain+url).then(function (response) {
		 		return resolve(response.data)
			}).catch(function (error) {
			     return rejected(error)
			})
		})
	  }



export default {
	post,
	get,
	del,
	upload
}
