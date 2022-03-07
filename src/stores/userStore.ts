import {writable} from "svelte/store";
import {Auth} from '../apis/auth';

const auth = new Auth();

const data = () => {
    const userInfo = auth.GetUserWithSession().then(data => {
		return data
	}).catch(err => {
		return err;
	})

	return userInfo;
}
//
//

const UserStore = writable(data())
export default UserStore
