import * as path from "path" 
import configs from "../../config.js"

export const config = {
    savePath: configs.savePath,
    serverPort:configs.serverPort??8019,
    loginPassword:configs.loginPWD??'qq368487858Snowy',
    jwtSecret:configs.jwtSecret??"++--++o.0q.qb,b",


    staticPath:path.join(__dirname, "../../static"),
    uploadPath:path.join(__dirname, "../../upload"),

}