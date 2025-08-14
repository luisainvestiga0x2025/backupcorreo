angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
  .state('app', {  // Cambiado de 'appmenu' a 'app'
    url: "/app",
    abstract: true,
    templateUrl: "app-menu.html",
    controller: "EmailMenuCtrl"
  })
  .state('app.email-list', {  // Asegúrate de que sea 'app.email-list'
    url: "/emails/:mode",
    views: {
      'menuContent': {
        templateUrl: "email-list.html",
        controller: "EmailListCtrl"
      }
    }
  })
  .state('app.email-view', {  // Asegúrate de que sea 'app.email-view'
    url: "/emails/:mode/:id",
    views: {
      'menuContent': {
        templateUrl: "email-view.html",
        controller: "EmailViewCtrl"
      }
    }
  });

  $urlRouterProvider.otherwise("/app/emails/inbox");

  $ionicConfigProvider.backButton.previousTitleText(false).text('');
})


.controller('EmailMenuCtrl', function($scope, EmailService) {
  $scope.data = {
    inboxCount: 0,
    flaggedCount: 0,
    sentCount: 0
  };

  // Espera a que el servicio cargue los datos
  $scope.$watch(function() {
    return EmailService.getInboxEmailCount();
  }, function(count) {
    $scope.data.inboxCount = count;
  });

  $scope.$watch(function() {
    return EmailService.getOutboxEmailCount();
  }, function(count) {
    $scope.data.sentCount = count;
  });
})
.controller('EmailListCtrl', function($stateParams, $scope, EmailService) {

  $scope.emails = [];

  $scope.data = {
    showDelete: false,
    mode: $stateParams.mode,
    title: ''
  };

  $scope.setListData = function() {
    switch ($stateParams.mode) {
      case 'inbox':
        $scope.data.title = 'Inbox - All';
        $scope.emails = EmailService.getInboxEmails();
        break;
      case 'flagged':
        $scope.data.title = 'Inbox - Flagged';
        $scope.emails = EmailService.getInboxEmails();
        break;
      case 'sent':
        $scope.data.title = 'Sent';
        $scope.emails = EmailService.getOutboxEmails();
        break;
      default:
        $scope.data.title = 'E-Mails';
    }
  };

  $scope.setListData();

  $scope.onItemDelete = function(email) {
    $scope.emails.splice($scope.emails.indexOf(email), 1);
  };
})

.controller('EmailViewCtrl', function($stateParams, $scope, $timeout, EmailService) {
  if ($stateParams.mode == 'sent') {
    $scope.email = EmailService.getOutboxEmail($stateParams.id);
  } else {
    $scope.email = EmailService.getInboxEmail($stateParams.id);
  }
  $timeout(function() {
    $scope.email.was_read = true;
  }, 500);
})

