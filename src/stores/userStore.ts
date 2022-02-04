import {writable} from "svelte/store";
import { UserInfo } from '../apis/auth';

// let userInfo: JWT;

// const data = () => {
//     userInfo = UserInfo();
// }
const UserStore = writable(UserInfo())
export default UserStore
