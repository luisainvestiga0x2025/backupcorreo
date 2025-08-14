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
      subject: 'Entrevista confirmada - Caso Watergate',
      date: '2025-08-13 14:30',
      from: 'editor@periodismoinvestigativo.com',
      body: 'Hola, confirmamos tu entrevista con la fuente anónima del caso Watergate para el próximo martes a las 3pm. Por favor lleva tu grabadora y ningún dispositivo electrónico adicional.',
      was_read: false
    },
    {
      id: 1,
      subject: 'Backup de evidencia',
      date: '2025-08-10 10:45',
      from: 'Luisa',
      body: 'RXN0dXZlIGFxde06ICAKQ29vcmRlbmFkYXM6IDQuOTE3MTc3NzAwMDM1MTgxNSwgLTc0LjA5ODA2ODk2MjU4NzAyIChDYWZldGVy7WEgQ3VjaGlwYW5kYSwgVGFiaW8sIEN1bmRpbmFtYXJjYSkuICAKUGFzczogQ3VjaGlwYW5kYS1taS1sdWdhci1zZWd1cm8=',
      was_read: false
    },
    {
      id: 2,
      subject: 'RE: Solicitud de comentarios',
      date: '2025-11-15 11:12',
      from: 'rparker@ayuntamiento.gov',
      body: 'Estimada estudiante, en relación a su solicitud de información sobre el caso de corrupción municipal, lamentamos informarle que no podemos hacer comentarios mientras la investigación esté en curso. Atentamente, Ricardo Parker - Departamento de Prensa.',
      was_read: false
    },
    {
      id: 3,
      subject: 'Programación de entrevista',
      date: '2025-08-02 14:30',
      from: 'reportajes@eltiempo.com',
      body: 'Hola, Luisa, queremos realizarte una entrevista sobre el caso del alcalde para el próximo 6 de Agosto. Queremos hablar sobre tus hallazgos y evidencias. Buen día.',
      was_read: false
    },
    {
      id: 4,
      subject: 'Información confidencial - Escándalo universitario',
      date: '2025-06-17 08:15',
      from: 'whistleblowerX@protonmail.com',
      body: 'No respondas este correo. Los documentos que solicitaste sobre las irregularidades en los exámenes de admisión están adjuntos. Usa esta información con cuidado. - Fuente C.',
      was_read: false
    },
    {
      id: 5,
      subject: 'Lugar seguro',
      date: '2025-02-14 21:22',
      from: 'Luisa',
      body: 'Usa la primera letra de cada palabra de mi último tweet. Y no olvides, todo en Mayúsculas.',
      was_read: false
    },
    {
      id: 6,
      subject: 'URGENTE: Cambio de ubicación para la reunión',
      date: '2025-02-18 19:05',
      from: 'contactoseguro@tutanota.com',
      body: 'Por motivos de seguridad, hemos cambiado la ubicación de nuestro encuentro. Ahora será en el café Libertad a las 11am. Ve sola y no menciones este correo a nadie.',
      was_read: false
    },
    {
      id: 7,
      subject: 'Recordatorio: Deadline investigación contaminación',
      date: '2024-11-19 09:00',
      from: 'prof.gonzalez@facultad.edu',
      body: 'Recuerda que el reportaje sobre la contaminación industrial debe entregarse este viernes. Asegúrate de verificar todas tus fuentes y tener al menos tres testimonios confirmados. Saludos, Prof. González.',
      was_read: false
    },
    {
      id: 8,
      subject: 'Filtración: Documentos internos PharmaCorp',
      date: '2024-08-16 02:18',
      from: 'justicieroanonimo@mailfence.com',
      body: 'Adjunto encontrarás los documentos que prueban los experimentos no autorizados de PharmaCorp. Estos son extremadamente sensibles. Recomiendo usar seudónimo al publicar. El mundo necesita saber la verdad.',
      was_read: false
    },
    {
      id: 9,
      subject: 'Advertencia de seguridad',
      date: '2025-05-24 12:47',
      from: 'techsupport@securejournos.org',
      body: 'Hemos detectado intentos de hackeo a tu cuenta. Por favor activa la autenticación en dos pasos y cambia tu contraseña inmediatamente. Considera usar nuestro servicio de email encriptado para comunicaciones sensibles.',
      was_read: false
    },
    {
      id: 10,
      subject: 'Invitación: Conferencia sobre periodismo de investigación',
      date: '2024-05-21 15:30',
      from: 'eventos@fundacionprensalibre.org',
      body: 'Estimada colega, te invitamos a participar como panelista en nuestra próxima conferencia "Desafíos del periodismo investigativo en la era digital". Fecha: 5 de diciembre. Responder antes del 28/11.',
      was_read: false
    },
    {
      id: 11,
      subject: 'FUENTE CONFIABLE: Información sobre el alcalde',
      date: '2024-01-22 07:12',
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
    outbox = [
    {
      id: 0,
      subject: 'Salgo a investigar',
      date: '2025-08-13 08:39',
      from: 'luisa.periodismo@universidad.edu',
      to: 'marcos-osint',
      body: 'Marcos, hoy saldré a recolectar pruebas para una gran investigación que estoy haciendo, espero tener noticias pronto y darte grandes sorpresas. No olvides el lugar seguro, por si acaso.',
      was_read: true
    },
    {
      id: 1,
      subject: 'Solicitud de entrevista - Caso corrupción municipal',
      date: '2025-08-10 09:30',
      from: 'luisa.periodismo@universidad.edu',
      to: 'rparker@ayuntamiento.gov',
      body: 'Estimado Sr. Parker, soy Luisa Méndez, estudiante de periodismo investigativo. Estoy trabajando en un reportaje sobre irregularidades en contratos del ayuntamiento en 2024. ¿Podría concederme una entrevista o proporcionar una declaración oficial? Agradezco su atención. Saludos, Luisa Méndez.',
      was_read: true
    },
    {
      id: 2,
      subject: 'Confirmación asistencia a entrevista - Caso Watergate',
      date: '2025-08-12 11:45',
      from: 'luisa.periodismo@universidad.edu',
      to: 'editor@periodismoinvestigativo.com',
      body: 'Confirmo mi asistencia a la entrevista del martes 13/08 a las 3pm. Llevaré únicamente mi grabadora profesional (modelo XJ-200 sin conexión wifi) y cuaderno de notas, como indicaron. ¿Hay algún protocolo de seguridad adicional que deba seguir? Atentamente, Luisa.',
      was_read: true
    },
    {
      id: 3,
      subject: 'Re: Filtración PharmaCorp - Verificación de documentos',
      date: '2025-05-25 14:20',
      from: 'luisa.periodismo@universidad.edu',
      to: 'justicieroanonimo@mailfence.com',
      body: 'Recibí los archivos sobre los experimentos no autorizados. Para proceder, necesito validar su autenticidad: 1) ¿Tiene acceso a registros de pacientes afectados? 2) ¿Podría indicar cómo obtuvo los documentos adjuntos? Protegeré su identidad bajo el código "Fuente Gamma". Saludos, L.',
      was_read: true
    },
    {
      id: 4,
      subject: 'Coordinación entrevista - Caso alcalde',
      date: '2025-08-03 16:15',
      from: 'luisa.periodismo@universidad.edu',
      to: 'reportajes@eltiempo.com',
      body: 'Acepto la entrevista para el 6/08. Adjunto lista de temas a cubrir: 1) Cuentas offshore (evidencia 2024), 2) Sobornos en licitaciones, 3) Mi metodología de investigación. CONDICIÓN: No revelar ubicación de fuentes. ¿Podrían enviarme el cuestionario con anticipación? Saludos, Luisa Méndez.',
      was_read: true
    },
    {
      id: 5,
      subject: 'Respuesta a advertencia de seguridad',
      date: '2025-05-24 13:30',
      from: 'luisa.periodismo@universidad.edu',
      to: 'techsupport@securejournos.org',
      body: 'Gracias por la alerta. He: 1) Activado autenticación en dos pasos, 2) Cambiado mi contraseña a una de 18 caracteres, 3) Migrado comunicaciones sensibles a ProtonMail. ¿Recomiendan alguna VPN específica para investigar a PharmaCorp? Adjunto registro de intentos de phishing recibidos. Saludos, L.M.',
      was_read: true
    }
];
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
