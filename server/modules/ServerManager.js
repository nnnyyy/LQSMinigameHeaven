/**
 * Created by nnnyyy on 2018-11-22.
 */
'use strict'
const http = require('http');
const socketio = require('socket.io');
const sharedsession = require("express-socket.io-session");
const Promise = require('promise');
const P = require('../../common/protocol');
const DBHelper = require('./DBHelper');
const routes = require('../router/index.js');
const routesAuth = require('../router/Auth.js');
const routesGacha = require('../router/Gacha.js');
const BJLobby = require('./BlackjackLobby');
const GachaMan = require('./GachaManager');
const User = require('./User');

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

class ServerManager {
    constructor(app) {
        this.gcm = new GachaMan(this);

        this.http = http.Server(app);
        const sm = this;

        app.use(function(req, res, next) {
            req.sm = sm;
            next();
        } );
        app.use('/', routes );
        app.use('/auth', routesAuth);
        app.use('/gacha', routesGacha);

        this.io = socketio(this.http, {
            origins: '*:*',
            pingInterval: 5000,
            pingTimeout: 10000,
            transports: ['websocket','polling']
        });
        this.io.use(sharedsession(app.session, {autoSave: true}));        
        this.init();
    }

    init() {
        this.updateIntervalID = setInterval( ()=>{ this.update(); }, 400);
        this.pm_init_variable(this)
        .then(this.pm_init_blackjackLobby)
        .then(parent => this.listen());
    }

    pm_init_variable(parent) {
        return new Promise((res,rej)=> {
            parent.mUsers = new Map();
            res(parent);
        });
    }

    pm_init_blackjackLobby(parent) {        
        return new Promise((res,rej)=> {            
            parent.lobby = new BJLobby(parent);            
            res(parent);
        });
    }

    listen() {
        const sm = this;

        let before = '';

        let port = normalizePort(process.env.PORT || '10002');

        sm.serv_name = 'Server15';
        sm.enterLimit = -1;

        let bReleaseServer = false;

        process.argv.forEach(function(val, idx, arr) {
            if( before == '-p') {
                port = val;
            }

            if( before =='-name') {
                sm.serv_name = val;
            }

            if( val == '-release') {
                bReleaseServer = true;
            }

            before = val;
        });

        if( !bReleaseServer ) {
            port += 20000;
            console.log('###### Debug Mode ######');
        }

        this.http.listen(port, function() {
            console.log('Server listening on *:' + port);
        });

        this.io.on('connection',(socket)=>this.connectUser(socket)); 
    }

    //  #업데이트
    update() {        
        const tCur = new Date();
        try {

            const logs = this.gcm.getLogs();
            this.broadcastPacket(P.SOCK.GachaRealtimeLog,logs);

        }catch(e) {
            console.log(e);
        }
    }

     

    sendPacket( socket, protocol, data ) {
        socket.emit(protocol, data);
    }

    broadcastPacket( protocol, data ) {
        this.io.sockets.emit( protocol, data );
    }

    setPreListener( socket ) {        
        const sm = this;        
        socket.on(P.Disconnect, () => { this.onDisconnect(socket); });
    }
    
    onDisconnect(sock) {
        try {
            console.log('socket disconnected : ', sock.id);
        }catch(e) {            
        }
    }    

    //  유저가 접속합니다.
    connectUser(socket) {
        try {
        } catch(e) {
            console.log(e);
        }       
    }    
}

module.exports = ServerManager;