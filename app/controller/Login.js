Ext.define('SFenforce.controller.Login', {
    extend: 'Ext.app.Controller',
    requires: ['SFenforce.model.Pco','SFenforce.view.Main'],
    config: {
        refs: {
            main: 'main',
            login: 'login',
            loginButton: '#loginButton',
            lastRefresh: '#lastRefresh',
            locateButton: '#locateButton',
            zoomSelector: '#zoomSelector',
            zoomTo: 'login [name="zoomTo"]'
        },

        control: {
            loginButton: {
                tap: 'validateLogin'
            },
            '.login [name="badge"]': {
                change: 'findBeats'
            },
            zoomSelector: {
                toggle: 'setZoomTo'
            }
        },

        routes: {
            '': 'showLogin'
        }
    },

    showLogin: function(){
        Ext.Viewport.add(Ext.create('SFenforce.view.Login'));
        Ext.Viewport.setActiveItem(this.getLogin());
        this.setZoomTo(this.getZoomSelector());
    },    
    
    setZoomTo: function(btnGroup){
        var pressedBtn = btnGroup.getPressedButtons()[0]; //should always be 1 & only 1 pressed
        if(pressedBtn){
            this.getZoomTo().setValue(pressedBtn.getData());
        }
    },
    
    validateLogin: function(btn) {
        var values = this.getLogin().getValues();
        var userInfo = Ext.create('SFenforce.model.Pco', values);
        var errors = userInfo.validate();
        var store = Ext.getStore('Beats');
        if (errors.isValid()) {
            var bounds = null;
            var ids = values['beats'];
            if (Ext.isString(ids)) {
                ids = ids.split(",");
            }
            if (Ext.isArray(ids)) {
                store.each(function(record) {
                    if (Ext.Array.indexOf(ids, record.get('name')) > -1) {
                        if (bounds === null) {
                            bounds = record.get('geometry').getBounds();
                        } else {
                            bounds.extend(record.get('geometry').getBounds());
                        }
                    }
                });
            }
            var configBounds = OpenLayers.Bounds.fromArray(SFenforce.util.Config.getBounds());
            //store the beat bounds
            SFenforce.util.Config.setBeatsBounds((bounds && bounds.toArray()) || SFenforce.util.Config.getBounds());
                                    
            if(values['zoomTo'] == 'allbeats') {
                bounds = null;
                store.each(function(record) {
                    if(bounds === null) {
                        bounds = record.get('geometry').getBounds();
                    } else {
                        bounds.extend(record.get('geometry').getBounds());
                    }
                });
            }
            
            this.storeLogin(userInfo);
            this.showMap(bounds || configBounds, ids);
        } else {
            var message = '';
            Ext.each(errors.items,function(rec,i){
                message += rec._message+"<br>";
            });
            Ext.Msg.show({
                zIndex: 1000,
                showAnimation: null,
                hideAnimation: null,
                message: message,
                buttons: [{text: 'OK', ui: 'sfbutton'}],
                promptConfig: false,
                fn: function(){}
            });
        }
    },
    
    storeLogin: function(pcoRecord){
        var store = Ext.getStore('pcoStore');
        if(!store.getData().getByKey(pcoRecord.get("badge"))){
            store.add(pcoRecord);    
        }
        store.getProxy().batch({
                operations: {update:[pcoRecord]},
                listeners: store.getBatchListeners()
        });
        SFenforce.userInfo = pcoRecord.data;
    },
    
    findBeats: function(input, evt){
        var store = Ext.getStore('pcoStore');
        var idx = store.findExact('badge', ''+input.getValue()); //ensure we are using a string
        if (idx > -1) {
            var rec = store.getAt(idx);
            var beatsFld = this.getLogin().down('[name="beats"]');
            var zoomType = this.getZoomSelector().down('button[data='+rec.get('zoomTo')+']');
            if (beatsFld && beatsFld.getValue() == null) {
                beatsFld.setValue(rec.get('beats'));
                if(zoomType){
                    this.setZoomTo(this.getZoomSelector().setPressedButtons(zoomType));
                }
            }
        }
    },

    showMap: function(bounds, beats){
        var main = this.getMain();
        if(!main) {
            // see: http://www.sencha.com/forum/showthread.php?214966-Ext.Viewport.getOrientation-gives-reversed-layout
            // TODO check again with ST 2.1 upgrade
            var orientation = Ext.Viewport.getOrientation();
            if (Ext.os.is.Android) {
                orientation = (orientation === 'portrait') ? 'landscape' : 'portrait';
            }
            Ext.Viewport.on("orientationchange", function(vp) {
                var orientation = vp.getOrientation();
                if (Ext.os.is.Android) {
                    orientation = (orientation === 'portrait') ? 'landscape' : 'portrait';
                }
                if (orientation === 'landscape') {
                    // move items to hbox container
                    Ext.getCmp('vboxcontainer').items.each(function(item) {
                        Ext.getCmp('vboxcontainer').remove(item, false);
                        if (item.initialConfig.cls === 'featureinfo') {
                            item.setHeight(null);
                            item.setWidth('25%');
                            item.items.each(function(i) {
                                if (i.initialConfig.id === 'updateList' || i.initialConfig.id === 'featureinfo') {
                                    i.removeCls('portrait');
                                }
                            });
                        }
                        Ext.getCmp('hboxcontainer').add(item);
                    });
                    Ext.getCmp('vboxcontainer').hide();
                    Ext.getCmp('hboxcontainer').show();
                } else {
                    // move items to vbox container
                    Ext.getCmp('hboxcontainer').items.each(function(item) {
                        Ext.getCmp('hboxcontainer').remove(item, false);
                        if (item.initialConfig.cls === 'featureinfo') {
                            item.setWidth(null);
                            item.setHeight(Ext.Viewport.getSize().height*0.3);
                            item.items.each(function(i) {
                                if (i.initialConfig.id === 'updateList' || i.initialConfig.id === 'featureinfo') {
                                    i.addCls('portrait');
                                }
                            });
                        }
                        Ext.getCmp('vboxcontainer').add(item);
                    });
                    Ext.getCmp('hboxcontainer').hide();
                    Ext.getCmp('vboxcontainer').show();
                }
                this.getMain().down('map').getMap().updateSize();
            });
            main = Ext.create('SFenforce.view.Main',{
                beats: beats,
                portrait: (orientation === 'portrait')
            });
            Ext.Viewport.add(main);
        } else {
            main.down('map').setBeats(beats);
        }
        Ext.Viewport.setActiveItem(main);
        this.getLastRefresh().setLastUpdate(new Date());
        var map = main.down('map').getMap();

        if(SFenforce.userInfo.zoomTo == 'mylocation') {
            var ctrl = map.getControlsByClass('OpenLayers.Control.Geolocate')[0];
            ctrl.events.register("locationfailed", this, function() {
                map.zoomToExtent(bounds);
                Ext.Msg.show({
                    zIndex: 1000,
                    title: SFenforce.util.Config.getErrorTitle(),
                    message: SFenforce.util.Config.getGpsErrorMsg(),
                    buttons: [{text: 'OK', ui: 'sfbutton'}],
                    promptConfig: false
                });
                ctrl.events.unregister("locationfailed", this, arguments.callee);
            });
            ctrl.events.register("locationupdated", this, function() {
                var vector = main.down('map').vector;
                map.zoomToExtent(vector.getDataExtent());
                ctrl.events.unregister("locationupdated", this, arguments.callee);
            });
            ctrl.getCurrentLocation();
        } else {
            map.zoomToExtent(bounds);
        }
    }
});
