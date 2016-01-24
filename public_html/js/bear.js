"use strict";
var DOWN = "DOWN";
var LEFT = "LEFT";
var UP = "UP";
var RIGHT = "RIGHT";

var MAX_VELOCITY = 125;
var SPRITE_SCALE = 1;
var FRAMERATE = 5;

// adjustable factors to control swarm behavior
var omega = 1.0;
var phi_p = 0.5;
var phi_g = 1.0;

var g_best = {fitness:0,x: 0, y: 0};

var Bear = function (game,x,y) {
    this.p_best = {fitness:fitness(x,y),x:x,y:y};
    
    this.sprite = game.add.sprite(x, y, 'bear');
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.scale.setTo(SPRITE_SCALE,SPRITE_SCALE);
    this.sprite.animations.add(DOWN,[0,1,2,3],FRAMERATE,true);
    this.sprite.animations.add(LEFT,[4,5,6,7],FRAMERATE,true);
    this.sprite.animations.add(UP,[8,9,10,11],FRAMERATE,true);
    this.sprite.animations.add(RIGHT,[12,13,14,15],FRAMERATE,true);
    
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.set(0.5);
    this.sprite.body.setSize(40,32,0,32);
    this.sprite.body.collideWorldBounds = true;
    
    var signx = Math.random() > 0.5 ? 1 : -1;
    var signy = Math.random() > 0.5 ? 1 : -1;
    this.sprite.body.velocity.x = signx * Math.random()*MAX_VELOCITY;
    this.sprite.body.velocity.y = signy * Math.random()*MAX_VELOCITY;
    
    sprite_group.add(this.sprite);

    this.update();
    
};
Bear.prototype.constructor = Bear;


Bear.prototype.update = function(){
    // determine fitness
    var cx = this.sprite.x;
    var cy = this.sprite.y;
    var f = fitness(cx,cy);
    
    if(f > this.p_best.fitness){
        this.p_best.fitness = f;
        this.p_best.x = cx;
        this.p_best.y = cy;
    }
    
    if(f > g_best.fitness){
        g_best.fitness = f;
        g_best.x = cx;
        g_best.y = cy;
    }
    
    var vx = this.sprite.body.velocity.x;
    var vy = this.sprite.body.velocity.y;
    
    var rpx = Math.random();
    var rpy = Math.random();
    var rgx = Math.random();
    var rgy = Math.random();
    
    if(g_best.fitness !== 0){
        vx = omega*vx + phi_p*rpx*(this.p_best.x - cx) + phi_g*rgx*(g_best.x - cx);
        vy = omega*vy + phi_p*rpy*(this.p_best.y - cy) + phi_g*rgy*(g_best.y - cy);
    }else{
        vx = omega*vx + phi_p*rpx*(this.p_best.x - cx);
        vy = omega*vy + phi_p*rpy*(this.p_best.y - cy);
    }
    
    if(vx > 0){
        this.sprite.body.velocity.x = Math.min(vx,MAX_VELOCITY);
    }else{
        this.sprite.body.velocity.x = Math.max(vx,-MAX_VELOCITY);
    }
    
    if(vy > 0){
        this.sprite.body.velocity.y = Math.min(vy,MAX_VELOCITY);
    }else{
        this.sprite.body.velocity.y = Math.max(vy,-MAX_VELOCITY);
    }
    
    this.animate();
};

// determines which animation to play based on velocity
Bear.prototype.animate = function () {
    var vx = this.sprite.body.velocity.x;
    var vy = this.sprite.body.velocity.y;
    
    if(Math.abs(vx) > Math.abs(vy)){
        if(vx > 0){
            this.facing = RIGHT;
        }else{
            this.facing = LEFT;
        }
    }else{
        if(vy > 0){
            this.facing = DOWN;
        }else{
            this.facing = UP;
        }
    }
    this.sprite.animations.play(this.facing);
};

Bear.prototype.resetPersonal = function () {
    this.p_best.fitness = 0;
    this.p_best.x = Math.random()*WIDTH;;
    this.p_best.y = Math.random()*HEIGHT;;
};


function fitness(x,y) {
    if( target === undefined ){
        return 0;
    }else{
        var r = Math.pow(x-target.sprite.x,2) + Math.pow(y-target.sprite.y,2);
        var i = r === 0 ? Infinity : 1/r;
        return i;
    }
}

function resetGlobal() {
    g_best.fitness = 0;
}