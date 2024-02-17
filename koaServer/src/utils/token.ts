import { sign, verify } from "jsonwebtoken";
import {config} from "./config";
export const Token ={
    create(data:any) {
        return sign(data, config.jwtSecret);
    },
    prase(token:string) {
        return verify(token,config.jwtSecret);
    },
};
