'use strict'

import {Container} from 'pixi.js'
import {WebGLRenderer} from 'pixi.js'
import {Sprite} from 'pixi.js'
import {Graphics} from 'pixi.js'
import {Filter} from 'pixi.js'
import {Matrix} from 'pixi.js'


class PixiTitleCanvas {
    constructor() {
    }

    create(width, height, element) {        
        cvs.width = width
        cvs.height = height
        this.renderer = new PIXI.WebGLRenderer(element.width, element.height, {backgroundColor : 0xff007f, view: element, antialias: true} )
        this.container = new Container();        

        this.basicText = new PIXI.Text('Basic text in pixi');
        this.basicText.x = 0;
        this.basicText.y = 0;

        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.hitArea = new PIXI.Rectangle(0,0, width, height);
        this.container.on('pointerdown', (e)=> {
            this.moveObject(e.data.global.x, e.data.global.y, this.basicText);
            
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

        this.moveText();
    }

    update(time) {
        this.renderer.render(this.container);        
    }

    resize(width, height) {
        this.renderer.resize(width,height);
        this.container.hitArea = new PIXI.Rectangle(0,0, width, height);
    }

    moveObject(x,y, obj) {        
        if( !obj ) return;
        const dx = (x - obj.x)/20;
        const dy = (y - obj.y)/20;    
        
        this.moveObjectNext(dx, dy, x, y, obj);
    }

    moveObjectNext(dx, dy, destX, destY, obj) {        
        obj.x += dx;
        obj.y += dy;        

        if( ( dx >= 0 && obj.x >= destX ) || 
            ( dx < 0 && obj.x <= destX ) ) 
            {

            }
        else {
            requestAnimationFrame(() => {
                this.moveObjectNext(dx, dy, destX, destY, obj);
            });            
        }        

        this.renderer.render(this.container);
    }

    moveText() {
        this.moveObject(100,200, this.basicText);
    }
}

const _obj = new PixiTitleCanvas();

export default _obj