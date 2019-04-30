import request from '@/utils/request'

export const ProjectByIdQryAction = (idCard) => {
  return request({
    url: '/subscribe/' + idCard,
    method: 'get'
  })
}
