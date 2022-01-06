
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

class App {
  app;

  constructor() {
    this.app = new Application();

    this.initializeMiddlewares();
    this.initializeRouting();
  }

  listen() {
    // const port = process.env.PORT || 5000;
    console.log("http://localhost:5000/ 5000 port open")
    this.app.listen({ port: 5000 });
  }

  getServer() {
    return this.app;
  }


  initializeMiddlewares() {
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
    
  }



  initializeRouting() {
    

  }
}

export default App;
