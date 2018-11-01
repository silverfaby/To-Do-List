var sendButton = document.getElementById('sendButton');
var tareasHoy = document.getElementById('tareasHoy');
var tareaPendiente = document.getElementById('tareasPendientes');
var tareaFinalizada = document.getElementById('tareasFinalizadas');
var miTareaParaEditar;
var userID;

function agregarTarea(){
  var tareaText = document.getElementById('tareaText');
  var tipoTarea = document.getElementById('tipoTarea');

  if(tipoTarea.value == "hoy"){
      var nuevaTarea = document.createElement('div');
      nuevaTarea.className = 'tareaHoy tarea';
      tareasHoy.appendChild(nuevaTarea);

      var checkboxTarea = document.createElement('input');
      checkboxTarea.type = 'checkbox';
      checkboxTarea.className = 'check';
      nuevaTarea.appendChild(checkboxTarea);

      var btnEdit = document.createElement('i');
      btnEdit.className = 'icon-edit btnEditar';
      nuevaTarea.appendChild(btnEdit);

      var textoTarea = document.createElement('span');
      textoTarea.className = 'spanHoy';
      $(textoTarea).text(tareaText.value);
      nuevaTarea.appendChild(textoTarea);

      guardarDatosUsuario();

  }else if(tipoTarea.value == "pendientes"){
    var nuevaTarea = document.createElement('div');
    nuevaTarea.className = 'tareaPendiente tarea';
    tareaPendiente.appendChild(nuevaTarea);

    var checkboxTarea = document.createElement('input');
    checkboxTarea.type = 'checkbox';
    checkboxTarea.className = 'check';
    nuevaTarea.appendChild(checkboxTarea);

    var btnEdit = document.createElement('i');
    btnEdit.className = 'icon-edit btnEditar';
    nuevaTarea.appendChild(btnEdit);

    var textoTarea = document.createElement('span');
    textoTarea.className = 'spanPend';
    $(textoTarea).text(tareaText.value);
    nuevaTarea.appendChild(textoTarea);

    guardarDatosUsuario();
  }
}

$("body").on("click", ".check", function (e){      //funcion para pasar a finalizados
  $(this).siblings("span").css("text-decoration", "line-through");
  $(this).siblings("span")[0].className = "spanFin";
//  console.log($(this).siblings("span")[0].className);
  $(this).siblings("i")[0].className = "icon-cog-alt btnBorrado";
  var obj = $(this).closest("div");
  $(this).remove();
  $("#tareasFinalizadas").append(obj);

  guardarDatosUsuario();
});

$(".btnTarea").click(function(e){     //muestra su correspondiente seccion hoy, pendientes, etc AREGLAR

  $("#hoyId").removeClass("activo");
  $("#pendienteId").removeClass("activo");
  $("#finalizadoId").removeClass("activo");
  $("#comprasId").removeClass("activo");
  $("#newId").removeClass("activo");
  $("#tareasHoy").hide();
  $("#tareasPendientes").hide();
  $("#tareasFinalizadas").hide();

  var myId = $(e.target).parent().attr('id');
  if(myId == undefined)myId = e.target.id;

  switch (myId) {
    case "hoyId":
        $("#tareasHoy").show();
        $("#hoyId").addClass("activo");
      break;
    case "pendienteId":
        $("#tareasPendientes").show();
        $("#pendienteId").addClass("activo");
      break;
    case "finalizadoId":
        $("#tareasFinalizadas").show();
        $("#finalizadoId").addClass("activo");
      break;
  }


});

$("#btnAgregarTarea").click(function(){
  swal({
    title: 'Ingrese la nueva tarea',
    html:
    '<input id="tareaText" class="swal2-input">' +
    '<select id="tipoTarea" class="swal2-input tipoTarea"><option value="hoy" selected="selected">para hoy</option><option value="pendientes">pendientes</option></select>',
    showCancelButton: true,
    confirmButtonText: 'Agregar',
  }).then((result) =>{
      if(result.value){
        agregarTarea();
      }
  })
});

$(".columna").on("click", ".btnEditar", function (e){  //esto hay que cambiar
  // $(this).siblings("span").attr('contentEditable', true);
  // $(this).siblings("span").focus();
  // $(this).siblings("span").select();
  // miTareaParaEditar = $(this).closest("div");
   var text = $(this).siblings("span").text();
  // $(".form-control").val(text);
  // $("#editar-contenido").show();
    swal({
    title: 'Editar: ',
    input: 'text',
    inputValue: text ,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    inputValidator: (value) => {
      if(value){
         $(this).siblings("span").text(value);
         guardarDatosUsuario();
      }
      return !value && 'Tenes que poner algo maestro!'
    }
  })
});

$(".columna").on("click", ".btnBorrado", function (e){
    swal({
    title: 'Esta seguro que desea borrar?',
    text: "Lo eliminara para siempre!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  }).then((result) => {
    if (result.value) {
      borradoYrecet($(this).closest("div"));
      swal(
        'Borrado!',
        'La tarea se a eliminado.',
        'success'
      )
    }
  })
});

