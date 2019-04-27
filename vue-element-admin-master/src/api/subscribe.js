import request from '@/utils/request'

export const subscribeQryAction = () => {
  return request({
    url: '/subscribe',
    method: 'get'
  })
}

export const subscribeAddAction = (parameter) => {
  return request({
    url: '/subscribe',
    method: 'post',
    data: parameter
  })
}

