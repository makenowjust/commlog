import { createHashHistory } from 'history'

export default createHashHistory({
  queryKey: false // to be disable appending `?_k=xxx` into URL
})
