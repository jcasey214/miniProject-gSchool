$(document).ready(function(){
  var text1;
  var text2;
  $button = $('.submit')
  $main = $('main');

  $button.on('click', function(event){
    // console.log('hi');
    text1 = $('#text1').val();
    text2 = $('#text2').val();
    // console.log(text1);
    // console.log(text2);


  $.get('http://www.reddit.com/r/' + text1 + '.json')
    .done(function(data1){
      // console.log(data1);
      var author1 = [];
      var author2 = [];
      for(var i = 0; i < data1.data.children.length; i +=1){
        author1.push(data1.data.children[i].data.author);
      }
      $.get('http://www.reddit.com/r/' + text2 + '.json')
        .done(function(data2){
        for(var i = 0; i < data2.data.children.length; i +=1){
          author2.push(data2.data.children[i].data.author)
        }
          // console.log(author2);
          // console.log(author1);
          function compareArrays(arr1, arr2){
            var result = [];
            for(var i = 0; i < arr2.length; i +=1){
              if(arr1.indexOf(arr2[i]) !== -1){
                result.push(arr2[i])
              }
            }
            return result;
          }
          var crossPosters = compareArrays(author1, author2);
          console.log(crossPosters);
          $main.text((crossPosters.join(', ')));
      })
            // console.log(author1);
            // console.log(author2);
  })
})
})
//
//
// })

// console.log(listings);
