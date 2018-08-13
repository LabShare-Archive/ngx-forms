import * as AjvLib from 'ajv'

describe('forms schema', () => {
  const ajv = new AjvLib({allErrors: true});
  const schema = require('./form-schema.json');
  let validate;
  let formConfig;

  beforeEach(function () {
    validate = ajv.compile(schema);
    delete require.cache[require.resolve('../../../test/ui/fixtures/valid-ngx-forms-config')]; // invalidate require cache
    formConfig = require('../../../test/ui/fixtures/valid-ngx-forms-config').Config;
  });

  it('should successfully validate a valid form configuration', () => {
    expect(validate(formConfig)).toBeTruthy();
  });

  it('should fail validation if layout is not either `tabs` or `accordion`', () => {
    formConfig.layout = 'xyz';
    expect(validate(formConfig)).toBeFalsy();
  });

  it('should fail validation if section label is not a string type', () => {
    formConfig.sections[0].label = 123;
    expect(validate(formConfig)).toBeFalsy();
  });
});
