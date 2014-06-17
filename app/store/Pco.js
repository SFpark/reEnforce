Ext.define('SFenforce.store.Pco',{
   extend: 'Ext.data.Store',
   requires: ['Ext.data.proxy.LocalStorage'],
   config: {
       storeId: 'pcoStore',
       model: 'SFenforce.model.Pco',
       autoLoad: true
   } 
});
