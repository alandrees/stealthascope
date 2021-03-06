/**
 * Copyright 2014-2015 Alan Drees
 *
 * Purpose:
 *  Defines the encapsulating stealthascope controller
 *
 * Dependencies:
 *  launchpad controller object
 *  bcfr2000 controller object
 *
 */

var Stlh = Stlh || {};

/**\fn Stlth.StealthascopeController
 *
 * Constructor function for the stealthascope controller object
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController = function(options)
{
    this.set_options(options);
    this.instance = 0;

    this.launchpad = new Array();
    this.bcfr = new Array();
    this.channel_display = new Array();

    var midi_instance = 0;

    var i = 0;

    Launchpad.options.tracks = options.channels;
    Launchpad.options.channels = options.channels;
    Launchpad.options.scenes = options.scenes;
    Launchpad.options.layout_order = [[[1,1],[2,2]]];

    ChannelDisplay.options.channels = Launchpad.options.tracks;

    for(i = 0; i < 1; i++)
    {
	this.launchpad.push(new Launchpad.LaunchpadController(Launchpad.options));
    }

    for(i = 0; i < this.options.lps; i++)
    {
	midi_instance++;
    }

    for(i = 0; i < this.options.bcfrs; i++)
    {
	this.bcfr.push(new BCFR2000.BCFRController(BCFR2000.options, i, midi_instance++));
    }

    for(i = 0; i < this.options.cds; i++)
    {
	this.channel_display.push(new ChannelDisplay.ChannelDisplayGroupController(ChannelDisplay.options, i, midi_instance++));
    }
}

/**\fn Stlh.StealthascopeController.prototype.init
 *
 * Stealthascope controller init function
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.prototype.init = function()
{
    this.banks = this.banks_generator();

    var i = 0;

    for(i = 0; i < this.launchpad.length; i++)
    {
	this.launchpad[i].init(this.banks);
    }

    for(i = 0; i < this.bcfr.length; i++)
    {
	this.bcfr[i].init(this.banks);
    }

    for(i = 0; i < this.channel_display.length; i++)
    {
	this.channel_display[i].init(this.banks);
	this.channel_display[i].set_parse_func(Stlh.StealthascopeController.channel_display_parser);
    }
}


/**\fn Stlh.StealthascopeController.prototype.flush
 *
 * Stealthascope controller flush function
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.prototype.flush = function()
{
    var i = 0;

    for(i = 0; i < this.launchpad.length; i++)
    {
	this.launchpad[i].flush();
    }

    for(i = 0; i < this.bcfr.length; i++)
    {
	this.bcfr[i].flush();
    }

    for(i = 0; i < this.channel_display.length; i++)
    {
	this.channel_display[i].flush();
    }
}


/**\fn Stlh.StealthascopeController.prototype.onMidi
 *
 * Stealthascope controller onMidi function //this is just a placeholder,
 * as the individual controller objects get their onmidi functions
 * bound instead
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.prototype.onMidi = function()
{

}

/**\fn Stlh.StealthascopeController.prototype.exit
 *
 * Stealthascope controller exit function
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.prototype.exit = function()
{
    for(var i = 0; i < this.launchpad.length; i++)
    {
	this.launchpad[i].exit();
    }

    for(var i = 0; i < this.bcfr.length; i++)
    {
	this.bcfr[i].exit();
    }

}


/**\fn Stlh.StealthascopeController.prototype.banks_generator
 *
 * Generates all the banks to be passed to the controller component objects
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.prototype.banks_generator = function()
{
    var banks = {};

    banks.trackbank    = host.createMainTrackBank(this.options.tracks,
						  this.options.sends,
						  this.options.scenes);

    banks.cursortrack  = host.createArrangerCursorTrack(this.options.sends,
							this.options.scenes);

    banks.cursordevice = host.createCursorDevice();
    banks.transport    = host.createTransport();

    banks.master_track = host.createMasterTrack(this.options.scenes);

    banks.application  = host.createApplication();
    return banks;
}

/**\fn Stlh.StealthascopeController.prototype.set_options
 *
 * Sets controller options
 *
 * @param options with which to set (use defaults if not set)
 *
 * @returns None
 */

Stlh.StealthascopeController.prototype.set_options = function(options)
{
    this.options = {'interfaces' : [2,3],
		    'bcrs'       : 1,
		    'lps'        : 1,
		    'tracks'     : 8,
		    'scenes'     : 8,
		    'sends'      : 3
		   };

    if(typeof options === 'object')
    {
	for(var option in options)
	{
	    this.options[option] = options[option];
	}
    }
}


/**\fn Stlh.StealthascopeController.channel_display_parser
 *
 * Static parse method to be passed to the set_parse_func method of the ChannelDisplayGroupController object
 *
 * @param title (string) the title to be parsed
 *
 * @returns (object) representing the 4 lines which it is to be parsed into
 */

Stlh.StealthascopeController.channel_display_parser = function(title)
{
    var rv = {1 : '',
	      2 : '',
	      3 : '',
	      4 : ''};

    if(typeof title === 'string')
    {
	var split = title.split(';');

	for(var i = 0; i < split.length; i++)
	{
	    rv[i] = split[i];
	}
    }

    return rv;
}
