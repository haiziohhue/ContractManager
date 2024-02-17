import {App} from "./module/KoaModule/index";
import { AppDataSource } from "./utils/data-source";

(() => {
  AppDataSource.initialize().then(() => {
    console.log("dataSource init success");
  });
  App();
})();
