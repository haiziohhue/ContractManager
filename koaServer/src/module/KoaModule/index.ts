import koaBody from "koa-body"
import * as path from "path";
import mount from "koa-mount"
import router from "./router"
import koaJwt =require("koa-jwt") 
import {config} from "../../utils/config";
import koaStatic from "koa-static"
import  Koa = require("koa")
import cors from "koa-cors"
export const App = () => {
  const app = new Koa();
  const port = config.serverPort ? config.serverPort : 3000;

  //middle ware
  // app.use(cors({origin:"*",credentials:true, methods: 'GET,PUT,POST,DELETE,OPTIONS', }))
  app.use(
    koaJwt({ secret: config.jwtSecret }).unless({custom:(ctx) => {
      const path = ctx.request.path;
      console.log(path);
      return path === "/login" || !/^\/api\//.test(path) || !/^\/rowfiles\/.*\.pdf$/.test(path);
    }})
  );
  app.use(
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: config.uploadPath,
        keepExtensions: true,
      },
    })
  );
  
  //api router
  app.use(router.routes()).use(router.allowedMethods());

  //static
  app.use(mount("/", koaStatic(path.join(__dirname, "../../../static"))));
  app.use(mount("/rowfiles", koaStatic(path.join(__dirname, "../../../upload"))));

  //listen
  app.listen(port, () => {
    console.log("server start by " + port);
  });
};
