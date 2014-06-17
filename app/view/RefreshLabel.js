Ext.define('SFenforce.view.RefreshLabel', {
    extend: 'Ext.Label',
    xtype: 'refreshlabel',

    config: {
        lastUpdate: null
    },

    initialize: function() {
        this.repeater = setInterval(Ext.bind(this.updateLabel, this), 60000);
        this.callParent(arguments);
        this.updateLabel();
    },

    updateLastUpdate: function() {
        this.updateLabel();
    },

    updateLabel: function() {
        var diff;
        if (this.getLastUpdate() === null) {
            diff = 0;
        } else {
            diff = new Date() - this.getLastUpdate();
        }
        var minutes = Math.round(diff/60000);
        var str = 'minute';
        if (minutes !== 1) {
            str += 's';
        }
        this.setHtml('<span class="lastupdateprefix">Last Updated</span><span class="lastupdatepostfix"><b> ' + minutes + ' ' + str + '</b> ago</span>');
    },

    destroy: function() {
        clearInterval(this.repeater);
        this.repeater = null;
        this.callParent();
    }


});
