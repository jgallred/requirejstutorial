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
            var category = Datastore.categories.find(this.mode.get('category_id'));
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
