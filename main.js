
var appModel = new AppModel();
var appView = new AppView({ model: appModel });



//Infinite scroll magic.
$('.playlist').on('scroll', function() {
  if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
      appView.assembleCollection(appModel.get('search'), "&pageToken=" + appModel.get('next_page_token'));
  }
});
