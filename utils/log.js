require('console-color-mr');
module.exports = (type,msg,time=true)=>{
    let now = new Date().toLocaleTimeString();
    let str =  time ? `${now} : ${msg}`:`${msg}`
    switch (type){
        case 'info' : console.info(str.cyan);break;
        case 'success' :console.info(str.bold.magentaBG.white);break;
        case 'error' : console.info(str.bold.redBG.white);break;
        case 'warning' : console.info(str.red);break;
        default:console.info(str.white);break;
    }
    if(global.ws){global.ws.send(msg)}
}