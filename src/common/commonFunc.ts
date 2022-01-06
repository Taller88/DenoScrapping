export function sliceFunc(text:string, to:string, from:string){

    var result = text.substring(text.indexOf(to)+to.length,text.length);

    result = result.substring(0,result.indexOf(from));
    
//NTS_LOGIN_SYSTEM_CODE_P=TXPP;Domain=hometax.go.kr;Path=/,TXPPsessionID=ioyt0FdX69nxwFhLnSjLkszKFEyBaCRuOOEDpzL5XJEyyrVjpjuOIP7FYcOvO1XZ.tupiwsp28_servlet_TXPP01;Domain=.hometax.go.kr;Path=/

    return result;
}