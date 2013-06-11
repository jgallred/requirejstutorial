    var App = {
        
        init : function() 
        {
            var collection = this.datastore.containers.where({container_id:null});
            var view = new RootView({collection:collection});
            $('.wrapper').append(view.render().$el);
        },
        
        datastore : {
            containers : new Containers(),
            items : new Items(),
            ops : {
                getElementsForContainer : function(container) {
                    var items = App.datastore.items.where({container_id:container.id});
                    var containers = App.datastore.containers.where({container_id:container.id});
                    
                    var temp = new Backbone.Collection();
                    temp.comparator = function(model){return model.get('position')};
                    
                    temp.add(items);
                    temp.add(containers);

                    return temp;
                },
                
                getRootContainers : function()
                {
                    var containers = App.datastore.containers.where({container_id:null});
                    var temp = new Backbone.Collection();
                    temp.comparator = function(model){return model.get('position')};
                    temp.add(containers);

                    return temp;
                }
            }
        }
        
    }

    

           $(document).ready(function(){
                // Bootstrap the data
                App.datastore.items.reset(items);
                App.datastore.containers.reset(containers);              
                App.init();
            });
