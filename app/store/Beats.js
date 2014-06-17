Ext.define('SFenforce.store.Beats', {
    extend: 'Ext.data.JsonStore',
    
    requires: [
        'SFenforce.model.Beat',
        'GXM.data.proxy.Protocol',
        'GXM.data.reader.Feature'
    ],
    
    config: {
        autoLoad: true,
        
        model: 'SFenforce.model.Beat',

        sorters: [{
            property: 'name'
        }],

        proxy: {
            type: 'gxm_protocol',
            protocol: new OpenLayers.Protocol.WFS({
                url: SFenforce.util.Config.getGeoserverUrl(),
                version: "1.1.0",
                srsName: "EPSG:900913",
                featureType: SFenforce.util.Config.getBeatsFeatureType(),
                featureNS: SFenforce.util.Config.getFeatureNS(),
                outputFormat: 'json',
                readFormat: new OpenLayers.Format.GeoJSON()
            }),
            reader: 'gxm_feature'
        }
    }
});
