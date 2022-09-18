const request = require("./request");

async function useQueryPickProducts(productIds, storeId = 'R484') {
    if(!(productIds && productIds.length > 0 )) return Promise.reject(null)
    let products = {};
    productIds.forEach((pid, idx) => { products[`parts.${idx}`] = pid;});
   
    try{
        let data = await request({
            method : 'get',
            url : '/shop/fulfillment-messages',
            params:{
                little : true,
                mt : 'regular',
                store : storeId,
                ...products
            }
        })
        
        let store = data.pickupMessage.stores.find(sitm => sitm.storeNumber === storeId);
        let parts = store.partsAvailability;
        let avaliableProducts = [];
        for(let productId of productIds){
            let compact = parts[productId].messageTypes?.compact;
            if(!!compact.storeSelectionEnabled){
                avaliableProducts.push({
                    id : productId,
                    ...compact
                })
            }
        }

        return Promise.resolve(avaliableProducts);
        
    }catch(err){
        return Promise.reject(err)
    }

   
}


async function useRepeat(action, gap = 5 * 1000, count = 1, timer){
    let isStop = false;
    if(!action) return Promise.reject(null);
    try {
        await action(() => {isStop = true}, count);
        count++;
    }catch(err){
        console.log(err)
    }
    timer && clearTimeout(timer);
    timer = null;
    if(!isStop){
        const TT = setTimeout(() => { useRepeat(action, gap, count, TT) }, gap);
        return Promise.resolve(count);
    }
    return Promise.resolve(count);
}


module.exports = {
    useQueryPickProducts,
    useRepeat
}