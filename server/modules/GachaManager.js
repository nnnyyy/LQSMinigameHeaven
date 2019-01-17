'use strict'
const Promise = require('promise');

class GachaManager {
    constructor(sm) {
        this.sm = sm;
    }

    openGacha(cb) {
        this.pm_getItem()
        .then(this.pm_save)
        .then(info=> {
            cb(info);
        })
    }

    pm_getItem() {
        let info = { ret: 0 }
        return new Promise((res,rej) => {
            info.item = {
                name: '포인트',
                itemsn: 0
            }
            res(info);
        })
    }

    pm_save(info) {
        return new Promise((res,rej)=> {
            res(info);
        })
    }
}

module.exports = GachaManager;