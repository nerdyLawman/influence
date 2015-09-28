
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

function flashScreen(preMan, pointer) {
	this.add.tween(this.flash).to({alpha: 1}, 2600, Phaser.Easing.Linear.None, true);
	this.flash.alpha = 1;
	
	this.time.events.add(2300, function() {
		this.startGame();
		}, this
	);
}

BasicGame.MainMenu.prototype = {
	
	create: function () {

		//this.music = this.add.audio('titleMusic');
		//this.music.play();

		//this.add.sprite(0, 0, 'titlepage');

		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		this.preBackground = this.add.tileSprite(0, 0, 1611, 640, 'preloaderBackground');
		this.preBackground.alpha = 0;
		this.time.events.add(4700, function() {
			this.add.tween(this.preBackground).to({alpha: 1}, 5500, Phaser.Easing.Linear.None, true);
			}, this
		);
		this.preMan = this.add.sprite(this.world.width/3, 270, 'walkingMan');
		this.preMan.scale.setTo(2,2);
		this.preMan.animations.add('walk', [5, 6, 7, 8], 4, true);
		this.preMan.animations.play('walk', 6, true);
		this.preMan.inputEnabled = true;
		this.preMan.input.useHandCursor = true;
		this.preMan.events.onInputDown.add(flashScreen, this);
		
		this.flash = this.add.sprite(0, 0, 'flash');
		this.flash.aplha = 0;

	},

	update: function () {
		this.flash.alpha = 0;

		//	Do some nice funky main menu effect here
		this.preBackground.tilePosition.x -= 1;

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
