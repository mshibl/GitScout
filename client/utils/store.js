import {observable, computed, asStructure, map} from 'mobx';

class AppStore {
	// @observable username = ""
	// @observable userInfo = {}
	// @observable userRepos = []
	// @observable mainUser = ""

	@observable users = map()
	@observable mainUser = {
		verified: "empty",
		userInfo: {},
		repos: []
	}

	@computed get dataIsAvailable(){
		return this.users.length !== 0
	}
}

const singleton = new AppStore();
export default singleton;