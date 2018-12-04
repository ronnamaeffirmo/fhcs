// const { authenticate } = require('@feathersjs/authentication').hooks

// const validateReturnQuantity = (hook) => {
  // const prop = hook.type === 'before' ? 'data' : 'result';
  // const dataHook = hook;
//   if (hook.type == 'before') {
//     const { data } = hook
//     console.log(data)
//     //do something
//   }
//   else {
//     Promise.reject(new Error('before hook only.'))
//   }
// }

module.exports = {
  before: {
    // all: [ authenticate('jwt') ], //
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
