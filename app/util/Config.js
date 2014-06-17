Ext.define('SFenforce.util.Config', {
    singleton : true,

    config : {
        /**
         * @cfg {Array} bounds
         * The bounds of the all the beats in EPSG:900913.
         */
        bounds: [-13630460.905642, 4544450.3840456, -13624163.334642, 4552410.6141212],

        /**
         * @cfg {String} geoserverUrl
         * The URL where GeoServer WMS/WFS can be accessed. This needs to be on the same origin as the web app.
         */
        geoserverUrl: '/geoserver/ows',

        /**
         * @cfg {String} featureNS
         * The namespace URI used on the WFS.
         */
        featureNS: 'http://sfpark.org',

        /**
         * @cfg {String} prefix
         * The prefix of the namespace.
         */
        prefix: "sfpark",

        /**
         * @cfg {Integer} defaultDispositionValue
         * The default value to use in the disposition code combo box.
         */
        defaultDispositionValue: 1,

        /**
         * @cfg {Array} featurePopupOffset
         * The offset in the X and Y direction of the feature popup wrt the feature itself.
         */
        featurePopupOffset: [15, 15],

        /**
         * @cfg {Array} featurePopupSize
         * The width and height of the feature popup.
         */
        featurePopupSize: [350, 150],

        /**
         * @cfg {Array} legendSize
         * The width and height of the legend popup.
         */
        legendSize: [400, 300],
        
        /**
         * @cfg {Number} geolocationZoomLevel
         * The new zoom level of the map after selecting 'zoom to my location'
         */
        geolocationZoomLevel: 18,
        
        /**
         * @cfg {RegEx} badgeFormat
         * A regex for validating the badge number
         */
        badgeFormat: /^\d+$/,

        /** classification */
        unpaidColor: "#FF0000",
        occupiedColor: "#EFEF20",
        citedColor: "#22FF11",
        selectedStrokeColor: "blue",
        /* point size in meters */
        pointSize: 5,
        /* minimum point radius in pixels */
        minPointRadius: 3,
        /* hit ratio for better touch selection */
        hitRatio: 2.5,
        unpaidRuleFilter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "METER_EXPIRED_FLAG",
            value: 1
        }),
        commercialRuleFilter: new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters:[
                new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "COMMERCIAL_OCCUPIED_FLAG",
                    value: 1
                }),
                new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
                    property: "METER_EXPIRED_FLAG",
                    value: 1
                })
            ]
        }), 
        citedRuleFilter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "DISPOSITION_CODE",
            value: 1
        }),
        /** end classification */

        /** data model */
        beatField: "PCO_BEAT",
        parkingSessionField: "PARKING_SESSION_ID",
        dispositionCodeField: "DISPOSITION_CODE",
        dispositionFlagField: "DISPOSITION_CODE_FLAG",
        badgeField: "PCO_BADGE_NO",
        entryDateField: "DISPOSITION_ENTRY_DT",
        lastUpdatedProgramField: "LAST_UPD_PGM",
        lastUpdatedProgramValue: "Mobile device",
        lastUpdatedUserField: "LAST_UPD_USER",
        defaultLastUpdatedUser: "Mobile User",
        citationView: "CITATION_OPPORTUNITY_VW",
        citationGeomField: "GEOM",
        updateTable: "RT_CITATION_OPPORTUNITY",
        opportunityIdFields: ['MTR_EXPIRED_OPP_ID', 'COMML_OCC_OPP_ID'],
        beatNameField: "BEATNAME",
        dispositionCodeLookupValueField: "VALUE",
        dispositionCodeLookupTextField: "DESCRIPTION",
        dispositionCodeSpecialField: "SPEC_HANDLING_FLAG",
        beatsFeatureType: "PCO_BEATS",
        dispositionCodesFeatureType: "DISPOSITION_CODES_TMP",
        /** end data model */

        /** i18n */
        featureInfoEmptyText: "Select a space.",
        noDataLayerName: "No Data Spaces",
        citationLayerName: "Citation opportunities",
        badgeValidationMsg: "Please enter badge number",
        loginNameLabel: "Badge Number",
        loginNamePlaceholder: "(Required)",
        loginBeatsLabel: "Beats",
        loginBeatsPlaceholder: "Select Beats",
        loginButtonText: "Next",
        loginZoomToLabel: "Zoom To",
        loginMyBeatsLabel: "My Beats",
        loginAllBeatsLabel: "All Beats",
        loginMyLocationLabel: "My Location",
        backToLoginText: "Back",
        unpaidRuleTitle: "Unpaid vehicle",
        commercialRuleTitle: "Vehicle at commercial space",
        selectedTitle: "Selected",
        scheduledTitle: "Scheduled for deletion",
        citedRuleTitle: "Vehicle already visited",
        noDataRuleTitle: "Data unavailable, check in field",
        dispositionCodeLabel: "Category",
        saveButtonText: "Submit",
        saveLoadMask: "Submitting...",
        doneButtonText: "Done",
        errorTitle: "Sorry, but an error occurred.",
        transactionErrorText: "An error occurred - please try saving again.",
        transactionSuccessText: "Submitted.",
        gpsErrorMsg: "GPS unavailable. Please try again later.",
        /** end i18n */

        /** private properties */
        beatsBounds: null,
        scheduled: []
        /** end private properties */
    },

    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
