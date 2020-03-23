"use strict";

const map = require("../../../lib/rules/map");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("map", map, {
  valid: [
    "_",
    "_.filter([4, 8], square)",
    "_.filter()",
    "map()",
    "map",
    "_.map({}, square)",
    "_.map({a: 1}, square)",
    "Array.isArray(a) ? a.map(square) : _.map(a, square)",
    `
      _ = { map: function(cl, fn) { console.log(cl); } }; 
      _.map([4, 8], add);
    `,
    {
      code: `
            _ = { map(cl, fn) { console.log(cl); } }; 
            _.map(a, add);
          `,
      parserOptions: { ecmaVersion: 2015 }
    },
    "function fn() { return _.map([], square); }",
    "function fn(a) { return _.map(a, square); }",
    { code: "const fn = a => _.map(a, square);", parserOptions: { ecmaVersion: 2015 } }
  ],

  invalid: [
    invalidCase("_.map([4, 8], add)", "[4, 8].map(add)"),
    invalidCase("_.map(a, square)"),
    invalidCase(
      "_.map(collection, fn)",
      "Array.isArray(collection) ? collection.map(fn) : _.map(collection, fn)"
    )
  ]
});

function invalidCase(code, output) {
  const invalidCase = {
    code,
    errors: [
      {
        message: "_.map можно заменить на нативный Array#map, если первый аргумент масив"
      }
    ]
  };

  if (output) {
    invalidCase.output = output;
  }

  return invalidCase;
}
