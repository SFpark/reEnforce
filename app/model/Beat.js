Ext.define('SFenforce.model.Beat', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'name', type: 'string', mapping: 'attributes.' + SFenforce.util.Config.getBeatNameField()},
            {name: 'geometry'}
        ]
    }
});
