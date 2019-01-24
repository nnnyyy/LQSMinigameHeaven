'use strict'
const Promise = require('promise');
const DBHelper = require('./DBHelper');

class GachaManager {
    constructor(sm) {
        this.sm = sm;
    }

    openGacha(id, cb) {
        this.pm_checkRemainCount(id)
        .then(this.pm_getItem)
        .then(this.pm_save)
        .then(info=> {                   
            cb({ret: info.ret, item: info.item});
        })
        .catch(err=> {              
            cb({ret: err.ret});
        })
    }

    getGacha(id, cb) {
        this.pm_getRemainCount(id)
        .then(info => {
            cb(info);
        })
        .catch(err=> {
            cb({ret: err.ret});
        });
    }

    pm_getRemainCount(id) {
        let info = { ret: 0, id: id }
        return new Promise((res,rej)=> {
            DBHelper.getGachaPoint(id, result=> {
                if( result.ret === 0 ) {
                    info.gp = result.gp;
                    info.sgp = result.sgp;                    
                    res(info);                    
                }
                else {                    
                    rej(info);
                }                
            });            
        });
    }

    pm_checkRemainCount(id) {
        let info = { ret: 0, id: id, gm: this }
        return new Promise((res,rej)=> {
            DBHelper.getGachaPoint(id, result=> {
                if( result.ret === 0 ) {
                    info.gp = result.gp;
                    info.sgp = result.sgp;

                    if( info.gp <= 0) {
                        info.ret = -2;
                        rej(info);
                        return;
                    }                    
                    res(info);                    
                }
                else {                    
                    rej(info);
                }                
            });            
        });
    }

    pm_getItem(info) {        
        return new Promise((res,rej) => {
            DBHelper.call2('useGachaPoint', [info.id], result=> {
                if( result.ret !== 0 ) {
                    info.ret = -3;
                    rej(info);
                    return;
                }

                const rginfo = info.gm.randomGacha();
                info.item = rginfo;                
                
                res(info);
            })            
        })
    }

    pm_save(info) {
        return new Promise((res,rej)=> {
            DBHelper.call2('incActivePoint', [info.id, info.item.desc], result=> {
                if( result.ret !== 0 ) {
                    info.ret = -4;
                    rej(info);
                    return;
                }
                
                res(info);                
            });            
        })
    }

    randomGacha() {
        //  현재는 포인트만 적립한다.
        const inc = this.getRandomInt(10, 100);

        return {
            name: '포인트',
            desc: inc
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = GachaManager;