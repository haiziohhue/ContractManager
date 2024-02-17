import { AppDataSource } from "./utils/data-source";

const { App } = require("./module/KoaModule");
(()=>{
    AppDataSource.initialize().then(()=>{
        console.log("dataSource init success")
    })
    App()
})()