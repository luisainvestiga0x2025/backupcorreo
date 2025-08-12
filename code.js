angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
    .state('appmenu', {
      url: "/app",
      abstract: true,
      templateUrl: "app-menu.html",
    	controller: "EmailMenuCtrl"
    })
    .state('appmenu.email-list', {
      url: "/emails/:mode",
      views: {
        'menuContent': {
          templateUrl: "email-list.html",
          controller: "EmailListCtrl"
        }
      }
    })
    .state('appmenu.email-view', {
      url: "/emails/:mode/:id",
      views: {
        'menuContent': {
          templateUrl: "email-view.html",
          controller: "EmailViewCtrl"
        }
      }
    })

  $urlRouterProvider.otherwise("/app/emails/inbox");

  $ionicConfigProvider.backButton.previousTitleText(false).text('');
})


.controller('EmailMenuCtrl', function($scope, EmailService) {
  $scope.data = {
    inboxCount: EmailService.getInboxEmailCount(),
    flaggedCount: 333,
    sentCount: EmailService.getOutboxEmailCount()
  };
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
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
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
    }, {
      id: 3,
      subject: 'Test subj #4',
      date: '0',
      from: 'Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 4,
      subject: 'Test subj #1',
      date: '0',
      from: 'John',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 5,
      subject: 'dfhdsfhsdfhsdf',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 6,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 7,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 8,
      subject: 'dhfsdf dfhdasfhsdf',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 9,
      subject: 'Test subj #11',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 10,
      subject: 'Test subj #21',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 11,
      subject: 'Test subj #31',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 12,
      subject: 'Test subj #41',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 13,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 14,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 15,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 16,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 17,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 18,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 19,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 20,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 21,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 22,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 23,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 24,
      subject: 'Test subj #1',
      date: '1',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 25,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 26,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 27,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 28,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 29,
      subject: 'dfhsdfhsdf dfshsd',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 30,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 31,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 32,
      subject: 'Test subj #1',
      date: '0',
      from: 'ooo Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 33,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 34,
      subject: 'Test subj #1',
      date: '1',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 35,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 36,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 37,
      subject: 'Test subj #1',
      date: '1',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 38,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 39,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 40,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 41,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 42,
      subject: 'Test subj #1',
      date: '0',
      from: 'ooo Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 43,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 44,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 45,
      subject: 'Test subj #1',
      date: '0',
      from: 'aaa Doe',
      body: 'Test e-mail body #1',
      was_read: false
    }, {
      id: 46,
      subject: 'dfghsdfh fdhgs dfh',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: true
    }, {
      id: 47,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: true
    }, {
      id: 48,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: true
    }, {
      id: 49,
      subject: 'Test subj #1',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: true
    }, {
      id: 50,
      subject: 'Test subj last',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
      was_read: true
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
    }, {
      id: 3,
      subject: 'Out - Test subj #4',
      date: '0',
      from: 'Doe',
      body: 'Test e-mail body #1',
      was_read: true
    }, {
      id: 4,
      subject: 'Out - Test subj #1',
      date: '0',
      from: 'John',
      body: 'Test e-mail body #1',
      was_read: true
    }, {
      id: 50,
      subject: 'Out - Test subj last',
      date: '0',
      from: 'John Doe',
      body: 'Test e-mail body #1',
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
