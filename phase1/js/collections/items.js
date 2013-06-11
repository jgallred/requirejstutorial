var Items = Backbone.Collection.extend({
    url : 'models/item',
    model : Item,
    comparator : function(model) {
        return model.get('position');
    }
});