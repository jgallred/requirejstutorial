define(['underscore', 'backbone', 'models/item'], function(_, Backbone, Item){

    var Items = Backbone.Collection.extend({
        url : 'models/item',
        model : Item,
        comparator : function(model) {
            return model.get('position');
        }
    });
   
    return Items;
});