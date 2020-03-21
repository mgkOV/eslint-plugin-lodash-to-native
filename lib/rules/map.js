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
    return {
      CallExpression(node) {
        if (
          isLodashMap(node) &&
          node.parent.type !== "ConditionalExpression" &&
          !isFirstArgObjExpr(node)
        ) {
          let firstArgText = context.getSourceCode().getText(node.arguments[0]);
          let secondArgText = context.getSourceCode().getText(node.arguments[1]);

          const longTemp = `Array.isArray(${firstArgText}) ? collection.map(${secondArgText}) : _.map(${firstArgText}, ${secondArgText})`;
          const shortTemp = `${firstArgText}.map(${secondArgText})`;

          context.report({
            node,
            message: "_.map можно заменить на нативный Array#map",

            fix: function(fixer) {
              let temp = isFirstArgArrayExpr(node) ? shortTemp : longTemp;

              return fixer.replaceText(node, temp);
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
