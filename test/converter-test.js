var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Converter = require('../utils/hexaDecimalConverter');

describe('Converter', function() {
  it('convert() should return 100 if the input is 64 and method equals to hexaToDec', function() {
    expect(Converter.convert("64", "hexaToDec")).to.equal("100");
  });

  it('convert() should return 1000 if the input is 3E8 and method equals to hexaToDec', function() {
    expect(Converter.convert("3E8", "hexaToDec")).to.equal("1000");
  });

  it('convert() should return null if the input is XXX and method equals to hexaToDec', function() {
    expect(Converter.convert("XXX", "hexaToDec")).to.equal(null);
  });

  it('convert() should return 64 if the input is 100 and method equals to decToHexa', function() {
    expect(Converter.convert("100", "decToHexa")).to.equal("0x64");
  });

  it('convert() should return 3E8 if the input is 1000 and method equals to decToHexa', function() {
    expect(Converter.convert("1000", "decToHexa")).to.equal("0x3e8");
  });

  it('convert() should return null if the input is XXX and method equals to decToHexa', function() {
    expect(Converter.convert("XXX", "decToHexa")).to.equal(null);
  });
});
