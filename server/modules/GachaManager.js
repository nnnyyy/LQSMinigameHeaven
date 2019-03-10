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
    BIGFONT: 6,
    RAINBOWBLINK:7,
    EARN_GP: 100,
    EARN_GP_TYPE2: 101,
    FONT_FAMILY: 200,
    FONT_COLOR_MULTI: 201,
    OX_BIG: 300
}

class GachaManager {
    constructor(sm) {
        this.sm = sm;
        this.mFreeGacha = new Map();
        this.mBlocked = new Map();

        this.aLogs = [];
    }

    addLog(usernick) {        
        const info = {
            nick: usernick,
            level: 0,
            regdate: Date.now()
        }

        this.aLogs.push(info);

        if( this.aLogs.length > 20 ) {
            this.aLogs.splice(0, 1);
        }        
    }

    getLogs() {
        return this.aLogs;
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

    openGachaEx(id, cb, options) {
        this.pm_checkRemainCountEx(id, options)
        .then(this.pm_getItem)          
        .then(this.pm_free_save)
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
            {type: GTYPE.BLINK, rate: 40},
            {type: GTYPE.NICKSHADOW, rate: 120},
            {type: GTYPE.FONTCOLOR, rate: 240},
            {type: GTYPE.BOX, rate: 1600},
            {type: GTYPE.RAINBOWNICK, rate: 2},
            {type: GTYPE.YELLOWBLINK, rate: 2},
            {type: GTYPE.BIGFONT, rate: 4},
            {type: GTYPE.FONT_FAMILY, rate: 1}
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
                    case GTYPE.FONT_FAMILY:
                    this.openGachaEx(id, cb, {type: GTYPE.FONT_FAMILY, desc: 'Goyang', fixedGP: fixedGP });
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

    buyGungSeo(id, cb) {
        cb({ret: -100});
        return;
        this.openGachaEx(id, cb, {type: GTYPE.FONT_FAMILY, desc: 'GungsuhChe'});
    }

    buyChatMultiColor(id, cb) {
        this.openGachaEx(id, cb, {type: GTYPE.FONT_COLOR_MULTI});
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
            case GTYPE.RAINBOWBLINK:
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

    pm_checkRemainCountEx(id, options) {
        const gtype = options.type;
        const fixedGP = options.fixedGP;
        const isFree = options.isFree ? true : false;
        let info = { ret: 0, id: id, gm: this, gtype: gtype, pt: 1, isFree: isFree }
        if( options.desc ) info.desc = options.desc;
        info.pt = fixedGP > 0 ? fixedGP : this.getRemainGP( gtype );        

        return new Promise((res,rej)=> {
            if( info.isFree ) {
                DBHelper.call2('getLastGetFreeGachaTime', [info.id], result=> {
                    if( result.ret !== 0 ) {
                        rej({ret: -101});
                        return;
                    }

                    const _data = result.rows[0][0];
                    if( !_data ) res(info);
                    else {
                        info.gm.addLog(options.nick);
                        const d = new Date( new Date(_data.regdate).toLocaleString() );
                        const tCur = new Date();
                        const dtMin = ( tCur - d ) / 1000 / 60;
                        if( dtMin >= 10 ) {
                            options.freeGachaItem.tLastWin = tCur;
                            options.freeGachaItem.winCnt++;
                            res(info);
                        }
                        else {
                            rej({ret: -5});
                        }
                    }                    
                });                
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

            //  획득할 아이템 정보 얻기
            info.item = info.gm.getRandItem( info.gtype );
            if( info.desc ) {
                info.item.desc = info.desc;
            }

            //  프리 가챠 모드일 땐 다음으로 바로 넘기기
            if( info.isFree ) {
                res(info);
                return;
            }
            
            DBHelper.call2('useGachaPoint', [info.id, info.pt], result=> {
                if( result.ret !== 0 ) {
                    info.ret = -3;
                    rej(info);
                    return;
                }                               
                
                res(info);
            })            
        })
    }

    pm_free_earnGP(info) {
        return new Promise((res,rej) => {
            if( !info.isFree ) {
                res(info);
                return;
            }            

            if( info.gtype !== GTYPE.EARN_GP && info.gtype !== GTYPE.EARN_GP_TYPE2 ) {
                res(info);
                return;
            }

            const earnGP = info.gm.getEarnGP(info.gtype);

            DBHelper.call2('incGachaPoint', [info.id, earnGP], result=> {
                if( result.ret !== 0 ) {
                    rej({ret: -101});
                    return;
                }

                res(info);
            });
        });
    }

    pm_free_save(info) {        
        return new Promise((res,rej)=> {
            if( !info.isFree ) {
                res(info);
                return;            
            }

            const effectid = info.gm.getEffectId( info.gtype );
            DBHelper.call3('insertFreeGacha', [info.id, info.gtype, effectid, info.item.desc], result=> {
                if( result.ret !== 0 ) {
                    info.ret = -101;
                    rej(info);
                    return;
                }

                if( result.retVal['@ret'] == -2 ) {
                    info.ret = -3;
                }                

                res(info);
            })
        });        
    }

    pm_save(info) {
        return new Promise((res,rej)=> {
            if( info.isFree ) {
                res(info);
                return;
            }

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
            else {
                DBHelper.call2('ei_insert', [info.id, info.gm.getEffectId(info.gtype), info.item.desc], result=> {
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

    getRandColor() {
        const rr = this.getRandomInt(0, 255);
        const rg = this.getRandomInt(0, 255);
        const rb = this.getRandomInt(0, 255);
        return '#' + this.toHex(rr) + this.toHex(rg) + this.toHex(rb);
    }

    randomFontColorGacha() {        
        return {
            name: '폰트',
            desc: this.getRandColor()
        }
    }

    randomFontColorMulti() {
        const cnt = this.getRandomInt(2,4);
        let sum = '';
        for( let i = 0 ; i < cnt ; ++i ) {
            const c = this.getRandColor();
            sum += c;
            if( i !== cnt - 1) {
                sum += '/';
            }
        }

        return {
            name: '멀티 폰트',
            desc: sum
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

    setBlock(id) {
        this.mBlocked.set(id, {tStart: Date.now()});
    }

    getFreeGacha(id, nick, cb) {        
        const tCur = new Date();
        const tJamliveStart = new Date(tCur.getFullYear(), tCur.getMonth(), tCur.getDate(), 20, 50, 0 );
        const tJamliveEnd = new Date(tCur.getFullYear(), tCur.getMonth(), tCur.getDate(), 21, 20, 0 );

        if( tCur - tJamliveStart > 0 && tCur - tJamliveEnd < 0 ) {
            cb({ret: -200});
            return;
        }

        if( this.mBlocked.has(id) ) {
            if( tCur - this.mBlocked.get(id).tStart < 1000 * 60 * 60 ) {
                cb({ret: -17});
                return;
            }
            else{
                this.mBlocked.delete(id);
            }
            
        }

        DBHelper.call('getFreeGachaList', result=> {
            if( result.ret !== 0 ) {
                cb({ret: -101});
                return;
            }

            let aTypes = result.rows[0];            
            
            if( !this.mFreeGacha.get(id) ) {
                this.mFreeGacha.set(id, {tLastGacha: 0, tLastWin: 0, winCnt: 0});
            }

            let item = this.mFreeGacha.get(id);
            if( !item ) {
                if( cb ) cb({ret: -99});
                return;
            }                        

            if( tCur - item.tLastGacha < 1 * 15 * 1000 ) {
                if( cb ) cb({ret: -2});
                return;
            }            
            
            if( item.winCnt >= 2 ) {
                if( tCur - item.tLastWin < 1 * 60 * 60 * 1000 ) {
                    if( cb ) cb({ret: -4});
                    return;
                }                
                else {
                    item.winCnt = 0;
                    item.tLastWin = 0;
                }                
            }

            item.tLastGacha = tCur;
            
            let sumProb = 0;
            let bEnd = true;
            aTypes.forEach(item=> {
                sumProb += item.rate;
                if( item.gtype !== -1 ) bEnd = false;
            });

            if( bEnd )  {
                if( cb ) cb({ret: -14});
                return;
            }
            
            for( let i = 0 ; i < aTypes.length ; ++i) {
                const r = this.getRandomInt(0, sumProb);
                 if( r <= aTypes[i].rate ) {
                    //  당첨
                    const options = {isFree: true, type: aTypes[i].gtype, desc: aTypes[i].description};
                    switch(aTypes[i].gtype) {                    
                        case GTYPE.YELLOWBLINK:
                        case GTYPE.RAINBOWBLINK:
                        case GTYPE.RAINBOWNICK:
                        case GTYPE.BIGFONT:
                        case GTYPE.EARN_GP:
                        case GTYPE.EARN_GP_TYPE2:
                        case GTYPE.FONT_FAMILY:
                        case GTYPE.OX_BIG:
                            options.freeGachaItem = item;
                            options.nick = nick;
                            this.openGachaEx(id, cb, options);
                        break;
                        case GTYPE.FAILED:
                            this.addLog(nick);
                            cb({ret: 0, type: aTypes[i].gtype });
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

    getRemainGP( gtype ) {
        switch(gtype) {
            case GTYPE.FONTCOLOR:
            {
                return 50;
            }

            case GTYPE.NICKSHADOW:
            {
                return 100;
            }

            case GTYPE.BLINK:
            {
                return 800;
            }

            case GTYPE.FONT_COLOR_MULTI:
            {
                return 300;
            }

            case GTYPE.RAINBOWNICK:
            case GTYPE.YELLOWBLINK:
            case GTYPE.BIGFONT:
            {
                return 2000;
            }

            case GTYPE.FONT_FAMILY:
            {
                return 2000;
            }
        }

        return 999999;
    }

    getRandItem( gtype ) {
        switch(gtype) {
            case GTYPE.BOX: 
            {
                return this.randomGacha();                
            }

            case GTYPE.FONTCOLOR:
            case GTYPE.NICKSHADOW:
            {
                return this.randomFontColorGacha();                
            }

            case GTYPE.FONT_COLOR_MULTI:
            {
                return this.randomFontColorMulti();
            }

            case GTYPE.RAINBOWNICK:
            {
                return this.getRainbowNickGacha();                
            }

            case GTYPE.YELLOWBLINK:
            {
                return this.getYellowBlinkChatGacha();                
            }

            case GTYPE.RAINBOWBLINK:
            {
                return {
                    name: '채팅 무지개 반짝이',
                    desc: '@rainbowblink'
                }  
            }

            case GTYPE.BIGFONT:
            {
                return this.getBigFontGacha();                
            }

            case GTYPE.EARN_GP:
            case GTYPE.EARN_GP_TYPE2:
            {
                return {
                    name: 'GP 획득',
                    desc: ''
                } 
            }

            case GTYPE.FONT_FAMILY:
            {
                return {
                    name: '서체 획득',
                    desc: ''
                }
            }

            case GTYPE.OX_BIG:
            {
                return {
                    name: 'ox 아이콘 거대화',
                    desc: 'big'
                }
            }
        }

        return null;
    }

    getEffectId( gtype ) {
        switch(gtype) {
            case GTYPE.FONTCOLOR: return 1;   
            case GTYPE.FONT_COLOR_MULTI: return 1;         
            case GTYPE.YELLOWBLINK: return 1;
            case GTYPE.RAINBOWBLINK: return 1;

            case GTYPE.RAINBOWNICK: return 2;
            case GTYPE.NICKSHADOW: return 2;

            case GTYPE.BLINK: return 3;
            case GTYPE.BIGFONT: return 4;      
            
            case GTYPE.FONT_FAMILY: return 5;
            case GTYPE.OX_BIG: return 6;
        }
        return -1;
    }

    getEarnGP( gtype ) {
        switch(gtype) {
            case GTYPE.EARN_GP: return 50;
            case GTYPE.EARN_GP_TYPE2: return 1000;
        }

        return 0;
    }
}

module.exports = GachaManager;