$(document).ready(function(){
  var text1;
  var text2;
  $button = $('.submit')
  $main = $('main');
  $left = $('.left')
  $right = $('.right')

  $button.on('click', function(event){
  text1 = $('#text1').val();
  text2 = $('#text2').val();

  // https://www.reddit.com/r/ + text + /.json?count=25&after= + after



  $.get('http://www.reddit.com/r/' + text1 + '.json')
    .done(function(data1){
      // console.log(data1.data.after);
      var author1 = [];
      var author2 = [];
      var posts1 = [];
      var posts2 = [];
      var listings1 = data1.data.children;
      for(var i = 0; i < listings1.length; i +=1){
        author1.push(listings1[i].data.author);
        posts1.push({
          "author":(listings1[i].data.author),
          "title":(listings1[i].data.title),
          "thumbnail":(listings1[i].data.thumnail),
          "score":(listings1[i].data.score),
        })
      }
      $.get('http://www.reddit.com/r/' + text2 + '.json')
        .done(function(data2){
          var listings2 = data2.data.children;

          // console.log(data2.data.after)
        for(var i = 0; i < listings2.length; i +=1){
          author2.push(listings2[i].data.author);
          posts2.push({
            "author":(listings2[i].data.author),
            "title":(listings2[i].data.title),
            "thumbnail":(listings2[i].data.thumnail),
            "score":(listings2[i].data.score),
          })
        }
          console.log(author2);
          console.log(author1);
          function compareArrays(arr1, arr2){
            var result = [];
            for(var i = 0; i < arr2.length; i +=1){
              if(arr1.indexOf(arr2[i]) !== -1){
                console.log(posts2[i].author, posts2[i].title, posts1[arr1.indexOf(arr2[i])].title);
                $main.html('<h1>' + posts2[i].author + 'posted ' + posts2[i].title + ' to r/'+ text2 + ' and ' + posts1[arr1.indexOf(arr2[i])].title + ' to ' + ' r/' + text1 + '</h1>');
              }
            }
            return result;
          }
          compareArrays(author1, author2);
          // console.log(crossPosters);
          // $main.text((crossPosters.join(', ')));
      });
            // console.log(author1);
            // console.log(author2);
  })
})
})
//
//
// })

// console.log(listings);
