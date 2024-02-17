import * as path from "path" 
import configs from "../../config.js"

export const config = {
    savePath: configs.savePath,
    serverPort:configs.serverPort,
    loginPassword:configs.loginPWD,
    jwtSecret:configs.jwtSecret,


    staticPath:path.join(__dirname, "../../static"),
    uploadPath:path.join(__dirname, "../../upload"),

}