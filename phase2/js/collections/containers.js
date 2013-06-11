define(['underscore', 'backbone', 'models/container'], function(_, Backbone, Container){

    var Containers = Backbone.Collection.extend({
        url : 'models/container',
        model : Container,
        comparator : function(model) {
            return model.get('position');
        }
    });
   
    return Containers;
});