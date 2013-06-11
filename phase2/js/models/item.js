define(['underscore', 'backbone'], function(_, Backbone){

    var Item = Backbone.Model.extend({
        urlRoot : 'models/item',
        defaults : function(){
            return {
                name : "New Item",
                description : "",
                position : 0,
                container_id : null
                // created_at : date string - This is set on the server
                // updated_at : date string - This is set on the server
            }
        },
        
        addToContainer: function(c_id, pos) {
            this.set({container_id:c_id, position:pos});
        },

        removeFromContainer: function() {
            this.set({container_id:null});
        }
    });
   
    return Item;
});