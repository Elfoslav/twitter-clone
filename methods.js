Meteor.methods({
  addTweet: function(data) {
    if (!data.text) {
      throw new Meteor.Error('wrong-tweet-data', 'Write something!');
    }
    if (data.text.length > 140) {
      throw new Meteor.Error('wrong-tweet-data', 'Your tweet is so long!');
    }
    return Tweets.insert({
      text: data.text,
      timestamp: Date.now()
    });
  }
})