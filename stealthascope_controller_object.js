/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *  Defines the encapsulating stealthascope controller
 *   
 * Dependencies:
 *  launchpad controller object
 *  bcfr2000 controller object
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
    this.options = this.set_options(options);
    this.instance = 0;

    this.launchpad = new Array();
    this.bcfr = new Array();

    for(var i = 0; i < this.options.lps; i++)
    {
	this.launchpad.push(new Launchpad.LaunchpadController(Launchpad.options, i));
    }

    for(var i = 0; i < this.options.bcfrs; i++)
    {
	this.bcfr.push(new BCFR.BCFRController(BCFR2000.options, i));
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

    for(var i = 0; i < this.launchpad.length; i++)
    {
	this.launchpad[i].init(this.banks);
    }

    for(var i = 0; i < this.bcfr.length; i++)
    {
	this.bcfr[i].init(this.banks);
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


}


/**\fn Stlh.StealthascopeController.prototype.onMidi
 *
 * Stealthascope controller onMidi function
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
    
    banks.cursortrack  = host.createCursorTrack(this.options.sends, 
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
    this.options = {'interfaces' : [2,2], 
		    'bcrs'       : 1,
		    'lps'        : 1,
		   };

    if(typeof options === 'object')
    {
	for(var option in options)
	{
	    this.options[option] = options[option];
	}
    }
}

