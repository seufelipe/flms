$(function() {
  var listSelector = '#movies-list';

  function printList(list) {
    for (var i = 0, len = list.length; i < len; i++) {
      var movieTitle = list[i];
      $(listSelector).append($('<li></li>').text(movieTitle));
    }
  }

  $.ajax({
    url: 'movies.txt',
    success: function (data) {
      var movieList = data.split(/[\r\n]+/g);
      printList(movieList);
    },
    dataType: 'text'
  });
  
});