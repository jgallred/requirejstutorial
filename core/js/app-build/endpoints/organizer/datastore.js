define(['backbone', 'collections/containers', 'collections/items'], 
function(Backbone, Containers, Items){
    var datastore = {
        containers : new Containers(),
        items : new Items()
    }
    
    datastore.ops = {
        getElementsForContainer : function(container) {
            var items = datastore.items.where({container_id:container.id});
            var containers = datastore.containers.where({container_id:container.id});
            
            var temp = new Backbone.Collection();
            temp.comparator = function(model){return model.get('position')};
            
            temp.add(items);
            temp.add(containers);

            return temp;
        },
        
        getRootContainers : function()
        {
            var containers = datastore.containers.where({container_id:null});
            var temp = new Backbone.Collection();
            temp.comparator = function(model){return model.get('position')};
            temp.add(containers);

            return temp;
        }
    }
    
    return datastore;
});