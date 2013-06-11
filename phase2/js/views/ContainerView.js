define(['jquery', 'underscore', 'backbone', 'endpoints/organizer/datastore', 'views/ItemView', 'models/item', 'models/container', 'text!tpls/container.html'], 
    function($, _, Backbone, Datastore, ItemView, Item, Container, Template){
        var ContainerView = Backbone.View.extend({
            template : Handlebars.compile(Template),
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
                
                var containerList = Datastore.ops.getElementsForContainer(this.model);
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
        return ContainerView;
    });