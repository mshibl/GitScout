import {map, extendObservable, action} from 'mobx';

class AppStore {
  constructor() {
    this.reset();
  }

  @action reset() {
    extendObservable(this, {
	    errorMessage: "",
		mainUser: {
			username: "",
			loaded: false,
			userInfo: {},
			repos: [],
			languages: map(),
			analysisLoaded: false,
			counts: {}
		}
    });
  }
}

const singleton = new AppStore();
export default singleton;