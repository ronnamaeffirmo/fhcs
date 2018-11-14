import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'

import config from '../config'

const socket = io(config.api.host)
const client = feathers()

client
  .configure(socketio(socket))
  .configure(auth({storage: window.localStorage}))

window.client = client

export default client
