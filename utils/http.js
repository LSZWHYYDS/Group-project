import axios from './index1';
import url from './base'

var baseURL = url
// var baseURL = process.env.BASE_URL

export const post = function(url, params) {
	return axios.post(baseURL + url, params)
		.then((response) => {
			
			return response;
		})
		.catch((error) => {
			
			// console.log(error)
			return error;
		})
}

export const put = function(url, params) {
	return axios.put(baseURL + url, params)
		.then((response) => {

			return response;
		})
		.catch((error) => {

			return error;
		})
}


export const get = function(url, params) {
	return axios.get(baseURL + url, params)
		.then((response) => {

			return response;
		})
		.catch((error) => {

			return error;
		})
}
