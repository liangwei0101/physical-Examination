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
    url: '/meal/update',
    method: 'post',
    params: parameter
  })
}

export function detailMeal(parameter) {
  return request({
    url: '/meal/detail',
    method: 'post',
    params: parameter
  })
}

export function listMeal() {
  return request({
    url: '/meal/list',
    method: 'get'
  })
}

export function addMealProject(parameter) {
  return request({
    url: '/mealProject',
    method: 'post',
    params: parameter
  })
}
