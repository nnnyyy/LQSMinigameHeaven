'use strict'
const Promise = require('promise');
const DBHelper = require('./DBHelper');

const GTYPE = {
    FAILED: -1,
    BOX: 0,
    FONTCOLOR: 1,
    NICKSHADOW: 2,
    BLINK: 3,
    RAINBOWNICK: 4,
    YELLOWBLINK: 5,
    BIGFONT: 6
}

class GachaManager {
    constructor(sm) {
        this.sm = sm;
        this.mFreeGacha = new Map();
    }

    openGacha(id, cb, fixedGP) {
        this.pm_checkRemainCount(id,GTYPE.BOX, fixedGP)
        .then(this.pm_getItem)
        .then(this.pm_save)
        .then(info=> {                   
            cb({ret: info.ret, item: info.item, type: info.gtype});
        })
        .catch(err=> {              
            cb({ret: err.ret});
        })
    }

    openFontColorGacha(id, cb, fixedGP, isYellowBlink) {
        this.pm_checkRemainCount(id,isYellowBlink ? GTYPE.YELLOWBLINK : GTYPE.FONTCOLOR, fixedGP)
        .then(this.pm_getItem)        
        .then(this.pm_save)
        .then(info=> {
            cb({ret: info.ret, item: info.item, type: info.gtype});
        })
        .catch(err=> {              
            cb({ret: err.ret});
        })
    }

    openNickShadowGacha(id, cb, fixedGP, isRainbow) {
        this.pm_checkRemainCount(id, isRainbow ? GTYPE.RAINBOWNICK : GTYPE.NICKSHADOW, fixedGP)
        .then(this.pm_getItem)        
        .then(this.pm_save)
        .then(info=> {
            cb({ret: info.ret, item: info.item, type: info.gtype});
        })
        .catch(err=> {              
            cb({ret: err.ret});
        })
    }

    openBigFontGacha(id, cb, fixedGP) {
        this.pm_checkRemainCount(id, GTYPE.BIGFONT, fixedGP)
        .then(this.pm_getItem)        
        .then(this.pm_save)
        .then(info=> {
            cb({ret: info.ret, item: info.item, type: info.gtype});
        })
        .catch(err=> {              
            cb({ret: err.ret});
        })
    }

    openBlinkGacha(id, cb, fixedGP) {
        this.pm_checkRemainCount(id,GTYPE.BLINK, fixedGP)
        .then(this.pm_getItem)        
        .then(this.pm_save)
        .then(info=> {
            cb({ret: info.ret, item: info.item, type: info.gtype});
        })
        .catch(err=> {              
            cb({ret: err.ret});
        })
    }

