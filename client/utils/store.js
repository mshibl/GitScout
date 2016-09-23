import {observable, computed, asStructure, map} from 'mobx';

class AppStore {
	@observable users = map()
	@observable mainUser = {
		verified: "empty",
		userInfo: {},
		repos: [],
		languages: map(),
		counts: {}
	}

	@computed get dataIsAvailable(){
		return this.users.length !== 0
	}
}

const singleton = new AppStore();
export default singleton;