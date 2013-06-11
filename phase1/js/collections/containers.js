var Containers = Backbone.Collection.extend({
    url : 'models/container',
    model : Container,
    comparator : function(model) {
        return model.get('position');
    }
});