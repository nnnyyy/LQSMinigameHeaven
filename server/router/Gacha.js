/**
 * Created by nnnyyy on 2018-11-23.
 */
'use strict';

const express = require('express');
const Router = express.Router();
const DBHelper = require('../modules/DBHelper');

Router.use((req,res,next)=> {
    if( !req.session.userdata ) {
        res.send({ret: -101});
        return;
    }

    req.user = req.session.userdata;
    next();
});

Router.get('/get', function(req, res, next) {
    try {
        const gcm = req.sm.gcm;
        if( !gcm ) {
            res.send({ret: -102});
            return;
        }
        
        gcm.getGacha(req.user.id, info=> {
            res.send(info);
        })
    }catch(e) {
        console.log(e);
    }    
});

Router.get('/open', function(req, res, next) {
    try {
        const gcm = req.sm.gcm;
        if( !gcm ) {
            res.send({ret: -102});
            return;
        }        
        
        gcm.openGacha(req.user.id, info=> {            
            res.send(info);
        })
    }catch(e) {
        console.log(e);
    }    
});

Router.get('/fontcoloropen', (req,res)=> {
    const gcm = req.sm.gcm;
    if( !gcm ) {
        res.send({ret: -102});
        return;
    }        
    
    gcm.openFontColorGacha(req.user.id, info=> {            
        res.send(info);
    })
});

Router.get('/nickshadowopen', (req,res)=> {
    const gcm = req.sm.gcm;
    if( !gcm ) {
        res.send({ret: -102});
        return;
    }        
    
    gcm.openNickShadowGacha(req.user.id, info=> {            
        res.send(info);
    })
});

Router.get('/blinkopen', (req,res)=> {
    const gcm = req.sm.gcm;
    if( !gcm ) {
        res.send({ret: -102});
        return;
    }        
    
    gcm.openBlinkGacha(req.user.id, info=> {            
        res.send(info);
    })
});

Router.get('/randopen', (req,res)=> {
    const gcm = req.sm.gcm;
    if( !gcm ) {
        res.send({ret: -102});
        return;
    }        
    
    gcm.openRand(req.user.id, info=> {
        res.send(info);
    })
});

Router.post('/sellitem', (req,res)=> {
    if( !req.session.userdata ) {
        res.redirect('/');
        return;
    }

    const sn = req.body.sn;
    DBHelper.call2('ei_sell', [req.session.userdata.id, sn], result=> {
        if( result.ret === 0 ) {
            res.send({ret: 0});
        }        
    })    
});

Router.get('/freeGacha', (req,res)=> {
    if( !req.session.userdata ) {
        res.redirect('/');
        return;
    }

    const gcm = req.sm.gcm;
    if( !gcm ) {
        res.send({ret: -102});
        return;
    }

    gcm.getFreeGacha(req.session.userdata.id, result=> {
        if( result.ret === 0 ) {
            res.send({ret: 0, item: result.item, type: result.type });
        }
        else {
            res.send({ret: result.ret});
        }
    });
});

Router.get('/freeGachaList', (req,res)=> {
    DBHelper.call('getFreeGachaListForClient', result=> {
        if( result.ret === 0 ) {
            res.send({ret: 0, list: result.rows[0]});
        }
    })
})




module.exports = Router;