import {writable} from "svelte/store";
import { UserInfo } from '../apis/auth';
import type { JWT } from '../apis/auth';

const data = () => {
    UserInfo().then((data: JWT) => {
		return data
	}).catch(err => {
		return err.toString()
	})
}
//
//

const UserStore = writable(data())
export default UserStore
