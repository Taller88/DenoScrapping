import {Router} from "https://deno.land/x/oak@v10.1.0/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const router = new Router();

router.get("/", (context) => {
    context.response.body = "Hello world,Hi ";
})
    .get("/books", (context) => {
        context.response.body = "test";
    });


export default router;