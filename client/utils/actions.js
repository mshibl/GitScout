import { action, autorun } from 'mobx';
import fetch from 'isomorphic-fetch'
import store from './store'

const verfiyUsername = action((username, mainUser = false) => {
	fetch('https://api.github.com/users/'+username)
		.then(res => res.json())
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

const fetchRepos = action((numOfRepos)=>{
	const {login} = store.mainUser.userInfo
	let numOfPages = Math.ceil(numOfRepos/30)
	for(var pageNum=1; pageNum<=numOfPages; pageNum++){
		fetch('https://api.github.com/users/'+login+'/repos?page='+pageNum)
			.then(res => res.json())
			.then(repos => {
				store.mainUser.repos = store.mainUser.repos.concat(repos)
				// if (pageNum < numOfPages) { fetchRepos(numOfPages, pageNum + 1) }
			})
	}
})

const updateRepos = autorun(() => fetchRepos(store.mainUser.userInfo.public_repos))

// const fetchRepos = autorun(()=>{
// 	console.log('autorun triggered')
// 	if(store.mainUser.userInfo){
// 		const {public_repos} = store.mainUser.userInfo
// 		let numOfPages = Math.ceil(public_repos/30)
// 		console.log(numOfPages)
// 	}
// })

const actions = {
	verfiyUsername,
	fetchRepos
}

export default actions