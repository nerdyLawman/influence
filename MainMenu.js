var preBackground;
var preMan;
var flash;

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

function flashScreen(preMan, pointer) {
	this.add.tween(flash).to({alpha: 1}, 2600, Phaser.Easing.Linear.None, true);
	flash.alpha = 1;
	
	this.time.events.add(2300, this.startGame(), this);
}

BasicGame.MainMenu.prototype = {
	
	create: function () {

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		preBackground = this.add.tileSprite(0, 0, 1611, 640, 'preloaderBackground');
		preBackground.alpha = 0;
		this.time.events.add(3500, function() {
			this.add.tween(preBackground).to({alpha: 1}, 5500, Phaser.Easing.Linear.None, true);
			}, this
		);
		
		preMan = this.add.sprite(this.world.width/3, 270, 'walkingMan');
		preMan.scale.setTo(2,2);
		preMan.animations.add('walk', [5, 6, 7, 8], 4, true);
		preMan.animations.play('walk', 6, true);
		this.time.events.add(1000, function () {
			preMan.inputEnabled = true;
			preMan.input.useHandCursor = true;
			}, this
		);
		flash = this.add.sprite(0, 0, 'flash');
		flash.aplha = 0;
		preMan.events.onInputDown.add(flashScreen, this);

	},

	update: function () {
		flash.alpha = 0;

		//	Do some nice funky main menu effect here
		preBackground.tilePosition.x -= 1;

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
