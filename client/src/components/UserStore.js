import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {

            isLoggedIn: false,
            username: ''

        })
    }
}

export default new UserStore();
