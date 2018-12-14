import io from 'socket.io-client'
import feathers, {socketio, authentication as auth} from '@feathersjs/client'
import config from '../config'

const socket = io(config.api.host)
const client = feathers()

client.configure(socketio(socket))
client.configure(auth({storage: window.localStorage}))

window.client = client

export default client
