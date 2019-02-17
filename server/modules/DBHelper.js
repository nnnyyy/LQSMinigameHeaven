/**
 * Created by nnnyy on 2018-11-27.
 */

class DBHelper {
    constructor() {
        this.sql = require('./MySQL');
        this.init();
    }

    init() {
    }

    login(id, pw, ip, cb) {
        try {
            this.sql.query("CALL login(?,?,?, @ret); select @ret;", [id, pw, ip] , function(err, rows) {
                if(err) {
                    console.log('error : ' + err);
                    cb({ret: -99});
                    return;
                }

                var ret = rows[rows.length - 1][0]['@ret'];
                var data = rows[0][0];
                cb({id: data.id, nick: data.nick, auth: data.auth_state, adminMemberVal: data.adminMemberVal, ret: ret});
            });
        }catch(err) {

            cb({ret: -99});
        }
    }

    getUserInfo(id, cb) {
        //  getBanCnt, getActivePoint 를 통합
        try {
            this.sql.query("CALL getUserInfo( ? )", [id], function(err, rows) {
                try {
                    if(err) {
                        console.log('error : ' + err);
                        cb({ret: -99});
                        return;
                    }
    
                    const IDX = {
                        OXWIN_CNT: 0,
                        BAN_CNT: 1, 
                        ACTIVE_POINT: 3
                    };
    
                    let info = {
                        oxwincnt: rows[IDX.OXWIN_CNT][0].cnt,
                        bancnt: rows[IDX.BAN_CNT][0].bancnt,
                        ap: rows[IDX.ACTIVE_POINT][0] ? rows[IDX.ACTIVE_POINT][0].ap : 0
                    }
    
                    cb({ret: 0, info: info });
                }
                catch(e) {
                    console.log(e);
                    cb({ret: -99 });
                }                
            });
        }catch(err) {

        }
    }

    call( procname, cb) {
        try {
            this.sql.query("CALL " + procname + "()", function(err, rows) {
                 if(err) {
                    console.log('error : ' + err);
                    if( cb ) cb({ret: -99});
                    return;
                }
    
                if( cb ) {                    
                    cb({ret: 0, rows: rows});
                }
            });            
        }catch(err) {
            if( cb ) cb({ret: -1});            
        }        
    }

    call2( procname, params, cb) {
        try {            
            let paramQ = '';
            for( let i = 0 ; i < params.length ; ++i ) {
                paramQ += '?';
                if( i + 1 < params.length) {
                    paramQ +=',';
                }
            }
            this.sql.query("CALL " + procname + "(" + paramQ + ")", params, function(err, rows) {
                 if(err) {
                    console.log('error : ' + err);
                    if( cb ) cb({ret: -99});
                    return;
                }
    
                if( cb ) {                    
                    cb({ret: 0, rows: rows});
                }
            });            
        }catch(err) {
            if( cb ) cb({ret: -1});            
        }        
    }

    getGachaPoint( id, cb ) {
        this.sql.query("CALL getGachaPoint(?, @gp, @sgp); SELECT @gp, @sgp", [id], (err, rows)=> {
            if( err ) {
                if( cb ) cb({ret: -99});
                return;
            }
            const info = rows[2][0];
            const gp = info['@gp'];
            const sgp = info['@sgp'];
            cb({ret: 0, gp: gp , sgp: sgp });
        });
    }
}


const _obj = new DBHelper();
module.exports = _obj;