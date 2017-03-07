module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('profesor', function(role, context, cb) {

    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

      // Step 2: check if User is part of the Team associated with this Project
      // (using count() because we only want to know if such a record exists)
      var Materiaimpartida = app.models.Materiaimpartida;
      Materiaimpartida.count({
        userId: userId
      }, function(err, count) {
        // A: The datastore produced an error! Pass error to callback
        if (err) return cb(err);

        if(count > 0){
          // A: YES. At least one Team associated with this User AND Project
          // callback with TRUE, user is role:`teamMember`
          return cb(null, true);
        }

		else{
          // A: NO, User is not in this Project's Team
          // callback with FALSE, user is NOT role:`teamMember`
          return cb(null, false);
        }
      });
  });
};

