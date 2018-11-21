const testHelper = require('../../../helpers/test-helper');
const {Builder, By, Key, until} = require('selenium-webdriver');
const {expect} = require('chai');


describe('search_result_tracking.js', () => {

  let seleniumSetup = testHelper.seleniumSetup('http://localhost:5400/search?count=10&q=brexit&start_index=11');


  describe('listSearchResults()', () => {
    it('results should be greater than 0', async () => {
      await seleniumSetup.driver.executeScript('return UK_Parliament.searchTracking().addListeners();')
        .then(function(ret) {
          expect(ret.length).to.be.gt(1);
        });
    });
  });


  describe('resultHintArray()', () => {
    it('returns resultHints', async () => {
      await seleniumSetup.driver.executeScript('\
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
    });
  });


  describe('getQueryStrings()', () => {
    it('should return all query strings', async () => {
      await seleniumSetup.driver.executeScript('return UK_Parliament.searchTracking().getQueryStrings();')
        .then(function(ret) {
          expect(ret).to.be.an('object');
          /**
           * Chai's `.to.equal` comparing objects doesn't work as expected
           * When comparing objects, chai needs to traverse the objects and compare nested properties. That's why the deep flag is needed for object comparison.
           */
          expect(ret).to.deep.equal({ count: '10', q: 'brexit', start_index: '11' });
        });
    });

    it('should return value of `start_index` query string', async () => {
      await seleniumSetup.driver.executeScript('return UK_Parliament.searchTracking().getQueryStrings()["start_index"];')
        .then(function(ret) {
          expect(ret).to.equal('11');
        });
    });
  });

});
