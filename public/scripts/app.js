/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 var tweetData = {
   "user": {
     "name": "Newton",
     "avatars": {
       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
     },
     "handle": "@SirIsaac"
   },
   "content": {
     "text": "If I have seen further it is by standing on the shoulders of giants"
   },
   "created_at": 1461116232227
 }


function createTweetElement(object) {
  let tweet = $('<article>');
  let header =$('<header>')
  header.append($('<img>').attr("src", object.user.avatars.small))
  header.append($('<h3>').text(object.user.name));
  header.append($('<p>').text(object.user.handle));
  let footer = $('<footer>');
  footer.append($('<p>').text(object.created_at));
  footer.append($('<img>').attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bot%C3%B3n_Me_gusta.svg/200px-Bot%C3%B3n_Me_gusta.svg.png"));
  tweet.append(header);
  tweet.append($('<p>').text(object.context.text));
  tweet.append(footer);
  return tweet;
}




 $(document).ready(function() {
   var $tweet = createTweetElement(tweetData);
   // Test / driver code (temporary)
   console.log($tweet); // to see what it looks like
   $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
