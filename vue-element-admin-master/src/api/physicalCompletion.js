import request from '@/utils/request'

export const ProjectByIdQryAction = (idCard) => {
  return request({
    url: '/subscribe/' + idCard,
    method: 'get'
  })
}

export const resultAddAction = (parameter) => {
  return request({
    url: '/result',
    method: 'post',
    data: parameter
  })
}

export const resultUserQryAction = () => {
  return request({
    url: '/result',
    method: 'get'
  })
}

export const resultQryAction = (parameter) => {
  return request({
    url: '/result/' + parameter,
    method: 'get'
  })
}
