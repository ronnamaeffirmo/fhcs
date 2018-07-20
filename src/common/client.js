import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'

import config from '../config'

const socket = io(config.api.host)
const client = feathers()

client.configure(socketio(socket))

window.client = client

export default client
