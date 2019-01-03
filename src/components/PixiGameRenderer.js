'use strict'

import {Container} from 'pixi.js'
import {WebGLRenderer} from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Graphics} from 'pixi.js'
import {Filter} from 'pixi.js'
import {Matrix} from 'pixi.js'

class PixiUtil {
    constructor() {}

    static fadein(obj) {
        
        if( obj.alpha >= 1.0 ) {
            obj.alpha = 1.0;
            return;
        }

        obj.alpha += .03;
        
        requestAnimationFrame(() => {
            PixiUtil.fadein(obj);
        });     
        
        //this.renderer.render(this.container);
    }    

    static fadeout(obj) {
        
        if( obj.alpha <= 0.0 ) {
            obj.alpha = 0.0;
            return;
        }

        obj.alpha -= .03;
        
        requestAnimationFrame(() => {
            PixiUtil.fadeout(obj);
        });
    } 

    static move(destX, destY, spd, obj) {
        if( !obj || obj.isMoving ) return;
        if( spd >= 20 ) {
            spd = 20;
        }
        obj.isMoving = true;
        const dx = (destX - obj.x)/(20 - spd + 1);
        const dy = (destY - obj.y)/(20 - spd + 1);    
        
        PixiUtil.moveNext(dx, dy, destX, destY, obj);        
    }

    static moveNext(dx, dy, destX, destY, obj) {        
        obj.x += dx;
        obj.y += dy;        

        if( ( dx >= 0 && obj.x >= destX ) || 
            ( dx < 0 && obj.x <= destX ) ) 
            {
                obj.x = destX;
                obj.y = destY;
                obj.isMoving = false;
            }
        else {
            requestAnimationFrame(() => {
                PixiUtil.moveNext(dx, dy, destX, destY, obj);
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
        this.renderer = new PIXI.WebGLRenderer(element.width, element.height, {backgroundColor : 0xff007f, view: element, antialias: true} )
        this.container = new Container();      
        
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 20,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,            
            align: 'center'
        });

        this.basicText = new PIXI.Text('과연 픽시는 어느정도의 성능을 낼 수 있을까요? 굉장히 궁금합니다.', style);
        this.basicText.x = width / 2;
        this.basicText.y = 0;
        this.basicText.anchor.x = 0.5;     
        this.basicText.anchor.y = 0;        
        this.basicText.alpha = 0.0;

        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.hitArea = new PIXI.Rectangle(0,0, width, height);
        this.container.on('pointerdown', (e)=> {
            PixiUtil.move(e.data.global.x, e.data.global.y, PixiUtil.getRandomInt(10,14), this.basicText);
            if(this.basicText.alpha <= 0.0 )
                PixiUtil.fadein(this.basicText);
            else 
                PixiUtil.fadeout(this.basicText);
            
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
}

const _obj = new PixiMain();

export default _obj