    openRand(id, cb) {
        const fixedGP = 15;
        const aTypes = [
            {type: GTYPE.BLINK, rate: 20},
            {type: GTYPE.NICKSHADOW, rate: 60},
            {type: GTYPE.FONTCOLOR, rate: 120},
            {type: GTYPE.BOX, rate: 800},
            {type: GTYPE.RAINBOWNICK, rate: 1},
            {type: GTYPE.YELLOWBLINK, rate: 1},
            {type: GTYPE.BIGFONT, rate: 2}
        ];

        let sumProb = 0;
        aTypes.forEach(item=> {
            sumProb += item.rate;
        });
        
        for( let i = 0 ; i < aTypes.length ; ++i) {
            const r = this.getRandomInt(0, sumProb);
            if( r < aTypes[i].rate ) {
                //  당첨
                switch(aTypes[i].type) {
                    case GTYPE.BLINK:
                        this.openBlinkGacha(id, cb, fixedGP);
                    break;
                    case GTYPE.NICKSHADOW:
                        this.openNickShadowGacha(id, cb, fixedGP);
                    break;
                    case GTYPE.FONTCOLOR:
                        this.openFontColorGacha(id, cb, fixedGP);
                    break;
                    case GTYPE.YELLOWBLINK:
                        this.openFontColorGacha(id, cb, fixedGP, true);
                    break;                  
                    case GTYPE.BOX:
                        this.openGacha(id, cb, fixedGP);
                    break;  
                    case GTYPE.RAINBOWNICK:
                        this.openNickShadowGacha(id, cb, fixedGP, true);
                    break;
                    case GTYPE.BIGFONT:
                        this.openBigFontGacha(id, cb, fixedGP);
                    break;
                }
                break;
            }
            else {
                sumProb -= aTypes[i].rate;
            }
        }
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

    pm_checkRemainCount(id, gtype, fixedGP) {
        let info = { ret: 0, id: id, gm: this, gtype: gtype, pt: 1 }
        switch(gtype) {
            case GTYPE.FONTCOLOR:
            {
                info.pt = 50;
                break;
            }

            case GTYPE.NICKSHADOW:
            {
                info.pt = 100;
                break;
            }

            case GTYPE.BLINK:
            {
                info.pt = 800;
                break;
            }

            case GTYPE.RAINBOWNICK:
            case GTYPE.YELLOWBLINK:
            case GTYPE.BIGFONT:
            {
                info.pt = 2000;
                break;
            }
        }

        if( fixedGP ) {
            info.pt = fixedGP;
        }

        return new Promise((res,rej)=> {
            if( info.pt <= 0 ) {
                res(info);
                return;
            }

            DBHelper.getGachaPoint(id, result=> {
                if( result.ret === 0 ) {
                    info.gp = result.gp;
                    info.sgp = result.sgp;

                    if( info.gp <= 0) {
                        info.ret = -2;
                        rej(info);
                        return;
                    }

                    if( info.gp < info.pt ) {
                        info.ret = -3;
                        rej(info);                        
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
            if( info.pt <= 0 ) {
                switch(info.gtype) {
                    case GTYPE.BOX: 
                    {
                        const rginfo = info.gm.randomGacha();
                        info.item = rginfo;
                        break;
                    }

                    case GTYPE.FONTCOLOR:
                    case GTYPE.NICKSHADOW:
                    {
                        info.item = info.gm.randomFontColorGacha();
                        break;
                    }

                    case GTYPE.RAINBOWNICK:
                    {
                        info.item = info.gm.getRainbowNickGacha();
                        break;
                    }

                    case GTYPE.YELLOWBLINK:
                    {
                        info.item = info.gm.getYellowBlinkChatGacha();
                        break;
                    }

                    case GTYPE.BIGFONT:
                    {
                        info.item = info.gm.getBigFontGacha();
                        break;
                    }
                }                
                
                res(info);
                return;
            }

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
                    case GTYPE.NICKSHADOW:
                    {
                        info.item = info.gm.randomFontColorGacha();
                        break;
                    }

                    case GTYPE.RAINBOWNICK:
                    {
                        info.item = info.gm.getRainbowNickGacha();
                        break;
                    }

                    case GTYPE.YELLOWBLINK:
                    {
                        info.item = info.gm.getYellowBlinkChatGacha();
                        break;
                    }

                    case GTYPE.BIGFONT:
                    {
                        info.item = info.gm.getBigFontGacha();
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
            else if(info.gtype === GTYPE.FONTCOLOR || info.gtype === GTYPE.YELLOWBLINK ) {
                DBHelper.call2('ei_insert', [info.id, 1, info.item.desc], result=> {
                    if( result.ret !== 0 ) {
                        info.ret = -4;
                        rej(info);
                        return;
                    }
                    
                    res(info);                
                });                
            }
            else if(info.gtype === GTYPE.NICKSHADOW || info.gtype === GTYPE.RAINBOWNICK ) {
                DBHelper.call2('ei_insert', [info.id, 2, info.item.desc], result=> {
                    if( result.ret !== 0 ) {
                        info.ret = -4;
                        rej(info);
                        return;
                    }
                    
                    res(info);                
                });                
            }
            else if(info.gtype === GTYPE.BLINK ) {
                DBHelper.call2('ei_insert', [info.id, 3, '1'], result=> {
                    if( result.ret !== 0 ) {
                        info.ret = -4;
                        rej(info);
                        return;
                    }
                    
                    res(info);                
                });                
            }
            else if(info.gtype === GTYPE.BIGFONT ) {
                DBHelper.call2('ei_insert', [info.id, 4, info.item.desc], result=> {
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

    pm_freeCheck(info) {
        return new Promise((res,rej)=> {
            if( info.pt > 0 ) {
                res(info);
                return;
            }

            DBHelper.call2('setFreeListItemCount', [info.gtype], result=> {
                 res(info);
            });
        });        
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

    getRainbowNickGacha() {
        return {
            name: '레인보우 닉네임',
            desc: '@rainbow'
        }
    }

    getYellowBlinkChatGacha() {
        return {
            name: '채팅 노랑 반짝이',
            desc: '@yellowblink'
        }        
    }

    getBigFontGacha() {
        return {
            name: '빅 폰트',
            desc: '@bigfont'
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

    getFreeGacha(id, cb) {

        DBHelper.call('getFreeGachaList', result=> {
            if( result.ret !== 0 ) {
                cb({ret: -101});
                return;
            }

            let aTypes = result.rows[0];
            aTypes.push({type: GTYPE.FAILED, rate: 1000000});

            const tCur = new Date();
            if( !this.mFreeGacha.get(id) ) {
                this.mFreeGacha.set(id, {tLastGacha: 0});
            }

            const item = this.mFreeGacha.get(id);
            if( !item ) {
                if( cb ) cb({ret: -99});
                return;
            }

            if( tCur - item.tLastGacha < 1 * 15 * 1000 ) {
                if( cb ) cb({ret: -2});
                return;
            } 

            item.tLastGacha = tCur;
            
            let sumProb = 0;
            aTypes.forEach(item=> {
                sumProb += item.rate;
            });
            
            for( let i = 0 ; i < aTypes.length ; ++i) {
                const r = this.getRandomInt(0, sumProb);
                if( r < aTypes[i].rate ) {
                    //  당첨
                    switch(aTypes[i].type) {                    
                        case GTYPE.YELLOWBLINK:
                            this.openFontColorGacha(id, cb, 0, true);
                        break;                    
                        case GTYPE.RAINBOWNICK:
                            this.openNickShadowGacha(id, cb, 0, true);
                        break;
                        case GTYPE.FAILED:
                            cb({ret: 0, type: aTypes[i].type });
                        break;
                    }
                    break;
                }
                else {
                    sumProb -= aTypes[i].rate;
                }
            }

        });        
    }
}

module.exports = GachaManager;