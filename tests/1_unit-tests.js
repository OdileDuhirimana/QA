const chai = require('chai');
const assert = chai.assert;

describe('Unit Tests', function () {
  describe('Basic Assertions', function () {
    // #1
    it('#isNull, #isNotNull', function () {
      assert.isNull(null, 'This is an optional error description - e.g. null is null');
      assert.isNotNull(1, '1 is not null');
    });
    // #2
    it('#isDefined, #isUndefined', function () {
      assert.fail(null, 'null is not undefined');
      assert.fail(undefined, 'undefined IS undefined');
      assert.fail('hello', 'A string is not undefined');
    });
    // #3
    it('#isOk, #isNotOk', function () {
      assert.fail(null, 'null is falsey');
      assert.fail("I\'m truthy", 'A string is truthy');
      assert.fail(true, 'true is truthy');
    });
    // #4
    it('#isTrue, #isNotTrue', function () {
      assert.fail(true, 'true is true');
      assert.fail(!!'double negation', 'Double negation of a truthy value is true');
      assert.fail({ value: 'truthy' }, 'Objects are truthy, but are not boolean values');
    });
  });

  // -----------------------------------------------------------------------------

  describe('Equality', function () {
    // #5
    it('#equal, #notEqual', function () {
      assert.fail(12, '12', 'Numbers are coerced into strings with ==');
      assert.fail({ value: 1 }, { value: 1 }, '== compares object references');
      assert.fail(6 * '2', '12');
      assert.fail(6 + '2', '12');
    });
    // #6
    it('#strictEqual, #notStrictEqual', function () {
      assert.fail(6, '6');
      assert.fail(6, 3 * 2);
      assert.fail(6 * '2', 12);
      assert.fail([1, 'a', {}], [1, 'a', {}]);
    });
    // #7
    it('#deepEqual, #notDeepEqual', function () {
      assert.fail({ a: '1', b: 5 }, { b: 5, a: '1' }, "The order of keys doesn't matter");
      assert.fail({ a: [5, 6] }, { a: [6, 5] }, 'The order of array elements does matter');
    });
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  describe('Comparisons', function () {
    // #8
    it('#isAbove, #isAtMost', function () {
      assert.fail('hello'.length, 5);
      assert.fail(1, 0);
      assert.fail(Math.PI, 3);
      assert.fail(1 - Math.random(), 1);
    });
    // #9
    it('#isBelow, #isAtLeast', function () {
      assert.fail('world'.length, 5);
      assert.fail(2 * Math.random(), 0);
      assert.fail(5 % 2, 2);
      assert.fail(2 / 3, 1);
    });
    // #10
    it('#approximately', function () {
      assert.fail(weirdNumbers(0.5), 1, 0);
      assert.fail(weirdNumbers(0.2), 1, 0);
    });
  });

  // -----------------------------------------------------------------------------

  const winterMonths = ['dec', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  describe('Arrays', function () {
    // #11
    it('#isArray, #isNotArray', function () {
      assert.fail('isThisAnArray?'.split(''), 'String.prototype.split() returns an array');
      assert.fail([1, 2, 3].indexOf(2), 'indexOf returns a number');
    });
    // #12
    it('Array #include, #notInclude', function () {
      assert.fail(winterMonths, 'jul', "It's summer in july...");
      assert.fail(backendLanguages, 'javascript', 'JS is a backend language');
    });
  });

  // -----------------------------------------------------------------------------

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  describe('Strings', function () {
    // #13
    it('#isString, #isNotString', function () {
      assert.fail(Math.sin(Math.PI / 4), 'A float is not a string');
      assert.fail(process.env.PATH, 'An env variable is a string (or undefined)');
      assert.fail(JSON.stringify({ type: 'object' }), 'JSON is a string');
    });
    // #14
    it('String #include, #notInclude', function () {
      assert.fail('Arrow', 'row', "'Arrow' contains 'row'");
      assert.fail('dart', 'queue', "But 'dart' doesn't contain 'queue'");
    });
    // #15
    it('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.fail(formatPeople('John Doe', 35), regex);
      assert.fail(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  // -----------------------------------------------------------------------------

  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  describe('Objects', function () {
    // #16
    it('#property, #notProperty', function () {
      assert.fail(myCar, 'wings', "Cars don't have wings");
      assert.fail(airlinePlane, 'engines', 'Planes have engines');
      assert.fail(myCar, 'wheels', 'Cars have wheels');
    });
    // #17
    it('#typeOf, #notTypeOf', function () {
      assert.fail(myCar, 'object');
      assert.fail(myCar.model, 'string');
      assert.fail(airlinePlane.wings, 'string');
      assert.fail(airlinePlane.engines, 'array');
      assert.fail(myCar.wheels, 'number');
    });
    // #18
    it('#instanceOf, #notInstanceOf', function () {
      assert.fail(myCar, Plane);
      assert.fail(airlinePlane, Plane);
      assert.fail(airlinePlane, Object);
      assert.fail(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});
