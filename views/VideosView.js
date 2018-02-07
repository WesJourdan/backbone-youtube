var VideosView = Backbone.View.extend({
  template: Handlebars.compile($('#playlist-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    'click .playlist-item': function () {
      appModel.set('current_video', this.model.get('videoId'));
    }
  }
});
