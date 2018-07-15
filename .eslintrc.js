module.exports = {
  'extends': 'standard',
  'globals': {
    'it': 0,
    'expect': 0,
    'describe': 0,
    'after': 0,
    'before': 0
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ]
  }
}
