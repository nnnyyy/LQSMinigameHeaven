'use strict'
const Promise = require('promise');
const DBHelper = require('./DBHelper');

const GTYPE = {
    BOX: 0,
    FONTCOLOR: 1
}

class GachaManager {
    constructor(sm) {
        this.sm = sm;
    }

    openGacha(id, cb) {
        this.pm_checkRemainCount(id,GTYPE.BOX)
        .then(this.pm_getItem)
        .then(this.pm_save)
        .then(info=> {                   
            cb({ret: info.ret, item: info.item});
        })
        .catch(err=> {              
            cb({ret: err.ret});
        })
    }

    openFontColorGacha(id, cb) {
        this.pm_checkRemainCount(id,GTYPE.FONTCOLOR)
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

    pm_checkRemainCount(id, gtype) {
        let info = { ret: 0, id: id, gm: this, gtype: gtype, pt: 1 }
        switch(gtype) {
            case GTYPE.FONTCOLOR:
            {
                info.pt = 50;
                break;
            }            
        }
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
            DBHelper.call2('useGachaPoint', [info.id, info.pt], result=> {
                if( result.ret !== 0 ) {
                    info.ret = -3;
                    rej(info);
                    return;
                }

                switch(info.gtype) {
                    case GTYPE.BOX: 
                    {
                        const rginfo = info.gm.randomGacha();
                        info.item = rginfo;
                        break;
                    }

                    case GTYPE.FONTCOLOR:
                    {
                        info.item = info.gm.randomFontColorGacha();
                        break;
                    }
                }                
                
                res(info);
            })            
        })
    }

    pm_save(info) {
        return new Promise((res,rej)=> {
            if( info.gtype === GTYPE.BOX ) {
                DBHelper.call2('incActivePoint', [info.id, info.item.desc], result=> {
                    if( result.ret !== 0 ) {
                        info.ret = -4;
                        rej(info);
                        return;
                    }
                    
                    res(info);                
                });
            }
            else if(info.gtype === GTYPE.FONTCOLOR ) {
                DBHelper.call2('ei_insert', [info.id, 1, info.item.desc], result=> {
                    if( result.ret !== 0 ) {
                        info.ret = -4;
                        rej(info);
                        return;
                    }
                    
                    res(info);                
                });                
            }
        })
    }

    randomGacha() {
        //  현재는 포인트만 적립한다.
        const inc = this.getRandomInt(1, 50);

        return {
            name: '포인트',
            desc: inc
        }
    }

    randomFontColorGacha() {
        const rr = this.getRandomInt(0, 255);
        const rg = this.getRandomInt(0, 255);
        const rb = this.getRandomInt(0, 255);
        return {
            name: '폰트',
            desc: '#' + this.toHex(rr) + this.toHex(rg) + this.toHex(rb)
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    toHex(num) {
        let hex = num.toString(16);
        if( hex.length % 2) {
            hex = '0' + hex;
        }

        return hex;
    }
}

module.exports = GachaManager;