loadAPI(1);
/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *   Stealthascope controller implementation
 *
 * Requires:
 */


load('bcfr2000/bcfr2000_options.js');
load('bcfr2000/bcfr2000_controller_object.js');
load('bcfr2000/bcf2000_object.js');
load('bcfr2000/bcr2000_object.js');
load('bcfr2000/bc_controls.js');

load('icc/icc_core.js');
load('icc/icc_icc_controller.js');
load('icc/icc_param_object.js');

load('launchpad/launchpad_constants.js');
load('launchpad/launchpad_controller_object.js');
load('launchpad/launchpad_grid.js');
load('launchpad/launchpad_options.js');
load('launchpad/launchpad_page.js');

load('stealthascope_controller_object.js');
load('stealthascope_constants.js');
load('stealthascope_options.js');

host.defineController("Stealthascope", "Stealthascope", "1.0", "C5486FC8-393D-44A2-83CF-F4B7824DB6AD");
host.defineMidiPorts(Stlh.options.interfaces[0],
		     Stlh.options.interfaces[1]);

//do stuff here to bind named interfaces to the right ports
/*
for(var pair_index in BCFR2000.options.discoveryname)
{
    var pair_array = BCFR2000.options.discoveryname[pair_index];
    host.addDeviceNameBasedDiscoveryPair([pair_array[0]],[pair_array[1]]);
}
*/

var controllers = new Array();
var icc_network = new Array();

var banks = {};

icc_network.push(ICC.create_new_icc_network('stealthascope'));

controllers[0] = new Stlh.StealthascopeController(Stlh.options);


/*************/
/* functions */
/*************/

/**\fn init
 *
 * init function entry point wrapping the controller components
 *
 * @param None
 *
 * @returns None
 */

function init()
{
    for(var i = 0; i < controllers.length; i++)
    {
	controllers[i].init();	
    }
	
}


/**\fn flush
 *
 * wrapper function to handle flushing data to the controller
 *
 * @param None
 *
 * @returns None
 */

function flush()
{
    for(var i = 0; i < controllers.length; i++)
    {
	controllers[i].flush();
    }
}


/**\fn exit
 *
 * wrapper function to handle the the exit event when the program exits/controller
 * gets removed from the program
 *
 * @param None
 *
 * @returns None
 */

function exit()
{
    for(var i = 0; i < controllers.length; i++)
    {
	controllers[i].exit();
    }    
}
