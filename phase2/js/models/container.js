define(['underscore', 'backbone'], function(_, Backbone){

    var Container = Backbone.Model.extend({
        urlRoot : 'models/container',
        initialize : function(){        
            
        },
        defaults : function(){
            return {
                name : "New Container",
                position : 0,
                container_id : null
                // created_at : date string - This is set on the server
                // updated_at : date string - This is set on the server
            }
        },
        
        addToContainer: function(c_id, pos) {
            if(this.id && this.id == c_id) { // Don't allow adding self
                return;
            }
            this.set({container_id:c_id, position:pos});
        },

        removeFromContainer: function() {
            this.set({container_id:null});
        },
        
        changePosition : function(pos) {
            this.set({position:pos});
        }
    });
   
    return Container;
});