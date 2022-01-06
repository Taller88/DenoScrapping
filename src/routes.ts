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

        console.log()
        // var test = await body.value
        console.log()
        console.log(formData.fields.moduleName);
        console.log(formData.fields.job);
        console.log(formData.fields.userName);
        console.log(formData.fields.phoneNum);
        console.log(formData.fields.ssn1);
        console.log(formData.fields.ssn2);
        

        // var input:Input = test;


        // // let inputTemp = await body.value;
        // var result = await bodyParser(context.request);

        // console.log("body: "+result);
        // let inputType :HomeTaxInputType= {
        //     userName: body.userName,
        //     phoneNum: body.phoneNum,
        //     ssn1: body.ssn1,
        //     ssn2: body.ssn2,
        // }

        let input:Input = {
            Module:formData.fields.moduleName,
            Job:formData.fields.Job,
            Input:{
                userName:formData.fields.userName,
                phoneNum:formData.fields.phoneNum,
                ssn1:formData.fields.ssn1,
                ssn2:formData.fields.ssn2
            }

        };
        // console.log("body.Module: "+ body.Module);
        // console.log("body.Job: "+ body.Job);
        if(!input.Input.userName || !input.Input.phoneNum || !input.Input.ssn1 || !input.Input.ssn2 ){
            console.log("input.Input.userName: "+ input.Input.userName);
            console.log("input.Input.phoneNum: "+ input.Input.phoneNum);
            console.log("input.Input.ssn1: "+ input.Input.ssn1);
            console.log("input.Input.ssn2: "+ input.Input.ssn2);
            
            context.response.status = 400;
            context.response.body = "입력값을 입력하지 않았습니다."
        }else{
            
            const moduleName:string = input.Module;
            if(moduleName === "Hometax"){
                const hometax = new Hometax();
                var resultTest = await hometax.login("정진우", "01082271995", "930616", "1268217");
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