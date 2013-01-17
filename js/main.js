$(function() {
  var listSelector = '#movies-list',
    counterSelector = '#movies-count';

  function printCount(count) {
    $(counterSelector).text(count);
  }

  function buildTag(cls, content) {
    return $('<span></span>').addClass(cls).append(content);
  }
  
  function buildIcon() {
    return $('<i class="icon-rate"></i>');
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
        case '++': movie.rate = 'fav'; break;
        case '+': movie.rate = 'good'; break;
        case '-': movie.rate = 'bad'; break;
      }

      for (var j = 0, lenj = tags.length; j < lenj; j++) {
        var tag = tags[j];
        switch(tag) {
          case 'r': movie.review = true; break;
        }
      }

      if (movie.review) item.append(buildTag('is-review', 'review'));
      if (movie.rate) item.addClass(movie.rate).append(buildIcon());
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
