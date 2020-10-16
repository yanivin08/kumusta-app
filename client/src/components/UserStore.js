import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {

            isLoggedIn: false,
            username: '',
            access_token: ''
            
        })
    }
}

export default new UserStore();
