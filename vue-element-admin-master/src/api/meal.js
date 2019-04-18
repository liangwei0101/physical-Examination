import request from '@/utils/request'

export function getMeal() {
  return request({
    url: '/meal',
    method: 'get'
  })
}

export function addMeal(parameter) {
  return request({
    url: '/meal',
    method: 'post',
    params: parameter
  })
}

export function updateMeal(parameter) {
  return request({
    url: '/meal',
    method: 'put',
    params: parameter
  })
}

export function deleteMeal(params) {
  return request({
    url: '/meal',
    method: 'delete',
    parameter: params
  })
}
