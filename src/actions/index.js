import { 
  ADD_PRODUCT,
  ADD_PRODUCTS,
  TOGGLE_PRODUCT, 
  REMOVE_PRODUCT,
  FILL_FIELDS,
  ADD_CLIENT,
  ADD_CLIENTS,
  ADD_ORDER,
  ADD_ORDERS,
} from './actionsTypes';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
})

export const addProducts = products => ({
  type: ADD_PRODUCTS,
  products,
})

export const toggleProduct = id => ({
  type: TOGGLE_PRODUCT,
  id,
})

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id,
})

export const fillProductFields = product => ({
  type: FILL_FIELDS,
  product,
})

export const addClient = client => ({
  type: ADD_CLIENT,
  client,
})

export const addClients = clients => ({
  type: ADD_CLIENTS,
  clients,
})

export const addOrder = order => ({
  type: ADD_ORDER,
  order,
})

export const addOrders = orders => ({
  type: ADD_ORDERS,
  orders,
})
