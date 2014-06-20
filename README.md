reEnforce
=========

Software purpose:
--------
As part of the SFpark pilot project, SFMTA developed mobile software to evaluate the impact of providing real-time parking data to parking control officers. This code is web-based and written in HTML 5 with the Sencha Touch SDK, geospatial javascript libraries, and is intended to interface with OpenGeo's Geoserver. 

Functionality:
--------
1. **Visualization of real time conditions at parking spaces**
   * An interactive map-based display using icons to show different parking space statuses:
      * Not occupied, not paid
      * Not occupied, paid
      * Occupied, not paid
      * Occupied, paid
      * No data available
   * Spaces that are not expected to be in violation and that have already been visited by a PCO do not display an icon.
2. **Date collection**
   * Using touch, a user can select a map icon to read the meter ID number and report on what was done or found at the 
   parking space (known as "disposition code")
      * Example dispositions: 
         * ticket issued
         * disabled placard
         * construction permit
         * vehicle occupied
         * space closed
         * space paid
         * space empty
         * other
3. **User access and authentication**
   * Through the web deployment server, users were required to login with a unique login and password. The authentication 
   elements are not part of this code and should be set up on the deployment server.

Deployment: 
--------
This app was developed as a device-neutral, browser-based web app, and in San Francisco was deployed via 7" Andoid tablets. A product called AppGeyser was used to "wrap" the reEnforce web app and make it available as a traditional mobile application. The mobile devices were also loaded with a free Andoid app called "Super App Lock" which enabled configuration of the tablets so that only the reEnforce app was available to users. The application was also deployed to the web and could be accessed via desktop and laptop computers. 


Configuration: 
--------
Copy the application-specific OpenLayers build profile named openlayers.cfg into the externals/openlayers/build directory, or alternatively create a symbolic link if your operating system supports this (cd externals/openlayers/build followed by ln -s ../../../openlayers.cfg .)

Download closure-compiler.jar (https://developers.google.com/closure/compiler/docs/gettingstarted_app) and put it in the openlayers/tools directory. It should be named closure-compiler.jar.

Go into externals/openlayers/build and build using:

    ./build.py -c closure openlayers.cfg

Create a ProxyPass in your Apache configuration to map to the demo GeoServer instance:

    ProxyPass /geoserver <URL for geoserver instance>
    ProxyPassReverse /geoserver <URL for geoserver instance>

For debugging purposes you can change the reference in index.html to lib/OpenLayers.js instead.

For GXM and the application code the Ext Loader is used.

To use the Sencha SDK use e.g. in the root dir of your github clone:

    sencha app build testing

this will output everything needed in build/testing

To create a production build perform the following steps:

    sencha app build production

To create a war file:

    ant war
