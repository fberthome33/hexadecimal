var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of 
var assert = chai.assert
var FormUtils = require('../utils/formUtils');

describe('FormUtils', function() {
  it('decimalInput() should return 16 if the input are 10 and 16 and method equals to hexaToDec', function() {
    expect(FormUtils.decimalInput("10", "16", "hexaToDec")).to.equal("16");
  });

  it('decimalInput() should return 16 if the input is 16 and method equals to decToHexa', function() {
    expect(FormUtils.decimalInput("16", "10", "decToHexa")).to.equal("16");
  });

  it('decimalInput() should throw error if the input is 16 and 10 and method equals to decToDec', () => {
    expect(() => FormUtils.decimalInput("16", "10", "decToDec")).to.throw(Error, 'Unsupported convertion method: decToDec');
  });


});
