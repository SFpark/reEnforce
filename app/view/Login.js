Ext.define('SFenforce.view.Login', {
    extend: 'Ext.form.FormPanel',
    alias: 'widget.login',
    requires: [
        'SFenforce.view.MultiSelect',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Hidden',
        'SFenforce.store.Beats',
        'SFenforce.store.Pco'
    ],
    config: {
        layout : {
            type: 'vbox',
            align: 'start',
            pack: 'start'
        },
        items: [{xtype: 'fieldset',
            ui: 'login',
            width: '45em',
            id: 'fieldset',
            defaults: {
                labelAlign: 'left',
                minHeight: '3.5em',
                labelWidth: '27%'
            },
            items: [{
                xtype: 'toolbar',
                ui: 'zoomselector',
                minHeight: '3.5em',
                defaults: {
                    minHeight: '3.5em'
                },
                docked: 'bottom',
                margin: '2em 0 0 0',
                layout: {
                    align: 'stretch',
                    pack: 'center'
                },
                items: [{
                    xtype: 'spacer',
                    flex: 1
                }, {
                    xtype: 'button',
                    ui: 'sfbutton',
                    id: 'loginButton',
                    width: '12.5em',
                    text: SFenforce.util.Config.getLoginButtonText()
                }]
            }, {
                xtype: 'numberfield',
                listeners: {
                    'blur': function() {
                        Ext.Viewport.maximize();
                    }
                },
                name: 'badge',
                placeHolder: SFenforce.util.Config.getLoginNamePlaceholder(),
                label: SFenforce.util.Config.getLoginNameLabel(),
                clearIcon: true
            }, {
                xtype: 'multiselectfield',
                name: "beats",
                placeHolder: SFenforce.util.Config.getLoginBeatsPlaceholder(),
                label: SFenforce.util.Config.getLoginBeatsLabel(),
                usePicker: false,
                displayField: 'name',
                valueField: 'name',
                store: 'Beats'
            }, {
                xtype: 'toolbar',
                docked: 'bottom',
                margin: '0.2em',
                minHeight: '3.5em',
                defaults: {
                    minHeight: '3.5em'
                },
                ui: 'zoomselector',
                id: 'zoomSelectorToolbar',
                layout: {
                    pack: 'center',
                    align: 'center'
                },
                items: [{
                    xtype: 'label',
                    cls: 'zoom-label',
                    html: SFenforce.util.Config.getLoginZoomToLabel(),
                    width: '27.4%'
                }, {
                    xtype: 'segmentedbutton',
                    id: "zoomSelector",
                    submit: false,
                    allowDepress: false,
                    allowMultiple: false,
                    flex: 1,
                    layout: {
                        pack: 'center'
                    },
                    defaults: {
                        ui: 'zoomselector',
                        flex: 1
                    },
                    items: [{
                        text: SFenforce.util.Config.getLoginMyBeatsLabel(),
                        data: "mybeats",
                        pressed: true
                    }, {
                        text: SFenforce.util.Config.getLoginAllBeatsLabel(),
                        data: "allbeats"
                    }, {
                        text: SFenforce.util.Config.getLoginMyLocationLabel(),
                        data: "mylocation"
                    }]
                }]
            }, {
                xtype: 'hiddenfield',
                name: 'zoomTo',
                submit: false
            }]
        }]
    }
});
