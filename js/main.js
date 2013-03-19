$(function() {
  var moviesList = $('#movies-list'),
      moviesCount = $('#movies-count'),
      sortIcon = $('#sort-icon'),
      reverseList = true,
      config = {};

  function printCount(count) {
    moviesCount.text(count);
  }

  function buildIcon(cls,ttle) {
    return $('<i class="icon"></i>').addClass(cls).attr('title', ttle);
  }

  function printList(list) {
    for (var i = 0, len = list.length; i < len; i++) {
      var data = list[i].split("\t");

      if (data.length !== 3) {
        console.log('Formato inválido na linha %s: %s', i, list[i]);
        continue;
      }

      var rate  = data[0],
          tags  = data[1],
          title = data[2];

      var movie = {};

      var item = $('<li></li>').addClass('movie');
          item.append($('<strong></strong>').addClass('movie__number'));
          item.append($('<strong></strong>').addClass('movie__title').text(title));


      switch(rate) {
        case '++': movie.rate = 'fav'; movie.rate_title = config.favoriteLabel; break;
        case '+': movie.rate = 'good'; movie.rate_title = config.goodLabel; break;
        case '-': movie.rate = 'bad'; movie.rate_title = config.badLabel; break;
      }

      for (var j = 0, lenj = tags.length; j < lenj; j++) {
        var tag = tags[j];
        switch(tag) {
          case 'r': movie.rewatch = true; break;
        }
      }

      if (movie.rewatch) item.addClass('movie--is-rewatch').append(buildIcon('icon--rewatch', config.rewatchLabel));
      if (movie.rate) item.addClass('movie--' + movie.rate).append(buildIcon('icon--' + movie.rate, movie.rate_title));

      if( reverseList ) {
        moviesList.append(item).reverse;
      } else {
        moviesList.append(item);
      }

    }
  }

  // Load movie list from config.moviesFile
  function loadMovies() {

    $.ajax({
      url: config.moviesFile,
      success: function (data) {
        var movieList = data.split(/[\r\n]+/g);
        printList(movieList);
        printCount(movieList.length);
      },
      dataType: 'text'
    });
  }

  // Global Flms class
  window.Flms = {

    // Receive config and start app
    start: function(newConfig) {

      config = newConfig;
      reverseList = config.reverseList;

      loadMovies();
    }

  };

});
