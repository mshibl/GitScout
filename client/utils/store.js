import {observable, computed, asStructure, map} from 'mobx';

class AppStore {
	@observable requestAuth = false
	@observable requestedUsername = ""
	@observable errorMessage = ""

	@observable users = map()
	@observable mainUser = {
		loaded: false,
		userInfo: {},
		repos: [],
		languages: map(),
		counts: {}
	}
}

const singleton = new AppStore();
export default singleton;