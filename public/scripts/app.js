"use strict";
// this is to calculate the time passed when the tweet is posted.
function calculateTime(date) {
  const timeNow = new Date();
  const timePosted = new Date(date);

  const yearsAgo = timeNow.getFullYear() - timePosted.getFullYear();
  if (yearsAgo > 1){
    return yearsAgo + " years ago";
  }

  const monthsAgo = timeNow.getMonth() - timePosted.getMonth();
  if (monthsAgo > 1){
    return monthsAgo + " months ago";
  }

  const daysAgo = timeNow.getDay() - timePosted.getDay();
  if (daysAgo > 1){
    return daysAgo + " days ago";
  }

  const hoursAgo = timeNow.getHours() - timePosted.getHours();
  if (hoursAgo > 1){
    return hoursAgo + " hours ago";
  }

  const minutesAgo = timeNow.getMinutes() - timePosted.getMinutes();
  if (minutesAgo > 1){
    return minutesAgo + " minutes ago";
  }

  const secondsAgo = timeNow.getSeconds() - timePosted.getSeconds();
  return secondsAgo + " seconds ago";
}

// this function is to append html information to the container.
function createTweetElement(aTweet) {
  let $tweet = $('<article>').addClass('tweet');
  let header =$('<header>');
  header.append($('<img>').attr("src", aTweet.user.avatars.small));
  header.append($('<h3>').text(aTweet.user.name));
  header.append($('<p>').text(aTweet.user.handle));
  let footer = $('<footer>');
  footer.append($('<p>').text(calculateTime(aTweet.created_at)));
  footer.append($('<img>').attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bot%C3%B3n_Me_gusta.svg/200px-Bot%C3%B3n_Me_gusta.svg.png"));
  $tweet.append(header);
  $tweet.append($('<p>').text(aTweet.content.text));
  $tweet.append(footer);
  return $tweet;
};

//This is for printing all the tweet from the tweets array.
 function renderTweets(tweets) {
    tweets.forEach( (tweet) =>
    $('#tweets').prepend(createTweetElement(tweet)));
  };

// This is for loading the tweets from the database and once called invoke renderfunctions to print it to the #tweets container.
function loadTweets() {
  $.ajax({
    url:'/tweets/',
    method: 'GET',
    success: function (data) {
      renderTweets(data);
    }});
};

$(document).ready(function() {
  loadTweets(); // render the existing tweets in the database.
  // this is for hiding the text "Too long" and "input something"
  $(".nothing").slideUp("slow");
  $(".tooLong").slideUp();
  // this is for toggling the conposebutton to display compose tweet element.
  $(".compose").on("click", function () {
    $(".new-tweet").slideToggle("fast");
    $("textarea").focus();
  });
  // this is for hiding the red flags of "too long" and "input something" when the user corrects it in the textarea.
  $("#newTweet").on('input', function (e) {
    let liveInput = $(this).closest(".new-tweet").find("textarea").val();
    if (liveInput.length > 0){
      $(".nothing").slideUp("slow");
    }
    if (liveInput.length < 141) {
      $(".tooLong").slideUp("slow");
    }
  });

  $("#newTweet").on('submit', function (e) {
    e.preventDefault();

    let inputText = $(this).closest(".new-tweet").find("textarea").val();
    let twText = $(this).serialize();
    //triggering the flag that its an empty string.
    if (inputText.length < 1) {
      $(".nothing").slideDown("slow");
    }
    //triggering the red flag that t  he tweet is too long.
    if (inputText.length > 140) {
      $(".tooLong").slideDown("slow");
      return;
    }

    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: twText,
      success: function(suc) {
        // delete the whole #tweets then re render all the tweets from the database.
        $('#tweets').html("");
        loadTweets();
      },
      error: function(err) {
        console.log('err');
      }
    });
  });
});
