# backbone-youtube

AppView.js controls pretty much everything that happens in this app. I figured that would make things a lot more simple.

AppView has 4 methods aside from its initialize function.

  - captureSearch: It captures the search input (in 'query') and emptys the playlist before calling assembleCollection(query).

  - assembleCollection: This function takes up to two arguements, 'query', and 'token'. 'token' is only used for infinite scroll. Performs get request and populates appModel's 'videos' collection with a new VideoModel for each search result.

  - renderPlaylist: This function is triggered each time a new videoModel is created. It creates a new VideosView for each new videoModel and appends them to the $playlist div.

  - renderCurrentVideo: This function is triggered each time the "current_video" property of the appModel changes. It creates a new CurrentVideoView using the "current_video" and empties the $player div before appending the new view.


main.js takes care of the infinite scroll magic.
