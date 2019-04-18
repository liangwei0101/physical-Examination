import request from '@/utils/request'


export const ProjectQryAction = () => {
  return request({
    url: '/project',
    method: 'get'
  })
}

export const ProjectAddAction = (parameter) => {
  return request({
    url: '/project',
    method: 'post',
    params: parameter
  })
}

export const ProjectUpdateAction = (parameter) => {
  return request({
    url: '/project',
    method: 'put',
    params: parameter
  })
}

export const ProjectDelAction = (parameter) => {
  return request({
    url: '/project',
    method: 'delete',
    params: {
      id: parameter
    }
  })
}
