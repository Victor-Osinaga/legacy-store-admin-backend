import jwt from 'jsonwebtoken'
import config from '../../../config.js';

const PRIVATE_KEY = config.private_key_jwt;

export default function verifyTokenAuth(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, PRIVATE_KEY, (err, user) => {
            console.log("xddddddddddddddddddddd", err, user);
            if (err) {
                reject({ status: "failed", data: "Invalid token" });
            } else {
                resolve(user.data);
            }
        });
    });
}