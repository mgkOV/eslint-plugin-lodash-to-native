/**
 * @fileoverview Правило
 * @author mgkOV
 */

"use strict";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Правило предлагает заменить _.map на использование нативного Array#map"
    },
    fixable: "code"
  },
  create: function(context) {
    return {
      // callback functions
    };
  }
};
