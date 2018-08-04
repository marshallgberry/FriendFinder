var friendsData = require("../data/friend");


module.exports = function(app) {
  
  //api get request
  app.get("/api/friend", function(req, res) {
    res.json(friendsData);
  });

  //api post request

  app.post("/api/friend", function(req, res) {

    //post routes /api/friends handles submitted survey results compatibility logic
    var newUserScore = req.body.scores;
    var results = [];
    var match = 0;
    var bestFriends;
    
    //goes through friendsArray, compares scores, and pushes difference of comparison to results array
    for (var i=0; i<friendsData.length; i+=1) {
      var difference = 0;
      //goes through newUserScore array and compares score with individual user in array
      for (var j=0; j<newUserScore.length; j+=1) {
        console.log(friendsData[i].scores[j])
        difference += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newUserScore[j])))
      };
      //pushes to results array
      results.push(difference);
    }

    console.log(results);

    //goes through results array
    for (var i=0; i<results.length; i+=1) {
      console.log(results[i]);
      //compares if difference is less than or equal to first result index, if less or equal match gets reassigned and compared again until loop is complete
      if(results[i] <= results[match]) {
        match = i
        console.log(match);
      }
    };

    //new variable get assigned the best match and gets sent out
    bestFriends = friendsData[match]; 
    console.log("*******************************************");
    console.log(bestFriends);

    //pushes user to friendsArray
    friendsData.push(req.body);
    res.json(bestFriends);
  });

};