import {request} from './request'

export function getHomeMultidata() {
    return request({
        url:'/anything'
    })
}
export function getHomeGoods(type,page) {
    return request({
        url:'/anything',
        params:{
            type,
            page
        }
    })
}
