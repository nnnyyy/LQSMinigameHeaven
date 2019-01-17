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
            cb({ret: 0});
        }catch(e) {
            console.log("login", e);
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
            const info = rows[2][0];
            const gp = info['@gp'];
            const sgp = info['@sgp'];
            cb({ret: 0, gp: gp , sgp: sgp });
        });
    }
}


const _obj = new DBHelper();
module.exports = _obj;