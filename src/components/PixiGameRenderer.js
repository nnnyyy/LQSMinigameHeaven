'use strict'

import {Container} from 'pixi.js'
import {WebGLRenderer} from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Graphics} from 'pixi.js'
import {Filter} from 'pixi.js'
import {Matrix} from 'pixi.js'
import Promise from 'promise'

class PixiUtil {
    constructor() {}

    static fadein(obj, forced, cb) {
        if( forced ) obj.alpha = 0;

        if( obj.alpha >= 1.0 ) {
            obj.alpha = 1.0;
            if( cb ) {
                cb();
            }
            return;
        }

        obj.alpha += .02;
        
        requestAnimationFrame(() => {
            PixiUtil.fadein(obj, false, cb);
        });     
        
        //this.renderer.render(this.container);
    }    

    static fadeout(obj, forced, cb) {        
        if( forced ) obj.alpha = 1;
        
        if( obj.alpha <= 0.0 ) {
            obj.alpha = 0.0;
            if( cb ) {
                cb();
            }
            return;
        }

        obj.alpha -= .02;
        
        requestAnimationFrame(() => {
            PixiUtil.fadeout(obj, false, cb);
        });
    } 

    static move(destX, destY, spd, obj, cb) {
        if( !obj || obj.isMoving ) return;
        if( spd >= 20 ) {
            spd = 20;
        }
        obj.isMoving = true;
        const dx = (destX - obj.x)/(20 - spd + 1);
        const dy = (destY - obj.y)/(20 - spd + 1);    
        
        PixiUtil.moveNext(dx, dy, destX, destY, obj, cb);        
    }

    static moveNext(dx, dy, destX, destY, obj, cb) {        
        obj.x += dx;
        obj.y += dy;        

        if( ( dx >= 0 && obj.x >= destX ) || 
            ( dx < 0 && obj.x <= destX ) ) 
            {
                obj.x = destX;
                obj.y = destY;
                obj.isMoving = false;
                if( cb ) {
                    cb();
                }
            }
        else {
            requestAnimationFrame(() => {
                PixiUtil.moveNext(dx, dy, destX, destY, obj, cb);
            });            
        }        

        //this.renderer.render(this.container);
    }

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class PixiMain {
    constructor() {
    }    

    create(width, height, element) {        
        cvs.width = width
        cvs.height = height
        this.renderer = new PIXI.WebGLRenderer(element.width, element.height, {backgroundColor : 0xffffff, view: element, antialias: true} )
        this.container = new Container();      
        
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,            
            fontWeight: 'bold',
            fill: ['#ffffff', '#ff007f'], // gradient
            stroke: '#000000',
            strokeThickness: 5,            
            wordWrap: true,
            wordWrapWidth: width >= 600 ? 600 : width,
            breakWords: true,                     
            align: 'center'
        });

        this.basicText = new PIXI.Text('문제 내기 전', style);
        this.basicText.x = width / 2;
        this.basicText.y = 10;
        this.basicText.anchor.x = 0.5;     
        this.basicText.anchor.y = 0;        
        this.basicText.alpha = 0.0;                

        PixiUtil.fadein(this.basicText);

        this.container.interactive = true;        
        this.container.hitArea = new PIXI.Rectangle(0,0, width, height);        

        this.container.on('pointerdown', () => { 
            this.setTitle('변경된 타이틀 변경된 타이틀 변경된 타이틀 변경된 타이틀 변경된 타이틀 변경된 타이틀 변경된 타이틀 변경된 타이틀 변경된 타이틀 ');
        });

        this.container.addChild(this.basicText);                
        

        let ticker = PIXI.ticker.shared;
        // Set this to prevent starting this ticker when listeners are added.
        // By default this is true only for the PIXI.Ticker.shared instance.
        ticker.autoStart = false;
        // FYI, call this to ensure the ticker is stopped. It should be stopped
        // if you have not attempted to render anything yet.
        ticker.stop();
        // Call this when you are ready for a running shared ticker.
        ticker.start();

        ticker.add( time => {
            this.update(time);
        });
    }

    update(time) {
        this.renderer.render(this.container);        
    }

    resize(width, height) {
        this.renderer.resize(width,height);
        this.container.hitArea = new PIXI.Rectangle(0,0, width, height);
    }    

    setTitle(sTitle) {
        new Promise( (res, rej) => {
            PixiUtil.fadeout(this.basicText, true, () => {                
                res();
            })            
        })
        .then(()=> {
            return new Promise((res,rej)=> {
                this.basicText.text = sTitle;
                setTimeout(()=>{ res() }, 400);                
            });
        })
        .then(()=> {
            PixiUtil.fadein(this.basicText, true, ()=> {

            })
        });
        
    }
}

const _obj = new PixiMain();

export default _obj