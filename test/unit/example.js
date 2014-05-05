describe('Example controller: ', function() {
  beforeEach(module('app'));

  describe('HomeController', function() {
    var HomeController, scope, httpBackend, baseUrl;

    beforeEach(inject(function ($httpBackend, $rootScope, $controller, SERVICE_BASE_URL) {
      httpBackend = $httpBackend;
      scope = $rootScope.$new();
      baseUrl = SERVICE_BASE_URL;
      HomeController = $controller(
        'HomeController as ctl',
        {$scope: scope}
      );
    }));

    it('loads a list of items into the scope', function () {
      expect(scope.ctl.items.length).toBe(2);
    });
  });
});