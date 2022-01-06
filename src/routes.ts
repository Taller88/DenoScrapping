import {Router} from "https://deno.land/x/oak@v10.1.0/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {Input,HomeTaxInputType} from "./types/InputType.ts"
import {OutputType} from "./types/OutType.ts"
import {Hometax} from "./modules/Hometax.ts"
import {fromFileUrl } from "https://deno.land/std@0.120.0/path/mod.ts"
import {readableStreamFromReader } from "https://deno.land/std@0.120.0/streams/conversion.ts"

// import {createBodyParser, JsonBodyParser} from "https://deno.land/x/body_parser@v0.0.1/mod.ts"


const router = new Router();
  

router.get("/", async (context) => {

        const u = new URL("../public/html/main.html", import.meta.url);
        // server launched by deno run ./server.ts
        const file = await Deno.open(fromFileUrl(u));

        context.response.status= 200;
        context.response.body= readableStreamFromReader(file)
      
})
    .get("/books", (context) => {
        context.response.body = "test";
    })
    .post("/execScrapping", async (context) =>{
        console.log("execScrapping init")
        // 여기는 Top level이 아니기 때문에 async로 감싸주고 await로 받아야함 
        const {value} = await context.request.body({type:"form-data"});
        const formData = await value.read();



        let input:Input = {
            Module:formData.fields.moduleName,
            Job:formData.fields.job,
            Input:{
                userName:formData.fields.userName,
                phoneNum:formData.fields.phoneNum,
                ssn1:formData.fields.ssn1,
                ssn2:formData.fields.ssn2
            }

        };

        console.log(input.Module)
        console.log(input.Job)
        console.log(input.Input.userName)
        console.log(input.Input.phoneNum)
        console.log(input.Input.ssn2)

        if(!input.Input.userName || !input.Input.phoneNum || !input.Input.ssn1 || !input.Input.ssn2 ){
            console.log("input is empty")
            context.response.status = 400;
            context.response.body = "입력값을 입력하지 않았습니다."
            return;
        }else{
            console.log("input is Ok")
            
            const moduleName:string = input.Module;
            if(moduleName === "Hometax"){
                const hometax = new Hometax();
                if(input.Job === '로그인' || input.Job === 'login' ){
                    console.log("[routes] routes.js to Login")
                    var resultTest = await hometax.login(input.Input.userName ,input.Input.phoneNum ,input.Input.ssn1 ,input.Input.ssn2);
                    
                }
            }
            
            var json :OutputType = {
                ErrorCode : "00000000",
                ErrorMessage : "정상조회 되었습니다.",
                Result:""
            }

            context.response.status = 200;
            context.response.body = json;
            
        }
    });


export default router;