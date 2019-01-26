/**
 * Created by nnnyyy on 2018-11-23.
 */
'use strict';

const express = require('express');
const Router = express.Router();
const DBHelper = require('../modules/DBHelper');

Router.get('/checklogin', function(req, res, next) {    
    res.send({ret: req.session.userdata ? 0 : -1 });
});

Router.get('/logout', function(req, res, next) {    
    delete req.session.userdata;
    req.session.save();
    
    res.send({ret: 0});
});

//  로그인 처리
Router.post('/login', function(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.substr(7);
    new Promise(function(resolve, reject) {
        DBHelper.login(req.body.id, req.body.pw, ip, function(result) {
            //{id: data.id, nick: data.nick, auth: data.auth_state, adminMemberVal: data.adminMemberVal, ret: ret}
            if( result.ret != 0 ) {
                res.send({ret: -1});
                return;
            }
            const userinfo = {
                id: result.id,
                nick: result.nick,
                level: result.auth,
                adminLevel: result.adminMemberVal,
                point: 0
            };

            const data = {
                userinfo: userinfo,
                ret: result.ret
            };

            resolve(data);
        })
    })
        .then(function(data) {
            return new Promise(function(resolve, reject) {
                DBHelper.getUserInfo(data.userinfo.id, function(result) {
                    if( result.ret != 0 ) {
                        res.send({ret: -2});
                    }
                    else {
                        data.userinfo.oxwincnt = result.info.oxwincnt;
                        data.userinfo.banCnt = result.info.bancnt;
                        data.userinfo.point = result.info.ap;

                        req.session.userdata = data.userinfo;
                        req.session.save();

                        //Logger.i(`[login] ${data.userinfo.id} / ${data.userinfo.nick} / ${data.userinfo.level} / ${data.userinfo.adminLevel} / ${data.userinfo.point}`);

                        res.send({ret: 0});
                    }
                });
            });
        })
        .catch(function(err) {
            res.send({ret: -99});
        });
});

module.exports = Router;