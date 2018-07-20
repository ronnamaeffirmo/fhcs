import client from '../common/client'

// FIXME: kinanglan async ni?
const createItem = async (values) => {
  const items = await client.service('items').create(values)
  console.log('items', items)
  window.alert('added new item!')
}

export { createItem }
