import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

export default useRouterHistory(createHashHistory)({
  queryKey: false // to be disable appending `?_k=xxx` into URL
})
