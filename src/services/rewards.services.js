import axios from 'axios';

const url = 'api/rewards/';
// const url = 'http://localhost:5000/api/rewards/';

class RewardsService {
    //Get Rewards
    static getRewards() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(prize => prize)
                )
            } catch (error) {
                reject(error);
            }
        })
    }

    static getRewardById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}prize/`, {
                    id: id
                });
                const data = res.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })
    }

    static updateQuantityById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.put(url, {
                    id: id
                });
                resolve(res.data);
            } catch (error) {
                console.log('request', error);
                reject(error);
            }
        })
    }
}

export default RewardsService;