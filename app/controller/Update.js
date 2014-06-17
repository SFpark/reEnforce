Ext.define('SFenforce.controller.Update', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.LoadMask', 'Ext.util.DelayedTask'],
    config: {
        refs: {
            map: 'map',
            updateList: '#updateList',
            saveButton: '#saveButton',
            popup: '#featureinfo'
        },

        control: {
            saveButton: {
                tap: 'doTransaction'
            }
        }

    },

    doTransaction: function() {
        var attributes = this.getPopup().feature.attributes;
        var fids = [];
        var table = SFenforce.util.Config.getUpdateTable();
        var featureNS = SFenforce.util.Config.getFeatureNS();
        var dispositionCodeField = SFenforce.util.Config.getDispositionCodeField();
        var badgeField = SFenforce.util.Config.getBadgeField();
        var entryDateField = SFenforce.util.Config.getEntryDateField();
        var badgeValue = SFenforce.userInfo['badge'];
        var programField = SFenforce.util.Config.getLastUpdatedProgramField();
        var programValue = SFenforce.util.Config.getLastUpdatedProgramValue();
        var userField = SFenforce.util.Config.getLastUpdatedUserField();
        var fields = SFenforce.util.Config.getOpportunityIdFields();
        for (var i=0, ii=fields.length; i<ii; ++i) {
            var value = attributes[fields[i]];
            if (value !== null) {
                fids.push(table + "." + value);
            }
        }
        var features = [];
        var hasSelection = this.getUpdateList().hasSelection();
        if (fids.length === 0 || !hasSelection) {
            return;
        }
        for (var j=0, jj=fids.length;j<jj; ++j) {
            var code = this.getUpdateList().getSelection()[0].get('value');
            var attr = {};
            var curTime = new Date().toISOString();
            var updatedUser = SFenforce.util.Config.getDefaultLastUpdatedUser();
            attr[dispositionCodeField] = code;
            attr[badgeField] = badgeValue;
            attr[entryDateField] = curTime;
            attr[programField] = programValue;
            attr[userField] = updatedUser;
            var feature = new OpenLayers.Feature.Vector(null, attr);
            feature.fid = fids[j];
            feature.state = OpenLayers.State.UPDATE;
            features.push(feature);
        }
        if (features.length > 0) {
            var format = new OpenLayers.Format.WFST({
                featurePrefix: SFenforce.util.Config.getPrefix(), 
                featureType: table, 
                geometryName: null,
                featureNS: featureNS, 
                version: "1.1.0"
            });
            var xml = format.write(features);
            var url = SFenforce.util.Config.getGeoserverUrl();
            var mapFeature = this.getPopup().feature;
            var map = this.getMap().getMap();
            map.getControlsByClass('OpenLayers.Control.SelectFeature')[0].unselectAll();
            if (mapFeature && mapFeature.layer) {
                SFenforce.util.Config.getScheduled().push(mapFeature.fid);
                mapFeature.renderIntent = 'scheduled';
                mapFeature.layer.drawFeature(mapFeature);
            }
            var label = Ext.getCmp('featureinfo');
            label.setHtml('<p class="infotext">' + SFenforce.util.Config.getTransactionSuccessText() + '</p>');
            OpenLayers.Request.POST({
                url: url,
                callback: function(response) {
                    var success = format.read(response.responseText).success;
                    if (!success) {
                        label.setHtml(SFenforce.util.Config.getTransactionErrorText());
                    } else {
                        SFenforce.app.getController('Map').doRefresh();
                    }
                },
                scope: this,
                data: xml
            });
        }
    }

});
