import request from '@/utils/request'


export const ChargeQryAction = () => {
  return request({
    url: '/charge',
    method: 'get'
  })
}

export const ChargeAddAction = (parameter) => {
  return request({
    url: '/charge',
    method: 'post',
    params: parameter
  })
}

export const ChargeUpdateAction = (parameter) => {
  return request({
    url: '/charge',
    method: 'put',
    params: parameter
  })
}

export const ChargeDelAction = (parameter) => {
  return request({
    url: '/charge',
    method: 'delete',
    params: {
      id: parameter
    }
  })
}
