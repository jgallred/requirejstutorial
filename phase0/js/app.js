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

var Items = Backbone.Collection.extend({
        url : 'models/item',
        model : Item,
        comparator : function(model) {
            return model.get('position');
        }
    });

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

var Containers = Backbone.Collection.extend({
        url : 'models/container',
        model : Container,
        comparator : function(model) {
            return model.get('position');
        }
    });

var ItemView = Backbone.View.extend({
        template : Handlebars.compile($('#item-tpl').html()),
        tagName: 'li', // name of tag to be created 
        attributes : function() {
            return {
                "class" : "a_item"
            }
        },

        events: { 
            "click .edit_item" : "editItem",
            "click .delete_item" : "deleteItem" 
        },    

        initialize: function(){      
            this.model.on('destroy', this.remove, this);
            this.model.on('change:name', this.renderName, this);
            this.model.on('change:category_id', this.renderCategory, this);
        },

        render: function(){        
            this.$el.html(this.template(this.model.toJSON()));
            return this; // for chainable calls, like .render().el
        },
        
        getCategoryName : function() {
            if(this.model.get('category_id')) {
                var category = App.datastore.categories.find(this.mode.get('category_id'));
                return category ? category.get('name') : "Error";
            }
            return "";
        },
        
        unrender: function(){
            $(this.el).remove();
        },
        
        renderName : function() {
            this.$('.name').text(this.model.get('name'));
        },
        renderCategory : function() {
            this.$('.category').text(this.getCategoryName());
        },
        
        editItem : function() {
            alert("TODO Edit Item");
        },
        deleteItem : function() {
            alert("TODO Destroy Item");
        }
    });

var ContainerView = Backbone.View.extend({
            template : Handlebars.compile($('#container-tpl').html()),
            tagName: 'li', // name of tag to be created        
            attributes : function() {
                return {
                    "class" : "a_container"
                }
            },
            events: { 
                "click > div .edit_container" : "editContainer",
                "click > div .delete_container" : "deleteContainer" ,
                "click > div .add_container" : "addContainer" ,
                "click > div .add_item" : "addItem" 
            },      

            initialize: function(){
                this.model.on('destroy', this.remove, this);
                this.model.on('change:name', this.renderName, this);
            },

            render: function(){
                this.$el.html(this.template(this.model.toJSON()));
                
                var containerList = App.datastore.ops.getElementsForContainer(this.model);
                var view = this;
     
                containerList.forEach(function(model)
                {
                    if(model instanceof Item) // if instance of item view create an item.
                    {
         
                        view.$('>ul').append((new ItemView({model:model})).render().$el);
                    }
                    else // not an item so must be a container
                    {
                        view.$('>ul').append((new ContainerView({model:model})).render().$el);
                    }
                    
                });
                
                
                this.$('> ul.sortable').sortable({
                    placeholder: "ui-state-highlight",
                    connectWith: ".sortable"
                }).disableSelection();
                 
                return this; // for chainable calls, like .render().el
            },
           
        
            renderName : function() {
                this.$('> div > .name').text(this.model.get('name'));
            },
        
            editContainer : function() {
                alert("TODO Edit Container");
            },
            deleteContainer : function() {
                alert("TODO Destroy Container");
            },
        
            addContainer : function() {
                alert("TODO Add Container");
            },
            addItem : function() {
                alert("TODO Add Item");
            }
        });

var RootView = Backbone.View.extend({
        el: '.main', // name of tag to be created  

        initialize: function(){

        },

        render: function(){
          var view = this;
          this.collection.forEach(function(model){
              view.$('ul.root').append((new ContainerView({model:model})).render().$el);
          });
          
          $('ul.root').sortable({
             placeholder: "ui-state-highlight",
             connectWith: ".sortable"
           }).disableSelection();
          
          return this; // for chainable calls, like .render().el
        }
     });

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
