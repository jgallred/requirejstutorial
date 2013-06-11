define(['views/RootView', './datastore' ],
function(RootView, datastore){
    
    var api = {
        
        init : function() 
        {
            var collection = datastore.containers.where({container_id:null});
            var view = new RootView({collection:collection});
            $('.wrapper').append(view.render().$el);
        },
        
        datastore : datastore
        
    }

    return api;
});

