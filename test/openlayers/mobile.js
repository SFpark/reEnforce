var map;

function init() {
    var options = {
        projection: "EPSG:900913",
        maxExtent: new OpenLayers.Bounds(
            -128 * 156543.0339, -128 * 156543.0339,
            128 * 156543.0339, 128 * 156543.0339
        ),
        maxResolution: 156543.03390625,
        resolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
            19567.87923828125, 9783.939619140625, 4891.9698095703125,
            2445.9849047851562, 1222.9924523925781, 611.4962261962891,
            305.74811309814453, 152.87405654907226, 76.43702827453613,
            38.218514137268066, 19.109257068634033, 9.554628534317017,
            4.777314267158508, 2.388657133579254, 1.194328566789627,
            0.5971642833948135, 0.25, 0.1],
        serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
            19567.87923828125, 9783.939619140625,
            4891.9698095703125, 2445.9849047851562,
            1222.9924523925781, 611.4962261962891,
            305.74811309814453, 152.87405654907226,
            76.43702827453613, 38.218514137268066,
            19.109257068634033, 9.554628534317017,
            4.777314267158508, 2.388657133579254,
            1.194328566789627, 0.5971642833948135],
        numZoomLevels: 19,
        units: "m",
        buffer: 1,
        transitionEffect: "resize"
    };
    var streets = new OpenLayers.Layer.OSM(null, null, options);

    var nodata_spaces = new OpenLayers.Layer.WMS(
       "no data spaces",
       '/geoserver/wms', {
           layers: 'SFenforce:CITATION_OPPORTUNITY_VW',
           version: '1.1.1',
           transparent: true
       },{
           buffer: 1,
           isBaseLayer: false
        }
    );

    var style = new OpenLayers.Style({
        pointRadius: "${getSize}",
        graphicName: 'circle'
    }, {
        context: {
            getSize: function(feature) {
                return 5 / feature.layer.map.getResolution();
            }
        },
        rules: [
            new OpenLayers.Rule({
                name: 'x',
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.EQUAL_TO,
                    property: "METER_EXPIRED_FLAG",
                    value: 1
                }),
                symbolizer: {
                    fillColor: "#FF0000"
                }
            }),
            new OpenLayers.Rule({
                name: 'y',
                filter: new OpenLayers.Filter.Logical({
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
               symbolizer: {
                   fillColor: "#EFEF20"
               }
           })
        ]
    });

    var styleMap = new OpenLayers.StyleMap(style);
    styleMap.styles["select"] = styleMap.styles["select"].clone();
    styleMap.styles["select"].defaultStyle.strokeColor = "blue";

    var citation_vector = new OpenLayers.Layer.Vector(
        "citations", {
            styleMap: styleMap,
            protocol: new OpenLayers.Protocol.WFS({
                url: '/geoserver/wfs', 
                featureType: "CITATION_OPPORTUNITY_VW",
                featureNS: 'http://www.sfpark.org/SFenforce',
                geometryName: "GEOM",
                version: "1.1.0",
                srsName: "EPSG:900913",
                outputFormat: 'json',
                readFormat: new OpenLayers.Format.GeoJSON()
            }),
            renderers: ['Canvas'],
            strategies: [new OpenLayers.Strategy.BBOX()]
    });



    var map = new OpenLayers.Map({
        div: "map",
        projection: "EPSG:900913",
        theme: null,
        controls : [
            new OpenLayers.Control.Zoom(),
            new OpenLayers.Control.TouchNavigation({
                dragPanOptions : {
                    interval : 100,
                    enableKinetic : true
                }
            }),
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.SelectFeature(citation_vector, {autoActivate: true}),
            new OpenLayers.Control.CacheWrite({
                autoActivate: true,
                layers: [streets]
            }),
            new OpenLayers.Control.CacheRead()
        ]
    });

    map.addLayers([streets, citation_vector/*, nodata_spaces*/]);
    map.zoomToExtent(new OpenLayers.Bounds(-13630460.905642, 4544450.3840456, -13624163.334642, 4552410.6141212));
}
