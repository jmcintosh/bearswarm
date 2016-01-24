"use strict";
var WIDTH = screen.width;
var HEIGHT = screen.height;

var bears = [];

var sprite_group;

var target;


var game = new Phaser.Game(
        WIDTH, 
        HEIGHT, 
        Phaser.AUTO, 
        'body', 
        { preload: preload, create: create, update: update }
);

function preload() {    
    this.stage.backgroundColor = "#FFFFFF";
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(true,false);
    this.load.spritesheet('bear', 'img/bear.png', 64, 64);
    this.load.spritesheet('lady', 'img/lady.png', 36, 52);
    this.load.spritesheet('guy', 'img/guy.png', 36, 52);
}

function create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.input.onDown.add(handleClick, this);
    
    sprite_group = this.add.group();
    
    for(var i = 0; i < 30; i++){
        var x = Math.random()*WIDTH;
        var y = Math.random()*HEIGHT;
        bears.push( new Bear(this,x,y) );
    }
    
    function updateBears() {
        bears.forEach(function(bear){bear.update();});
    }
    
    window.setInterval(updateBears, 200);
}

function update() {
    sprite_group.sort('y', Phaser.Group.SORT_ASCENDING);
    
    game.physics.arcade.collide(sprite_group,sprite_group);
}


function handleClick() {
    resetGlobal();
    
    bears.forEach(function(bear){bear.resetPersonal();});
    
    if(target === undefined ){
        target = new Target(game,game.input.x,game.input.y);
    }else {
        target.destroy();
    }
}