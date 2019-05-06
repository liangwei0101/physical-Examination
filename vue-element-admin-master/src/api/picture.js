import request from '@/utils/request'

export function getPictureAction() {
  return request({
    url: '/imgUpdate',
    method: 'get'
  })
}

export function addPicture(parameter) {
  return request({
    url: '/imgUpdate',
    method: 'post',
    data: parameter
  })
}
