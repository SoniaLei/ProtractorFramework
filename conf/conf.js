var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const { allure } = require('jasmine-allure-reporter');

var reporter = new HtmlScreenshotReporter({
  reportTitle: "Report Title",
  filename: 'my-report.html',
  dest: '/target/screenshots',
  directConnection: false,
  showConfiguration: false,

  ignoreSkippedSpecs: true,
  reportOnlyFailedSpecs: false,
  // captureOnlyFailedSpecs: true,
  showSummary: true,
  showQuickyLinks: true,
  showConfiguration: true,
  reportFailedUrl: true,

  inlineImages: true,
  userCss: 'my-report-styles.css',
});


exports.config = {
  directConnect: true,
  capabilities: { 'browserName': 'chrome' },
  framework: 'jasmine',
  specs: ['C:/Users/leich/OneDrive/desktop/testing/test/calculator.js'],
  directConnectL: true,
  jasmineNodeOpts: { defaultTimeoutInterval: 30000 },

  // Set up report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },
  // Assign the test reporter to each running instance and capture screenshot if any test failed
  onPrepare: function () {

    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './',
      filePrefix: 'xmlresults'
    }));

    jasmine.getEnv().addReporter(reporter);
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));

    // jasmine.getEnv().afterEach(function (done) {
    //   browser.takeScreenshot().then(function (png) {
    //     allure.createAttachment('Screenshot', function () {
    //       return new Buffer(png, 'base64')
    //     }, 'image/png')();
    //     done();
    //   })
    // })
  },
  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    })
  },

  onComplete: function () {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');

      testConfig = {
        reportTitle: 'Protractor Test execution Report',
        outputPath: './',
        outputFilename: 'ProtractorTestReport',
        screenshotPath: './screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from('xmlresults.xml', testConfig);
    });

  }

};
