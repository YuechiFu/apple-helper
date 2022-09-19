const request = require("./request");

/**
 * @description: Query picked Product Stock by store
 * @param {string} productIds 
 * @param {string} storeId R484 默认深圳益田假日
 * @return {*}
 */
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


/**
 * @description: Repeat Hook
 * @param {function} action
 * @param {number} gap
 * @param {number} count
 * @param {string} timer 
 * @return {*}
 */
async function useRepeat(action, gap = 5 * 1000, count = 1, timer){
    let isStop = false;
    if(!action) return Promise.reject(null);
    try {
        await action(() => {isStop = true}, count);
        count++;
   
        timer && clearTimeout(timer);
        timer = null;
        if(!isStop){
            const TT = setTimeout(() => { useRepeat(action, gap, count, TT) }, gap);
            return Promise.resolve(count);
        }
        return Promise.resolve(count);
    }catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}

/**
 * @description: 
 * @param {string} key 方糖 SendKey
 * @param {string} msg 
 * @return {*}
 */
async function useWxNotify(key, msg){
    let url = `https://sctapi.ftqq.com/${key}.send?title=${msg}`
    if(key && msg){
        try{
            await request({
                method : 'get',
                url
            })
        }catch(err){
            console.log('error',err);
        }
        return Promise.resolve();
    }
}



module.exports = {
    useQueryPickProducts,
    useRepeat,
    useWxNotify
}