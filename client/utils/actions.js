import { action, autorun } from 'mobx';
import fetch from 'isomorphic-fetch'
import store from './store'

const verfiyUsername = action((username, mainUser = false) => {
	fetch('https://api.github.com/users/'+username)
		.then(res => {
			return res.json()
		})
		.then(data => {
			if(data.message == "Not Found"){
				console.log("error")
			} else {
				if(mainUser){
					store.mainUser.username = username
					store.mainUser.userInfo = data
					store.mainUser.verified = "verified"
				} else {
					store.users.set(username, {userInfo: data})
				}
			}
		})
})

const fetchRepos = action((username, numOfRepos)=>{
	fetch('https://api.github.com/users/'+username+'/repos')
		// .then( res =>
		// )
})

const actions = {
	verfiyUsername,
	fetchRepos
}

export default actions