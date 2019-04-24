import request from '@/utils/request'

export function getBranch() {
  return request({
    url: '/branch',
    method: 'get'
  })
}

export function addBranch(parameter) {
  return request({
    url: '/branch',
    method: 'post',
    data: parameter
  })
}

export function updateBranch(parameter) {
  return request({
    url: '/branch',
    method: 'put',
    data: parameter
  })
}

export function deleteBranch(params) {
  return request({
    url: '/branch',
    method: 'delete',
    data: params
  })
}
