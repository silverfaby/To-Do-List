var restoredSessionData;

var saveSession =  {
    'cuenta' : []
};

var users = {
  'nombreUsuario' : "",
  'passUsuario' : ""
}
var listaUsuarios = [];

function Usuarios(nombre, pass, active, hoy, pendientes, finalizados){
  this.nombreDeUsuario = nombre;
  this.password = pass;
  this.activo = active;
  this.datosHoy = hoy;
  this.datosPendientes = pendientes;
  this.datosFinalizados = finalizados;
}

$("#btnCrearCuenta").click(function(){
  var usuario = $("#usuario").val();
  var password = $("#password").val();

  if(usuario == "" || password == "")return;

  for (var i = 0; i < listaUsuarios.length; i++) {
    if(listaUsuarios[i].nombreDeUsuario == usuario){
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'El usuario ya existe!!!!!!',
      })
      return;
    }
  }

  listaUsuarios.push(new Usuarios(usuario, password, true, [], [], []))
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
  swal({
    type: 'success',
    title: 'Cuenta creada exitosamente!!!',
    showConfirmButton: false,
    timer: 1200
  })
});

$("#btnLogin").click(function(){
  var usuario = $("#usuario").val();
  var password = $("#password").val();

  for (var i = 0; i < listaUsuarios.length; i++) {
    if(listaUsuarios[i].nombreDeUsuario == usuario && listaUsuarios[i].password == password){
      listaUsuarios[i].activo = true;
      localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
      window.location.href = "file:///Users/fabianlamas/Documents/Acamica/TodoList/index.html";
      return;
    }
  }
  swal({
    type: 'error',
    title: 'Error...',
    text: 'El usuario o la contraseña son incorrecto!',
  })
});

function cargarDatos(){
  restoredSessionData = JSON.parse(localStorage.getItem('listaUsuarios'));
  listaUsuarios = restoredSessionData;
}

function iniciar(){
  cargarDatos();
}

iniciar();
