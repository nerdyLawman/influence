var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {
	    
		this.state.add('Preloader', BasicGame.Preloader);
		this.state.add('MainMenu', BasicGame.MainMenu);
		this.state.add('Game', BasicGame.Game);

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  DESKTOP FRAME SETTINGS
            this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			this.scale.refresh();
        }
        else
        {
            //  MOBILE FRAME SETTINGS
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    },

    preload: function () {

        //  Load the assets required for preloader
        this.load.image('preloaderBackground', 'assets/preloader_background.png');
        //this.load.image('preloaderBar', 'assets/firststeps.png');
        this.load.spritesheet('walkingMan', 'assets/firststeps.png', 24, 32);

    },

    create: function () {

        //  Start the preloader going
        this.state.start('Preloader');

    }

};
