const testHelper = require('../../../helpers/test-helper');
const {expect} = require('chai');
const {chrome, Options} = require('selenium-webdriver/chrome');
const test = require('selenium-webdriver/testing');


test.describe('search_result_tracking.js', function () {

  testHelper.seleniumSetup('http://localhost:5400/search?count=10&q=brexit&start_index=11');

  test.describe('listSearchResults()', function () {
    test.it('results should be greater than 0', function (done) {
      this.driver.executeScript('return UK_Parliament.searchTracking().addListeners();')
        .then(function(ret) {
          expect(ret.length).to.be.gt(0);
        });
      done();
    });
  });

  test.describe('resultHintArray()', function () {
    test.it('returns resultHints', function (done) {
      this.driver.executeScript('\
        return \
        hintNodes = [ \
          { textContent: "hint one" }, \
          { textContent: "hint two" }, \
          { textContent: "hint three" } \
        ]; \
        UK_Parliament.searchTracking().resultHintArray(hintNodes); \
      ')
        .then(function(ret) {
          expect(ret).to.be.an('array').to.have.lengthOf(3);
        });
      done();
    });
  });

  test.describe('getQueryStrings()', function () {
    test.it('should return all query strings', function (done) {
      this.driver.executeScript('return UK_Parliament.searchTracking().getQueryStrings();')
        .then(function(ret) {
          expect(ret).to.be.an('object');
          /**
           * Chai's `.to.equal` comparing objects doesn't work as expected
           * When comparing objects, chai needs to traverse the objects and compare nested properties. That's why the deep flag is needed for object comparison.
           */
          expect(ret).to.deep.equal({ count: '10', q: 'brexit', start_index: '11' });
        });
      done();
    });

    test.it('should return value of `start_index` query string', function (done) {
      this.driver.executeScript('return UK_Parliament.searchTracking().getQueryStrings()["start_index"];')
        .then(function(ret) {
          expect(ret).to.equal('11');
        });
      done();
    });
  });
});
