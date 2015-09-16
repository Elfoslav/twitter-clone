if (Meteor.isClient) {
  function submitTweetForm(form) { 
    console.log('form: ', form);
    var data = {
      text: form.tweet.value
    };
    Meteor.call('addTweet', data, function(err, result) {
      if (err) {
        alert(err.reason);
      } else {
        form.reset();
      }
    });
    $('#tweetModal').modal('hide');
  }
  
  Meteor.subscribe('tweets');

  Template.tweetForm.events({
    'submit .tweet-form': function(e) {
      e.preventDefault();
      submitTweetForm(e.target);
    },
    'keyup .tweet-form [name="tweet"]': function(e) {
      var availableCharCount = 140 - e.target.value.length;
      $('.char-count').text(availableCharCount);
    }
  });
  
  Template.hello.helpers({
    tweets: function() {
      return Tweets.find({}, {
        sort: { timestamp: -1 }
      });
    }
  });
  
  Template.hello.events({
    'click .submit-tweet-btn': function(e) {
      submitTweetForm($('#tweetModal .tweet-form')[0]);
    },
    'click .add-tweet-btn': function() {
      $('#tweetModal').modal();
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('tweets', function() {
    return Tweets.find({}, {
      sort: { timestamp: -1 },
      limit: 100
    });
  });
}
