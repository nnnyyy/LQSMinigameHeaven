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
            cb(info);
        })
        .catch(err=> {            
            cb({ret: err.ret});
        })
    }

    getGacha(id, cb) {
        this.pm_checkRemainCount(id)
        .then(info => {
            cb(info);
        })
        .catch(err=> {
            cb({ret: err.ret});
        });
    }

    pm_checkRemainCount(id) {
        let info = { ret: 0, id: id }
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
        })

    }

    pm_getItem(info) {        
        return new Promise((res,rej) => {
            DBHelper.call2('useGachaPoint', [info.id], result=> {
                if( result.ret !== 0 ) {
                    info.ret = -3;
                    rej(info);
                }

                info.item = {
                    name: '포인트',
                    itemsn: 0
                }
                
                res(info);
            })            
        })
    }

    pm_save(info) {
        return new Promise((res,rej)=> {
            res(info);
        })
    }
}

module.exports = GachaManager;