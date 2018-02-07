var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'keyup #search-input': 'captureSearch'
  },

  initialize: function () {
    this.$playlist = this.$('.playlist');
    this.$player = this.$('.player');
    this.listenTo(this.model.get('videos'), 'add', this.renderPlaylist);
    this.listenTo(this.model, 'change:current_video', this.renderCurrentVideo);
    this.assembleCollection("I've got a good mind to give up living");
  },

  captureSearch: function (e) {
    if (e.keyCode === 13) {
      //empty playlist to make room for new videos.
      query = $("#search-input").val()
      this.$playlist.html('');
      this.assembleCollection(query);
    }
  },

  assembleCollection: function(query, token) {
    //save search criteria to use for infinite scroll.
    appModel.set('search', query);
    // determine if we need to add the next_page_token to our url to enable infinite scroll.
    var url = '';
    if (token) {
      url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=' + query + '&type=video&key=AIzaSyCB8s4bGhIRHUzlTrvxQFejPH50xe-H1NM' + token
    } else {
      url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=" + query + '&type=video&key=AIzaSyCB8s4bGhIRHUzlTrvxQFejPH50xe-H1NM'
    }

    $.ajax({
      method: "GET",
      url: url,
      dataType: "json",
      success: function(data) {
        for (let i = 0; i < data.items.length; i++) {
          appModel.get('videos').add({
            videoId: data.items[i].id.videoId,
            title: data.items[i].snippet.title,
            thumbnail: data.items[i].snippet.thumbnails.default.url,
            description: data.items[i].snippet.description
          });
        }
        //On new search, set current_video to first video in new search collection.
        if (!token) {
          let currentVideo = data.items[0].id.videoId;
          appModel.set('current_video', currentVideo);
        }
        appModel.set('next_page_token', data.nextPageToken);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert(textStatus, errorThrown);
      }
    });
  },

  renderPlaylist: function (video) {
    var videosView = new VideosView({ model: video });
    this.$playlist.append(videosView.render().el);
  },

  renderCurrentVideo: function () {
    let currentModel = appModel.get('videos').get(appModel.get('current_video'));
    var currentVideoView = new CurrentVideoView({model: currentModel});
    // empty player to make room for new video.
    this.$player.html('');
    this.$player.append(currentVideoView.render().el);
  }
});
