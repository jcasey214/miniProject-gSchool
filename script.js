$(document).ready(function(){
  var text1;
  var text2;
  $button = $('button.search')
  $main = $('main');
  $section = $('section');
  $image = $('section img');

  $button.on('click', function(event){
    event.preventDefault();
    $center =  $('div.center');
    $input = $('input[type="text"]');
    text1 = $('#text1').val();
    text2 = $('#text2').val();
    $image.addClass('hidden');
    $center.remove();
    $input.empty();

    // https://www.reddit.com/r/ + text + /.json?count=25&after= + after



    $.get('http://www.reddit.com/r/' + text1 + '.json')
      .done(function(data1){
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

          for(var i = 0; i < listings2.length; i +=1){
            author2.push(listings2[i].data.author);
            posts2.push({
              "author":(listings2[i].data.author),
              "title":(listings2[i].data.title),
              "thumbnail":(listings2[i].data.thumnail),
              "score":(listings2[i].data.score),
            })
          }
            function compareArrays(arr1, arr2){
              var result = [];
              for(var i = 0; i < arr2.length; i +=1){
                if(arr1.indexOf(arr2[i]) !== -1){
                  console.log(posts2[i].author, posts2[i].title, posts1[arr1.indexOf(arr2[i])].title);
                  result.push(arr2[i]);
                  $section.append('<div class="center"><h3>' + posts2[i].author + ' posted </h3><p>"'
                  + posts2[i].title + '" to <span class="orange">r/'+ text2 +
                  '</span> &<br> "' + posts1[arr1.indexOf(arr2[i])].title + '" to ' + '<span class="orange">r/' + text1 + '</span></p></div>');
                }
              }
              if(result.length === 0){
                $image.removeClass('hidden');
                $section.append('<div class="center"><h3>There are no crossposters on those 2 subs right now</h3></div>')
              }
            }
            compareArrays(author1, author2);
        });
    })
  })
})
