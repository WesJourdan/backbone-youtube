var CurrentVideoView = Backbone.View.extend({
  template: Handlebars.compile($('#player-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
