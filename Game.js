var mainBackground;
var walkingMan;
var buttonOne;
var but
var buttonTwo;
var buttonThree;
var bgSpeed = 1;
var walkSpeed = 4;
var positive;


BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

};

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //active: function() { this.game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['VT323']
    }

};

// Object of Influence - move out of game.js eventually
InfluenceCard = function (game, x, y, label) {
	Phaser.Sprite.call(this, game, x, y, 'card');
	this.label = label;
}

function positiveClick (buttonOne, pointer) {
	bgSpeed += 0.25;
	walkSpeed += 1;
	walkingMan.animations.currentAnim.speed = walkSpeed;
}

function negativeClick (buttonTwo, pointer) {
	if (bgSpeed > 0) {
		bgSpeed -= 0.25;
	}
	if (walkSpeed > 0) {
		walkSpeed -= 1;
	}
	walkingMan.animations.currentAnim.speed = walkSpeed;
}

//EXAMPLY OII Call
//var happy = new InfluenceCard(game, x, y, 'happy');

BasicGame.Game.prototype = {

    create: function () {
	    
	    mainBackground = this.add.tileSprite(0, 0, 1611, 640, 'desert');

		walkingMan = this.add.sprite(this.world.width/3, 270, 'walkingMan');
		walkingMan.scale.setTo(2,2);
		walkingMan.animations.add('walk', [5, 6, 7, 8], walkSpeed, true);
		walkingMan.animations.play('walk', 6, true);
		
		//var buttonOne = new InfluenceCard(this.game, 100, 200, 'happy');
		//this.add.existing(buttonOne);
		buttonOne = this.add.sprite(30, 30, 'card');
		buttonOne.scale.setTo(2,2);
		buttonOne.inputEnabled = true;
		buttonOne.input.useHandCursor = true;
		buttonOne.events.onInputDown.add(positiveClick, this);
		
		buttonTwo = this.add.sprite(buttonOne.x + buttonOne.width + 30, 30, 'card');
		buttonTwo.scale.setTo(2,2);
		buttonTwo.inputEnabled = true;
		buttonTwo.input.useHandCursor = true;
		buttonTwo.events.onInputDown.add(negativeClick, this);
		
		buttonThree = this.add.sprite(buttonTwo.x + buttonOne.width + 30, 30, 'card');
		buttonThree.scale.setTo(2,2);
		this.createText();

    },
    
    createText: function() {
	    positive = this.add.text(buttonOne.x + buttonOne.width/2, buttonOne.y + buttonOne.height/2, 'POSITIVE INFLUENCE');
		positive.anchor.setTo(0.5, 0.5);
		positive.fill = '#fff';
		positive.font = 'VT323';
		positive.fontSize = 26;
		positive.align = 'center';
		positive.strokeThickness = 0;
		positive.stroke = '#ccc';
		
		negative = this.add.text(buttonTwo.x + buttonTwo.width/2, buttonTwo.y + buttonTwo.height/2, 'NEGATIVE INFLUENCE');
		negative.anchor.setTo(0.5, 0.5);
		negative.fill = '#fff';
		negative.font = 'VT323';
		negative.fontSize = 26;
		negative.align = 'center';
		negative.strokeThickness = 0;
		negative.stroke = '#ccc';
    },

    update: function () {

        mainBackground.tilePosition.x -= bgSpeed;

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
