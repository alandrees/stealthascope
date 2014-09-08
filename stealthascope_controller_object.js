/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *  Defines the encapsulating stealthascope controller
 *   
 * Requires:
 */

var Stlh = Stsc || {};

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

/**\fn Stlh.StealthascopeController.init
 *
 * Stealthascope controller init function
 * 
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.init = function()
{


}


/**\fn Stlh.StealthascopeController.flush
 *
 * Stealthascope controller flush function
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.flush = function()
{


}


/**\fn Stlh.StealthascopeController.onMidi
 *
 * Stealthascope controller onMidi function
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.onMidi = function()
{


}


/**\fn Stlh.StealthascopeController.exit
 *
 * Stealthascope controller exit function
 *
 * @param None
 *
 * @returns None
 */

Stlh.StealthascopeController.exit = function()
{


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
    this.options = {'inputs' : [2,2], 
		    'bcrs'   : 1,
		    'lps'    : 1,
		   };

    if(typeof options === 'object')
    {
	for(var option in options)
	{
	    this.options[option] = options[option];
	}
    }
}

