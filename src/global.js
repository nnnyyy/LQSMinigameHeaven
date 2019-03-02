/**
 * Created by nnnyyy on 2018-11-21.
 */
'use strict';

import P from '../common/protocol';
import $ from 'jquery'

class Global {
    constructor() {
        this.v = new Vue();     
        
        this.GTYPE = {
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
            OX_BIG: 300
        }
    }

    getGachaTypeName( gtype ) {
        switch( gtype ) {
            case this.GTYPE.BOX: return '포인트';
            case this.GTYPE.FONTCOLOR: return '폰트 컬러';
            case this.GTYPE.NICKSHADOW: return '닉네임 효과';
            case this.GTYPE.BLINK: return '투명 반짝이 효과';
            case this.GTYPE.RAINBOWNICK: return '무지개 닉네임 효과';
            case this.GTYPE.YELLOWBLINK: return '노란 반짝이 효과';
            case this.GTYPE.EARN_GP: return 'GP 50 획득';
            case this.GTYPE.EARN_GP_TYPE2: return 'GP 1000 획득';
            case this.GTYPE.FONT_FAMILY: return '글씨체';
            case this.GTYPE.OX_BIG: return 'OX 아이콘 거대화';
        }
    }

    connectSocket() {
        console.log('socket connecting...');
        this.socket = io();
        this.initSocketListener();
    }

    initSocketListener() {
    }

    on( protocol, cb ) {
        this.v.$bus.$on(protocol, cb);
    }

    emit( protocol, data ) {
        this.v.$bus.$emit(protocol, data);
    }

    hget( addr, cb ) {
        this.v.$http.get(addr).then(res => cb(res.data))
        .catch(err => console.log(err));
    }

    hpost( addr, item, cb ) {        
        this.v.$http.post(addr, item).then(res => cb(res.data))
        .catch(err => console.log(err));
    }
    
    sendPacket( protocol, packetData ) {
        this.socket.emit(protocol, packetData);
    }

    routePacket( protocol, packet ) {
        this.v.$bus.$emit(protocol, packet);
    }

    isMobile() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // is mobile..
            return true;
        }

        return false;
    }
}

const GlobalObject = new Global();

export default GlobalObject