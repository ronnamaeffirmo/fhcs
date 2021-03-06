// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const users = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    picture: { type: String }, // base64 string
    role: { type: Schema.Types.ObjectId, ref: 'roles', required: true }
  }, {
    timestamps: true,
    versionKey: false
  })

  return mongooseClient.model('users', users)
}
