module.exports = {
  "extends": "airbnb-base",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
  },
  // "parser": "esprima",
  "parser": "babel-eslint",
  "rules": {
    "no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"],
    "linebreak-style":0,
    "indent": ["error", 4],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
  }],
  "max-len": ["error", { "code": 180 }],
  "rest-spread-spacing": ["error", "never"],
  "camelcase": [0, {"properties": "never"}],  
  }
 
};