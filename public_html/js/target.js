"use strict";


var Target = function(game,x,y,group) {
    
    var sprite_name = "guy";
    if(Math.random() > 0.5){
        sprite_name = "lady";
    }
    this.sprite = game.add.sprite(x, y, sprite_name);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.z = 0;
    
    this.sprite.scale.setTo(SPRITE_SCALE,SPRITE_SCALE);
    this.sprite.animations.add('main',[0,1],FRAMERATE/2,true);
    this.sprite.animations.play('main');
    
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.setSize(18,26,0,20);
    
    
    group.add(this.sprite);
};

Target.prototype.getX = function() {
    return this.sprite.x;
};

Target.prototype.getY = function() {
    return this.sprite.y;
};

Target.prototype.destroy = function() {
    this.sprite.destroy();
    target = undefined;
};

Target.prototype.setLocation = function (x,y) {
    this.sprite.x = x;
    this.sprite.y = y;
};