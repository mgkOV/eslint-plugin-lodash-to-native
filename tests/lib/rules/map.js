"use strict";

const map = require("../../../lib/rules/map");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("map", map, {
  valid: [
    "_.filter([4, 8], square)",
    "_.filter()",
    "map()",
    "map",
    "_.map({}, square)",
    "_.map({a: 1}, square)",
    "Array.isArray(a) ? a.map(square) : _.map(a, square)"
  ],

  invalid: [
    invalidCase("_.map([4, 8], square)"),
    invalidCase("_.map(a, square)"),
    invalidCase("_.map(a, square)")
  ]
});

function invalidCase(code) {
  return {
    code,
    errors: [
      {
        message: "_.map можно заменить на нативный Array#map, если первый аргумент масив"
      }
    ]
  };
}
