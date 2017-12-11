module.exports = function(app) {
  if (process.env.AUTOMIGRATE) {
    var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
    app.dataSources.db.automigrate(lbTables, function(er) {
      if (er) throw er;
      console.log('Loopback tables [', lbTables, '] created in ', app.dataSources.db.adapter.name);
      var institutosTables = [ 'Anyoescolar', 'Centro', 'Grupo', 'Materia', 'Materiaimpartida', 'Materiamatriculada', 'Matricula', 'Nivel', 'Usuario', 'Tutorizado', 'Actividad'];
      app.dataSources.db.automigrate(institutosTables, function(er) {
        if (er) throw er;
        console.log('Loopback tables [', institutosTables, '] created in ', app.dataSources.db.adapter.name);
      });
    });
  }
};
