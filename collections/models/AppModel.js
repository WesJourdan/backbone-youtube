var AppModel = Backbone.Model.extend({
  defaults: function () {
    return {
      videos: new VideosCollection(),
      current_video: null,
      next_page_token: null
    }
  },
});
