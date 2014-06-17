Ext.define('SFenforce.controller.Legend', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.Label', 'GXM.FeatureRenderer'],
    config: {
        refs: {
            legendButton: '#legendButton'
        },

        control: {
            legendButton: {
                tap: 'showLegend'
            }
        }

    },

    showLegend: function() {
        if (!this.legend) {
            var items = [];
            var rules = [{
                name: SFenforce.util.Config.getUnpaidRuleTitle(),
                symbolizer: {
                    graphicWidth: 32,
                    graphicHeight: 68,
                    graphicYOffset: -17,
                    externalGraphic: "resources/icons/parking-space.png"
                }
            }, {
                name: SFenforce.util.Config.getCommercialRuleTitle(),
                symbolizer: {
                    graphicWidth: 32,
                    graphicHeight: 68,
                    graphicYOffset: -17,
                    externalGraphic: "resources/icons/parking-space-commercial.png"
                }
            }, {
                name: SFenforce.util.Config.getSelectedTitle(),
                symbolizer: {
                    graphicWidth: 32,
                    graphicHeight: 36,
                    graphicYOffset: -17,
                    externalGraphic: "resources/icons/parking-space-selected.png"
                }
            }, {
                name: SFenforce.util.Config.getScheduledTitle(),
                symbolizer: {
                    graphicWidth: 32,
                    graphicHeight: 36,
                    graphicYOffset: -17,
                    externalGraphic: "resources/icons/parking-space-scheduled.png"
                }
            }];
            for (var i=0, ii=rules.length; i<ii; ++i) {
                var rule = rules[i];
                items.push({
                    xtype: 'container',
                    layout: 'hbox',
                    pack: 'start',
                    align: 'stretch',
                    items: [{
                        xtype: 'gxm_renderer',
                        minWidth: 32,
                        minHeight: 37,
                        symbolType: "Point",
                        width: 35,
                        symbolizers: [
                            rule.symbolizer
                        ]
                    }, {
                        flex: 1,
                        xtype: 'label',
                        html: '<div class="legend-rule">' + rule.name + '</div>'
                    }]
                });
            }
            // add another one for the WMS layer
            items.push({
                xtype: 'container',
                layout: 'hbox',
                pack: 'start',
                align: 'stretch',
                items: [{
                    xtype: 'gxm_renderer',
                    symbolType: "Point",
                    width: 37,
                    symbolizers: [{
                        graphicName: "circle",
                        pointRadius: 2,
                        fillColor: "black"
                    }]
                }, {
                    flex: 1,
                    xtype: 'label',
                    html: '<div class="legend-rule">' + SFenforce.util.Config.getNoDataRuleTitle() + '</div>'
                }]
            });
            this.legend = Ext.Viewport.add({
                xtype: 'panel',
                zIndex: 1000,
                width: SFenforce.util.Config.getLegendSize()[0], 
                height: SFenforce.util.Config.getLegendSize()[1],
                centered: true,
                modal: true,
                hideOnMaskTap: true,
                items: items
            });
        } else {
            this.legend.show();
        }
    }

});
