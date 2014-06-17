Ext.define('SFenforce.view.MapToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'maptoolbar',

    requires: [
        'Ext.SegmentedButton',
        'SFenforce.view.RefreshLabel'        
    ],

    config: {
        minHeight: '4.2em',
        docked: 'top',
        ui: 'mapbutton',
        id: 'mapToolbar',
        defaults: {
            minWidth: '4em',
            minHeight: '4em',
            iconMask: 'true'
        },
        items: [{
            id: 'backLoginButton',
            ui: 'mapbutton',
            text: SFenforce.util.Config.getBackToLoginText()
        }, {
            xtype: 'spacer',
            minWidth: null,
            width: '0.3em'
        }, {
            id: 'myPosition',
            ui: 'mapbutton',
            iconCls: 'sflocate'
        }, {
            xtype: 'segmentedbutton',
            id: 'locateButton',
            items:[{
                ui: 'mapbutton',
                minWidth: '4em',
                iconMask: 'true',
                iconCls: 'locate4'
            }]
        }, {
            xtype: 'spacer',
            minWidth: null,
            width: '0.3em'
        }, {
            id: 'refreshButton',
            ui: 'mapbutton',
            iconCls: 'refresh'
        }, {
            id: 'lastRefresh',
            xtype: 'refreshlabel',
            width: 270
        }, {
            xtype: 'spacer',
            flex: 1
        }, {
            id: 'zoomButton',
            ui: 'mapbutton',
            iconCls: 'favorites'
        }, {
            id: 'legendButton',
            ui: 'mapbutton',
            iconCls: 'maps'
        }]
    }
});
