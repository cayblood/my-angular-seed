describe('Example end-to-end test', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance();
  });

  describe('home page :', function() {
    beforeEach(function() {
      browser.get('/');
    });

    it('should say hello', function() {
      var greeting = element(by.id('greeting'));
      expect(greeting.getText()).toEqual('Hello');
    });
  });
});