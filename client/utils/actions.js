import { action, autorun, map } from 'mobx';
import fetch from 'isomorphic-fetch'
import store from './store'

const authenticate = action((value)=> {
	console.log('opening new window')
	window.open("https://github.com/login/oauth/authorize?client_id=18b7b3dea60d09eaacc7&state="+value,'_self');
})

const verfiyUsername = action((username, mainUser = false) => {
	fetch('https://api.github.com/users/'+username, {
		headers: {
			"Authorization": "token "+sessionStorage.getItem("github_token")
		}
	})
		.then(res => res.json())
		.then(data => {
			if(data.message == "Not Found"){
				// TODO: handle error / notify user of wrong input
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


const analyzeRepos = action(()=>{
	const {login} = store.mainUser.userInfo
	const {repos} = store.mainUser
	let languagesMap = map()
	let starsCount = 0, forksCount = 0, watchersCount = 0, openIssuesCount = 0

	repos.slice().forEach((repo, index) => {
		starsCount += repo.stargazers_count;
		forksCount += repo.forks_count;
		watchersCount += repo.watchers_count;
		openIssuesCount += repo.open_issues_count;

		fetch('https://api.github.com/repos/'+login+'/'+repo.name+'/languages', {
			headers: {
				"Authorization": "token "+sessionStorage.getItem("github_token")
			}
		})
			.then(res => res.json())
			.then(languages => {
					for(var language in languages){
						let value = languagesMap.get(language) || 0
						languagesMap.set(language, languages[language] + value)
					}
			})
			.then(() => {if(index == repos.length-1){store.mainUser.languages = languagesMap}} )
	})

	store.mainUser.counts = {starsCount: starsCount, forksCount: forksCount, watchersCount: watchersCount, openIssuesCount: openIssuesCount, loaded: true}
})



const fetchRepos = action((numOfPages, pageNum = 1)=>{
	const {login} = store.mainUser.userInfo
	if(login){
		fetch('https://api.github.com/users/'+login+'/repos?page='+pageNum, {
			headers: {
				"Authorization": "token "+sessionStorage.getItem("github_token")
			}
		})
			.then(res => res.json())
			.then(repos => {
				store.mainUser.repos = store.mainUser.repos.concat(repos)
				pageNum < numOfPages ? fetchRepos(numOfPages, pageNum + 1) : analyzeRepos()
			})
	}
})


const updateRepos = autorun(() => {
	let numOfPages = Math.ceil(store.mainUser.userInfo.public_repos/30)
	fetchRepos(numOfPages)
})

const actions = {
	authenticate,
	verfiyUsername,
	fetchRepos
}

export default actions