$(".editar").on("click", "#btnAceptar", function (){
   miTareaParaEditar.children("span").text($(".form-control").val());
   guardarDatosUsuario();
});

// $(".editar").on("click", "#btnBorrar", function (){
//     swal({
//     title: 'Esta seguro que desea borrar?',
//     text: "Lo eliminara para siempre!",
//     type: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Si, Borrar!'
//   }).then((result) => {
//     if (result.value) {
//
//       swal(
//         'Borrado!',
//         'La tarea se a eliminado.',
//         'success'
//       )
//     }
//   })
// });

function borradoYrecet(obj){
  //$(".form-control").val("");
  //$("#editar-contenido").hide();
  // miTareaParaEditar.remove();
  // miTareaParaEditar = "";

  $(obj).remove();
  guardarDatosUsuario();
}

function setUser(){
  var restoredSessionData = JSON.parse(localStorage.getItem('listaUsuarios'));
  listaUsuarios = restoredSessionData;

  for (var i = 0; i < listaUsuarios.length; i++) {
    if(listaUsuarios[i].activo){
      userID = i;
      console.log(userID);
      listaUsuarios[i].activo = false;
    }
  }

  var fileName = location.pathname.split("/").slice(-1)
  if(fileName == "index.html"){
    cargarDatosUsuario();
    console.log("se ha cargao");
  }
}
setUser();

function guardarDatosUsuario(){
  var spanHoyList = $(".spanHoy");
  var spanPendList = $(".spanPend");
  var spanFinList = $(".spanFin");
  listaUsuarios[userID].datosHoy = [];
  listaUsuarios[userID].datosPendientes = [];
  listaUsuarios[userID].datosFinalizados = [];

  for (var i = 0; i < spanHoyList.length; i++) {
    listaUsuarios[userID].datosHoy.push($(spanHoyList[i]).text());
  }

  for (var i = 0; i < spanPendList.length; i++) {
    listaUsuarios[userID].datosPendientes.push($(spanPendList[i]).text());
  }

  for (var i = 0; i < spanFinList.length; i++) {
    listaUsuarios[userID].datosFinalizados.push($(spanFinList[i]).text());
  }

  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

function cargarDatosUsuario(){
  for (var i = 0; i < listaUsuarios[userID].datosHoy.length; i++) {
      var nuevaTarea = document.createElement('div');
      nuevaTarea.className = 'tareaHoy tarea';
      tareasHoy.appendChild(nuevaTarea);

      var checkboxTarea = document.createElement('input');
      checkboxTarea.type = 'checkbox';
      checkboxTarea.className = 'check';
      nuevaTarea.appendChild(checkboxTarea);

      var btnEdit = document.createElement('i');
      btnEdit.className = 'icon-edit btnEditar';
      nuevaTarea.appendChild(btnEdit);

      var textoTarea = document.createElement('span');
      textoTarea.className = 'spanHoy';
      $(textoTarea).text(listaUsuarios[userID].datosHoy[i]);
      nuevaTarea.appendChild(textoTarea);
  }

  for (var i = 0; i < listaUsuarios[userID].datosPendientes.length; i++) {
      var nuevaTarea = document.createElement('div');
      nuevaTarea.className = 'tareaPendiente tarea';
      tareaPendiente.appendChild(nuevaTarea);

      var checkboxTarea = document.createElement('input');
      checkboxTarea.type = 'checkbox';
      checkboxTarea.className = 'check';
      nuevaTarea.appendChild(checkboxTarea);

      var btnEdit = document.createElement('i');
      btnEdit.className = 'icon-edit btnEditar';
      nuevaTarea.appendChild(btnEdit);

      var textoTarea = document.createElement('span');
      textoTarea.className = 'spanPend';
      $(textoTarea).text(listaUsuarios[userID].datosPendientes[i]);
      nuevaTarea.appendChild(textoTarea);
  }

  for (var i = 0; i < listaUsuarios[userID].datosFinalizados.length; i++) {
      var nuevaTarea = document.createElement('div');
      nuevaTarea.className = 'tareaFinalizada tarea';
      tareaFinalizada.appendChild(nuevaTarea);

      var btnEdit = document.createElement('i');
      btnEdit.className = 'icon-cog-alt btnBorrado borrado';
      nuevaTarea.appendChild(btnEdit);

      var textoTarea = document.createElement('span');
      textoTarea.className = 'spanFin';
      textoTarea.style.textDecorationLine = "line-through";
      $(textoTarea).text(listaUsuarios[userID].datosFinalizados[i]);
      nuevaTarea.appendChild(textoTarea);
  }
}

$(".fa-running").click("click", function(){
  window.location.href = "file:///Users/fabianlamas/Documents/Acamica/TodoList/login.html";
});
