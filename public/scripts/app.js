/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // Fake data taken from tweets.json
 // var data = [
 //   {
 //     "user": {
 //       "name": "Newton",
 //       "avatars": {
 //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
 //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
 //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
 //       },
 //       "handle": "@SirIsaac"
 //     },
 //     "content": {
 //       "text": "If I have seen further it is by standing on the shoulders of giants"
 //     },
 //     "created_at": 1461116232227
 //   },
 //   {
 //     "user": {
 //       "name": "Descartes",
 //       "avatars": {
 //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
 //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
 //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
 //       },
 //       "handle": "@rd" },
 //     "content": {
 //       "text": "Je pense , donc je suis"
 //     },
 //     "created_at": 1461113959088
 //   },
 //   {
 //     "user": {
 //       "name": "Johann von Goethe",
 //       "avatars": {
 //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
 //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
 //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
 //       },
 //       "handle": "@johann49"
 //     },
 //     "content": {
 //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
 //     },
 //     "created_at": 1461113796368
 //   }
 // ];

 function renderTweets(tweets) {
   // loops through tweets
     // calls createTweetElement for each tweet
     // takes return value and appends it to the tweets container

    tweets.forEach( (tweet) =>
    $('#tweets').prepend(createTweetElement(tweet)));

  };

// function renderLastTweet(tweets) {
//   let lastTweet = tweets[tweets.length-1];
//   $('#tweets').prepend(createTweetElement(lastTweet));
//   }

function calculateTime(date) {
  var timeNow = new Date();
  var timePosted = new Date(date);
  var yearsAgo = timeNow.getFullYear() - timePosted.getFullYear();
  if (yearsAgo > 1){
    return yearsAgo + " years ago"
  }
  var monthsAgo = timeNow.getMonth() - timePosted.getMonth();
  if (monthsAgo > 1){
    return monthsAgo + " months ago"
  }
  var daysAgo = timeNow.getDay() - timePosted.getDay();
  if (daysAgo > 1){
    return daysAgo + " days ago"
  }
  var hoursAgo = timeNow.getHours() - timePosted.getHours();
  if (hoursAgo > 1){
    return hoursAgo + " hours ago"
  }
  var minutesAgo = timeNow.getMinutes() - timePosted.getMinutes();
  if (minutesAgo > 1){
    return minutesAgo + " minutes ago"
  }
  var secondsAgo = timeNow.getSeconds() - timePosted.getSeconds();
  return secondsAgo + " seconds ago"
}

function createTweetElement(aTweet) {
  let $tweet = $('<article>').addClass('tweet');
  let header =$('<header>')
  header.append($('<img>').attr("src", aTweet.user.avatars.small))
  header.append($('<h3>').text(aTweet.user.name));
  header.append($('<p>').text(aTweet.user.handle));
  let footer = $('<footer>');
  footer.append($('<p>').text(calculateTime(aTweet.created_at)));
  footer.append($('<img>').attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bot%C3%B3n_Me_gusta.svg/200px-Bot%C3%B3n_Me_gusta.svg.png"));
  $tweet.append(header);
  $tweet.append($('<p>').text(aTweet.content.text));
  $tweet.append(footer);
  return $tweet;
}

function loadTweets() {
  $.ajax({
    url:'/tweets/',
    method: 'GET',
    success: function (data) {
      console.log(data);
      // if (num === 0) {
      renderTweets(data);
    //   }
    //   else {
    //     renderLastTweet(data);
    //   }
    // }
  // }).done( function(data) {
  //   renderTweets(Data)
  // })
}})
}


 $(document).ready(function() {
   loadTweets(0);
   $(".nothing").slideUp("slow");
   $(".tooLong").slideUp("");
   $(".compose").on("click", function () {
     $(".new-tweet").slideToggle("fast")
     $("textarea").focus();
   })
   $("form").on('input', function (e) {
     let liveInput = $(this).closest(".new-tweet").find("textarea").val();
     if (liveInput.length > 0){
       $(".nothing").slideUp("slow");
     }
     if (liveInput.length < 141) {
       $(".tooLong").slideUp("slow");
     }
   });
   $("form").on('submit', function (e) {
      e.preventDefault();

      let inputText = $(this).closest(".new-tweet").find("textarea").val();
      let twText = $(this).serialize();
      // renderTweets(data);
      if (inputText.length < 1) {
        $(".nothing").slideDown("slow");
        // return alert("at leastnput something");
      }
      if (inputText.length > 140) {
        // return alert("It is too long");
        $(".tooLong").slideDown("slow");
        return;
      }
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: twText,
        success: function(suc) {
          console.log('suc');
          // loadTweets()
          $('#tweets').html("");
          loadTweets();
          // loadTweets(1);

        },
        error: function(err) {
          console.log('err');
        }
      })
      // .done(function (data) {
      //   console.log(data);
      // });

    });
});
