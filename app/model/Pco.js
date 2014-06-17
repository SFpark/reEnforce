// Parking Citation Officer
Ext.define('SFenforce.model.Pco', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'badge',
        fields: [
            {name: 'badge', type: 'number'},
            {name: 'beats', convert: function(v) { 
                if(v && typeof v == 'string'){
                    v = v.split(",");
                }
                return v;
            }}, // array of string
            {name: 'zoomTo', type: 'string'}
        ],
        validations: [{
            type: 'format', 
            field: 'badge',
            matcher: SFenforce.util.Config.getBadgeFormat(),
            message: SFenforce.util.Config.getBadgeValidationMsg()            
        }],
        proxy: {
           type: 'localstorage',
           id: 'sfenforce-pco'
       }
    }
});
