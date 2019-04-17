import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export const UserQryAction = () => {
  return request({
    url: '/user',
    method: 'get'
  })
}

export const UserAddAction = (parameter) => {
  return request({
    url: '/user',
    method: 'post',
    params: parameter
  })
}

export const UserUpdateAction = (parameter) => {
  return request({
    url: '/user',
    method: 'put',
    params: parameter
  })
}

export const UserDelAction = (parameter) => {
  return request({
    url: '/user',
    method: 'delete',
    params: {
      idCard: parameter
    }
  })
}
