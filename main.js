const {useQueryPickProducts, useRepeat, useWxNotify} = require("./utils/hooks");
const log = require('./utils/log')
const {PRODUCTS, NOTIFY_USERS} = require('./config');


function notifyAvailProds(products){
    products.forEach(ptem => {
        let id = ptem.id;
        PRODUCTS[id] && PRODUCTS[id].notiKeys.length && PRODUCTS[id].notiKeys.forEach(key => {
            useWxNotify(key, `${id}-${ptem.storePickupProductTitle || ''}`)
        })
    })
}


useRepeat(async (stop, count) => {
    try{
        let pids = Object.keys(PRODUCTS);
        let products =  await useQueryPickProducts(pids)
        if(products && products.length > 0){ 
            stop();
            notifyAvailProds(products);
        }else{
            log('info', '暂无可自提的产品');
        }
    }catch(err){
        log('error', err.toString())
    }
    return Promise.resolve();
}, 3000)
