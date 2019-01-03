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
    }

    moveObject(x,y, obj) {        
        if( !obj ) return;
        if( x - obj.x ) {
            obj.x += (x / 20);
        }
        else {
            obj.x -= (x / 20);
        }
        
        if( y - obj.y ) {
            obj.y += (y / 20);
        }
        else {
            obj.y -= (y / 20);            
        }

        if( obj.x >= x ) {
            return;
        }        
        
        requestAnimationFrame(() => {
            this.moveObject(x, y, obj);
        });

        this.renderer.render(this.container);
    }

    moveText() {
        this.moveObject(100,200, this.basicText);
    }
}

const _obj = new PixiTitleCanvas();

export default _obj