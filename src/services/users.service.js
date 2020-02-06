import axios from 'axios';

const url = 'api/users/';
// const url = 'http://localhost:5000/api/users/';

class UserService {
    //Create Users
    static createUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}create/`, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                });
                resolve(res.data)
            } catch (error) {
                reject(error);
            }
        })
    }

    // find User
    static findUser(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}find/`, {
                    email: email,
                });
                resolve(res.data)
            } catch (error) {
                reject(error);
            }
        })
    }
}

export default UserService;