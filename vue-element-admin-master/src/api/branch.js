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
    params: parameter
  })
}

export function updateBranch(parameter) {
  return request({
    url: '/branch',
    method: 'put',
    params: parameter
  })
}

export function deleteBranch(params) {
  return request({
    url: '/branch',
    method: 'delete',
    parameter: params
  })
}
