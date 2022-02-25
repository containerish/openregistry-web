import {writable} from "svelte/store";
import {Auth} from '../apis/auth';
import type { JWT } from '../apis/auth';

const auth = new Auth();
const data = async () => {
    return await auth.GetUserWithSession().then(data => {
		return data
	}).catch(err => {
		throw err
	})
}
//
//

const UserStore = writable(data())
export default UserStore
