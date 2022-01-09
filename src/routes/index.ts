import {Router} from "https://deno.land/x/oak@v10.1.0/mod.ts"

import {fromFileUrl } from "https://deno.land/std@0.120.0/path/mod.ts"
import {readableStreamFromReader } from "https://deno.land/std@0.120.0/streams/conversion.ts"

export const router = new Router();

router.get("/", async (context) => {

    const u = new URL("../public/html/main.html", import.meta.url);
    // server launched by deno run ./server.ts
    const file = await Deno.open(fromFileUrl(u));

    context.response.status= 200;
    context.response.body= readableStreamFromReader(file)
  
})