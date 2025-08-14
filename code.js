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
    inbox = [{
      id: 0,
      subject: 'Hola!',
      date: '0',
      from: 'daolihax',
      body: 'Probando, probando, eeeeooo....',
      was_read: false
    }, {
      id: 1,
      subject: 'Test subj #2',
      date: '0',
      from: 'John',
      body: 'Test e-mail body #2',
      was_read: false
    }, {
      id: 2,
      subject: 'Test subj #3',
      date: '0',
      from: 'dd John Doe',
      body: 'Test e-mail body #3',
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
