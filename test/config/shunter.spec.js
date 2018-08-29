const expect = require('chai').expect;
const shunterConfig = require('../../config/shunter');
const winstonSilencer = require('../../middlewares').winstonSilencer;

describe('shunter config', () => {
  it('sets logger_library to null if log_to_json is not a true string', () => {
    let object = shunterConfig('some_dir', 'moduleName', 'false', 'loggerLibrary');

    expect(object.path.themes).to.eq('some_dir');
    expect(object.log).to.eq(null);
  })

  it('sets logger_library if log_to_json is a true string', () => {
    let object = shunterConfig('some_dir', 'moduleName', 'true', 'loggerLibrary');

    expect(object.path.themes).to.eq('some_dir');
    expect(object.log).to.eq('loggerLibrary');
  })

  it('when loggerLibrary is not provided', () => {
    let object = shunterConfig('some_dir', 'moduleName', 'true');

    expect(object.path.themes).to.eq('some_dir');
    expect(object.log).to.eq(winstonSilencer);
  })

  it('errorPages', () => {
    let object = shunterConfig('some_dir', 'moduleName', 'true');

    let expectation = {
      errorLayouts: {
        default: 'layout',
        404: 'layout-error-404',
        500: 'layout-error-500',
        502: 'layout-error-502'
      }
    }

    expect(object.errorPages).to.deep.equal(expectation);
  })
})
