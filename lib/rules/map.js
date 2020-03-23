/**
 * @fileoverview Правило map
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
    let reassigned = false;
    return {
      Identifier(node) {
        if (node.name !== "_") return;
        if (reassigned) return;

        if (node.parent.type === "AssignmentExpression") reassigned = true;

        const callExpression = node.parent.parent;

        if (
          isLodashMap(callExpression) &&
          callExpression.parent.type !== "ConditionalExpression" &&
          !isFirstArgObjExpr(callExpression)
        ) {
          let firstArgText = context.getSourceCode().getText(callExpression.arguments[0]);
          let secondArgText = context.getSourceCode().getText(callExpression.arguments[1]);

          const longTemp = `Array.isArray(${firstArgText}) ? collection.map(${secondArgText}) : _.map(${firstArgText}, ${secondArgText})`;
          const shortTemp = `${firstArgText}.map(${secondArgText})`;

          context.report({
            node,
            message: "_.map можно заменить на нативный Array#map, если первый аргумент масив",

            fix: function(fixer) {
              let temp = isFirstArgArrayExpr(callExpression) ? shortTemp : longTemp;

              return fixer.replaceText(callExpression, temp);
            }
          });
        }

        function isFirstArgArrayExpr(node) {
          let firstArg = node.arguments && node.arguments[0];

          if (firstArg.type === "ArrayExpression") {
            return true;
          }
        }

        function isFirstArgObjExpr(node) {
          let firstArg = node.arguments && node.arguments[0];

          if (firstArg.type === "ObjectExpression") {
            return true;
          }
        }

        function isLodashMap(node) {
          return (
            node.callee &&
            node.callee.object &&
            node.callee.object.name === "_" &&
            node.callee.property &&
            node.callee.property.name === "map"
          );
        }
      }
    };
  }
};
