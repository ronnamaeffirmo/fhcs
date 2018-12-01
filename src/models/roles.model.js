// roles-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const roles = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    permissions: [{type: String}]
  }, {
    timestamps: true,
    versionKey: false
  })

  return mongooseClient.model('roles', roles)
}
