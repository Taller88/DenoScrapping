import axiod from "https://deno.land/x/axiod/mod.ts";

export class Hometax {
    host = "https://www.hometax.go.kr";
    path = "";
    constructor(){
        
    }
    login(name:string, phoneNum:string, ss1:string, ssn2:string){
        
        this.path = "/gpin/v1/request_tx";

        var result = axiod({
            method: 'post',
            url: this.host+this.path,
            data:{
                params:{
                    signTarget:''
                }
            }
          });
        
          console.log("POST result: "+ result);

        return "200"
        

    }
    소득조회(){

    }
}