.factory('EmailService', function() {
  var inbox = [];
  var outbox = [];

  function readInboxEmails() {
    if (inbox.length) {
      return;
    }
    inbox = [
    {
      id: 0,
      subject: 'Hola!',
      date: '2023-11-15 09:23',
      from: 'daolihax',
      body: 'Probando, probando, eeeeooo....',
      was_read: false
    },
    {
      id: 1,
      subject: 'Test subj #2',
      date: '2023-11-15 10:45',
      from: 'John',
      body: 'Test e-mail body #2',
      was_read: false
    },
    {
      id: 2,
      subject: 'Test subj #3',
      date: '2023-11-15 11:12',
      from: 'John Doe',
      body: 'Test e-mail body #3',
      was_read: false
    },
    {
      id: 3,
      subject: 'Entrevista confirmada - Caso Watergate',
      date: '2023-11-16 14:30',
      from: 'editor@periodismoinvestigativo.com',
      body: 'Hola, confirmamos tu entrevista con la fuente anónima del caso Watergate para el próximo martes a las 3pm. Por favor lleva tu grabadora y ningún dispositivo electrónico adicional.',
      was_read: false
    },
    {
      id: 4,
      subject: 'Información confidencial - Escándalo universitario',
      date: '2023-11-17 08:15',
      from: 'whistleblowerX@protonmail.com',
      body: 'No respondas este correo. Los documentos que solicitaste sobre las irregularidades en los exámenes de admisión están adjuntos. Usa esta información con cuidado. - Fuente C.',
      was_read: false
    },
    {
      id: 5,
      subject: 'RE: Solicitud de comentarios',
      date: '2023-11-17 16:22',
      from: 'rparker@ayuntamiento.gov',
      body: 'Estimada estudiante, en relación a su solicitud de información sobre el caso de corrupción municipal, lamentamos informarle que no podemos hacer comentarios mientras la investigación esté en curso. Atentamente, Ricardo Parker - Departamento de Prensa.',
      was_read: false
    },
    {
      id: 6,
      subject: 'URGENTE: Cambio de ubicación para la reunión',
      date: '2023-11-18 19:05',
      from: 'contactoseguro@tutanota.com',
      body: 'Por motivos de seguridad, hemos cambiado la ubicación de nuestro encuentro. Ahora será en el café Libertad a las 11am. Ve sola y no menciones este correo a nadie.',
      was_read: false
    },
    {
      id: 7,
      subject: 'Recordatorio: Deadline investigación contaminación',
      date: '2023-11-19 09:00',
      from: 'prof.gonzalez@facultad.edu',
      body: 'Recuerda que el reportaje sobre la contaminación industrial debe entregarse este viernes. Asegúrate de verificar todas tus fuentes y tener al menos tres testimonios confirmados. Saludos, Prof. González.',
      was_read: false
    },
    {
      id: 8,
      subject: 'Filtración: Documentos internos PharmaCorp',
      date: '2023-11-20 02:18',
      from: 'justicieroanonimo@mailfence.com',
      body: 'Adjunto encontrarás los documentos que prueban los experimentos no autorizados de PharmaCorp. Estos son extremadamente sensibles. Recomiendo usar seudónimo al publicar. El mundo necesita saber la verdad.',
      was_read: false
    },
    {
      id: 9,
      subject: 'Advertencia de seguridad',
      date: '2023-11-20 12:47',
      from: 'techsupport@securejournos.org',
      body: 'Hemos detectado intentos de hackeo a tu cuenta. Por favor activa la autenticación en dos pasos y cambia tu contraseña inmediatamente. Considera usar nuestro servicio de email encriptado para comunicaciones sensibles.',
      was_read: false
    },
    {
      id: 10,
      subject: 'Invitación: Conferencia sobre periodismo de investigación',
      date: '2023-11-21 15:30',
      from: 'eventos@fundacionprensalibre.org',
      body: 'Estimada colega, te invitamos a participar como panelista en nuestra próxima conferencia "Desafíos del periodismo investigativo en la era digital". Fecha: 5 de diciembre. Responder antes del 28/11.',
      was_read: false
    },
    {
      id: 11,
      subject: 'FUENTE CONFIABLE: Información sobre el alcalde',
      date: '2023-11-22 07:12',
      from: 'ciudadanopreocupado@temp-mail.net',
      body: 'Tengo pruebas de las cuentas offshore del alcalde. Puedo proporcionarte los documentos, pero necesito garantías de anonimato absoluto. Responde a este correo si estás interesada.',
      was_read: false
    },
    {
      id: 12,
      subject: 'Seguimiento: Denuncia por acoso laboral',
      date: '2023-11-22 18:33',
      from: 'victimaAC@anonymousbox.com',
      body: 'Gracias por interesarte en mi caso. Estoy dispuesta a hablar contigo bajo condición de anonimato. Las pruebas que mencioné incluyen grabaciones y correos electrónicos. ¿Cuándo podemos reunirnos?',
      was_read: false
    }];
  };

  function readOutboxEmails() {
    if (outbox.length) {
      return;
    }
    outbox = [{
      id: 0,
      subject: 'Out - Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: true
    }, {
      id: 1,
      subject: 'Out - Test subj #2',
      date: '0',
      from: 'John',
      body: 'Test e-mail body #2',
      was_read: true
    }, {
      id: 2,
      subject: 'Out - Test subj #3',
      date: '0',
      from: 'dd John Doe',
      body: 'Test e-mail body #3',
      was_read: true
    }];
  };

  return {
    getInboxEmailCount: function() {
      readInboxEmails();
      return inbox.length;
    },
    getOutboxEmailCount: function() {
      readOutboxEmails();
      return outbox.length;
    },   
    getInboxEmails: function() {
      readInboxEmails();
      return inbox;
    },
    getOutboxEmails: function() {
      readOutboxEmails();
      return outbox;
    },
    getInboxEmail: function(id) {
      for (i = 0; i < inbox.length; i++) {
        if (inbox[i].id == id) {
          return inbox[i];
        }
      }
      return null;
    },
    getOutboxEmail: function(id) {
      for (i = 0; i < outbox.length; i++) {
        if (outbox[i].id == id) {
          return outbox[i];
        }
      }
      return null;
    }
  }
}); 
