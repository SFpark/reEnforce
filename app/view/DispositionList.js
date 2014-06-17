Ext.define('SFenforce.view.DispositionList', {
    extend: 'Ext.List',
    xtype: 'sflist',

    config: {
        scrollable: false,
        itemTpl: '<div class="value-{special}">{text}</div>'
    },

    initialize: function() {
        this.callParent(arguments);
        for (var i=0, ii=this.container.getViewItems().length; i<ii; ++i) {
            var item = Ext.get(this.container.getViewItems()[i]);
            var last = item.last().last();
            if (last.hasCls('value-S')) {
                item.addCls('special-item');
            }
       }
   }
});
