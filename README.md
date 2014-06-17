SFenforce
=========

Copy the application-specific OpenLayers build profile named openlayers.cfg into the externals/openlayers/build directory, or alternatively create a symbolic link if your operating system supports this (cd externals/openlayers/build followed by ln -s ../../../openlayers.cfg .)

Download closure-compiler.jar (https://developers.google.com/closure/compiler/docs/gettingstarted_app) and put it in the openlayers/tools directory. It should be named closure-compiler.jar.

Go into externals/openlayers/build and build using:

    ./build.py -c closure openlayers.cfg

Create a ProxyPass in your Apache configuration to map to the demo GeoServer instance:

    ProxyPass /geoserver http://sfpark.demo.opengeo.org/geoserver
    ProxyPassReverse /geoserver http:/sfpark.demo.opengeo.org/geoserver

For debugging purposes you can change the reference in index.html to lib/OpenLayers.js instead.

For GXM and the application code the Ext Loader is used.

To use the Sencha SDK use e.g. in the root dir of your github clone:

    sencha app build testing

this will output everything needed in build/testing

To create a production build perform the following steps:

    sencha app build production

To create a war file:

    ant war
