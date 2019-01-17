/**
 * Created by nnnyyy on 2018-11-23.
 */
'use strict';

const express = require('express');
const Router = express.Router();
const DBHelper = require('../modules/DBHelper');

Router.use((req,res,next)=> {
    if( !req.session.user ) {
        res.send({ret: -101});
        return;
    }

    req.user = req.session.user;
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

module.exports = Router;