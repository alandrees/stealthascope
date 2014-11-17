stealthascope
=============

Compound controller incorporating the BCFR2000 and the stripped-down Launchpad.

This controller script is dependant on the bcfr2000 script (https://github.com/alandrees/bitwig-bcfr2000), the icc system (https://github.com/alandrees/bitwig-icc) and the launchpad script (https://github.com/alandrees/novation-launchpad).  The controller repositories are required to have the  component-controller branch checked-out.

These are managed independantly, so they aren't submodules (they only exist in the .gitignore file), and you have to make sure they are the right version.

Input 1 (input 1, output 1) is the launchpad, and input 2 (input 2, output 2) is the BCRF2000.
