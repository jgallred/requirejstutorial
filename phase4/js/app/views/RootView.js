define(['backbone', 'views/ContainerView', 'endpoints/organizer/datastore'],
function(Backbone, ContainerView, Datastore){
        
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
     return RootView;
});

