$(function() {
	var moviesList = $('.js-movies-list'),
	moviesCount = $('.js-movies-count'),
	config = {};

	function printCount(count) {
		moviesCount.text(count);
	}

	function buildIcon(icn,lbl,cls) {
		return $('<i class="icon"><span aria-hidden="true" data-icon="' + icn +'"></span><span class="assistive-text">' + lbl + '</span></i>').addClass(cls).attr('title', lbl);
	}

	function printList(list) {
		for (var i = 0, len = list.length; i < len; i++) {
			var data = list[i].split("\t");

			if (data.length !== 3) {
				console.log('Formato inválido na linha %s: %s', i, list[i]);
				continue;
			}

			var n = i + 1;

			var rate  = data[0],
			tags  = data[1],
			title = data[2];

			var movie = {};

			var item = $('<li></li>').attr('id', 'movie-' + n).addClass('movie');
			item.append($('<span></span>').addClass('movie__number').text(n));
			item.append($('<a href="https://www.google.com/search?q=' + encodeURIComponent(title) + ' ' + encodeURIComponent(config.searchSufix) + '" title="Google It!"></a>').addClass('movie__title').text(title));

			switch(rate) {
				case '++': movie.rate = 'fav'; movie.rate_title = config.favoriteLabel; movie.rate_icon = '&#x2606;'; break;
				case '+': movie.rate = 'good'; movie.rate_title = config.goodLabel; movie.rate_icon = '&#x1f44d;'; break;
				case '-': movie.rate = 'bad'; movie.rate_title = config.badLabel; movie.rate_icon = '&#x1f44e;'; break;
			}

			for (var j = 0, lenj = tags.length; j < lenj; j++) {
				var tag = tags[j];
				switch(tag) {
					case 'r': movie.rewatch = true; movie.rewatch_title = config.rewatchLabel; movie.rewatch_icon = '&#x27f3;'; break;
				}
			}

			if (movie.rewatch)
				item.addClass('movie--is-rewatch').append(buildIcon(movie.rewatch_icon, movie.rewatch_title, 'icon--status'));
			else
				item.append(buildIcon('&#x2713;', config.watchLabel, 'icon--status'));
			if (movie.rate)
				item.addClass('movie--' + movie.rate).append(buildIcon(movie.rate_icon, movie.rate_title, 'icon--rate'));

			if( reverseList ) {
				moviesList.prepend(item);
			} else {
				moviesList.append(item);
			}

		}
	}


  // Load movie list from config.moviesFile
  function loadMovies() {

  	$.ajax({
  		url: config.moviesFile,
  		cache: false,
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
