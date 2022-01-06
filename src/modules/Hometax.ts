import axiod from "https://deno.land/x/axiod/mod.ts";

export class Hometax {
    host = "https://www.hometax.go.kr";
    path = "";
    constructor(){
        
    }
    async login(name:string, phoneNum:string, ss1:string, ssn2:string){
        
        this.path = "/gpin/v1/request_tx";
        console.log("[Hometax] login init!");
        var result = await axiod({
            method: 'post',
            url: this.host+this.path,
            data:{
                params:{
                    signTarget:''
                }
            }
          });
        
          console.log("POST result: "+ result.data);
          

        return "200"
        

    }
    소득조회(){

    }
}

