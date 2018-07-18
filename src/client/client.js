const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')

const socket = io(window.location.host)
const client = feathers()

client.configure(socketio(socket))

window.app = client

export default client
