$(function() {
  var listSelector = '#movies-list',
    counterSelector = '#movies-count';

  function printCount(count) {
    $(counterSelector).text(count);
  }

  function buildTag(cls, content) {
    return $('<em></em>').addClass(cls).append(content);
  }

  function printList(list) {
    for (var i = 0, len = list.length; i < len; i++) {
      var data = list[i].split("\t");

      if (data.length !== 3) {
        console.log('Formato inválido na linha %s: %s', i, list[i]);
        continue;
      }

      var rate = data[0],
        tags=data[1],
        title=data[2];

      var movie = {};
      var item = $('<li></li>').text(title);

      switch(rate) {
        case '++': movie.rate = 'favorite'; break;
        case '+': movie.rate = 'good'; break;
        case '-': movie.rate = 'bad'; break;
      }

      for (var j = 0, lenj = tags.length; j < lenj; j++) {
        var tag = tags[j];
        switch(tag) {
          case 'r': movie.review = true; break;
        }
      }

      if (movie.rate) item.addClass(movie.rate).append(buildTag('rate', movie.rate));
      if (movie.review) item.append(buildTag('review', 'review'));
      $(listSelector).append(item);
    }
  }

  $.ajax({
    url: 'movies.txt',
    success: function (data) {
      var movieList = data.split(/[\r\n]+/g);
      printList(movieList);
      printCount(movieList.length);
    },
    dataType: 'text'
  });
  
});
