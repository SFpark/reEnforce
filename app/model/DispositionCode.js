Ext.define('SFenforce.model.DispositionCode', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'value', type: 'integer', mapping: 'attributes.' + SFenforce.util.Config.getDispositionCodeLookupValueField()},
            {name: 'text', type: 'string', mapping: 'attributes.' + SFenforce.util.Config.getDispositionCodeLookupTextField()},
            {name: 'special', type: 'string', mapping: 'attributes.' + SFenforce.util.Config.getDispositionCodeSpecialField()}
        ]
    }
});
