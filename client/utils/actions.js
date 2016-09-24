import { action, autorun, map } from 'mobx';
import fetch from 'isomorphic-fetch'
import store from './store'
import { browserHistory } from 'react-router'

const isProduction = window.location.hostname != "localhost"
const apiUrl = "http://" + (isProduction? window.location.hostname : 'localhost:3000') + '/github_api'


const loadUserProfile = action((username)=>{
	verfiyUsername(username)
		.then(userData => {
			if(userData.message == "Not Found"){
				store.errorMessage = "No Such User on Github!"
			} else {
				store.mainUser.username = username
				store.mainUser.userInfo = userData
				store.mainUser.loaded = true
				browserHistory.push('/user/'+username)
			}
		})
})

const verfiyUsername = (username) => {
	return(
		fetch(apiUrl+'?endpoint=/users/'+username)
			.then(res => res.json())
	)
}

const fetchRepos = action((numOfPages, pageNum = 1)=>{
	let username = store.mainUser.userInfo.login
	if(username){
		fetch(apiUrl+'?endpoint=/users/'+username+'/repos?page='+pageNum)
			.then(res => res.json())
			.then(repos => {
				store.mainUser.repos = store.mainUser.repos.concat(repos)
				pageNum < numOfPages ? fetchRepos(numOfPages, pageNum + 1) : analyzeRepos()
			})
	}
})

// automatically load user's repos once user's info is loaded
const updateRepos = autorun(() => {
	let numOfPages = Math.ceil(store.mainUser.userInfo.public_repos/30)
	fetchRepos(numOfPages)
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

		fetch(apiUrl+'?endpoint=/repos/'+login+'/'+repo.name+'/languages')
			.then(res => res.json())
			.then(languages => {
					for(var language in languages){
						let value = languagesMap.get(language) || 0
						languagesMap.set(language, languages[language] + value)
					}
			})
			.then(() => {if(index == repos.length-1){store.mainUser.languages = languagesMap}} )
	})

	store.mainUser.counts = {
		followers: store.mainUser.userInfo.followers, 
		following:  store.mainUser.userInfo.following,
		public_repos: repos.length,
		starsCount: starsCount, 
		forksCount: forksCount, 
		watchersCount: watchersCount, 
		openIssuesCount: openIssuesCount, 
		loaded: true
	}
})

const actions = {
	loadUserProfile,
	verfiyUsername,
	fetchRepos
}

export default actions