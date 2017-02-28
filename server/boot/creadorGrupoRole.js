module.exports = function(app) {
  var Role = app.models.Role;

  Role.registerResolver('creadorGrupo', function(role, context, cb) {
    //El usuario debe estar logueado
    var userId = context.accessToken.userId;
    if (!userId) {
      //Si no es user devuelve un false
      return process.nextTick(() => cb(null, false));
    }
    //El usuario debe estar como creador de un centro
      var grupo = app.models.Grupo;
      grupo.count({
        verificado:true,
        userId: userId
      }, function(err, count) {
        if (err) return cb(err);
        if(count > 0){
          // Si count lo ha encontrado devuelve true, luego es "creadorGrupo"
          return cb(null, true);
        }else{
          return cb(null, false);
        }
    });
  });
};

