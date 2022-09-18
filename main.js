const {useQueryPickProducts, useRepeat} = require("./utils/hooks");





useRepeat(async (stop, count) => {
    let products =  await useQueryPickProducts([
        'MQ0W3CH/A',
        'MQ0M3CH/A'
    ])
    if(products && products.length > 0){ stop()}
    console.log(count)
    count === 2 && stop();
    return Promise.resolve();
}, 6000)


/* useRepeat((stop, count) => {
    console.log('hello')
    count === 2 && stop();
}, 2000) */