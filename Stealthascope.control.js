loadAPI(1);
/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *   Stealthascope controller implementation
 *
 * Requires:
 */


load('bcfr200/bcfr2000_options.js');
load('bcfr200/bcfr2000_controller_object.js');
load('bcfr200/bcf2000_object.js');
load('bcfr200/bcr2000_object.js');
load('bcfr200/bc_controls.js');

load('icc/icc.js');
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

host.defineController("Stealthascope", "Stealthascope", "0.0", "C5486FC8-393D-44A2-83CF-F4B7824DB6AD");
host.defineMidiPorts(, 2);

for(var pair_index in BCFR2000.options.discoveryname)
{
    var pair_array = BCFR2000.options.discoveryname[pair_index];
    host.addDeviceNameBasedDiscoveryPair([pair_array[0]],[pair_array[1]]);
}

var controllers = new Array();
var icc_network = new Array();

var banks = {};

icc_network.push(ICC.create_new_icc_network('stealthascope'));

controllers[0] = new Stlh


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

}

function onmidi()
{


}

function flush()
{

}
