import request from './request'

// // 获取心得列表
// export async function getTopicList(course_id) {
//   const res = await request({
//     url: `/api/v1/courses/${course_id}/topics`,
//     method: 'GET'
//   })
//   return res.data
// }

// 上传文件
export async function uploadAsset(file) {
  const res = await request({
    url: '/api/v1/assets',
    method: 'POST',
    data: {
      data: file
    }
  })
  return res.data
}

// 获取心得详情
export async function getTopic(id) {
  const res = await request({
    url: `/api/v1/topics/${id}`,
    method: 'GET'
  })

  return res.data
}

// 点赞，收藏, 分享, 查看
// action_type(praise, star, share, view)
export async function createTopicAction(id, type) {
  const res = await request({
    url: `/api/v1/topics/${id}/create_actions`,
    method: 'POST',
    data: {
      type: type
    }
  })
  return res.data
}

// 取消点赞,收藏
export async function destroyTopicAction(id, type) {
  const res = await request({
    url: `/api/v1/topics/${id}/destroy_actions`,
    method: 'POST',
    data: {
      type: type
    }
  })
  return res.data
}


// 创建心得
export async function createTopic(data = {}) {
  const res = await  request({
    url: `/api/v1/topics`,
    method: 'POST',
    data: data
  })
  return res.data
}

// 修改心得
export async function updateTopic(id, data = {}) {
  const res = await  request({
    url: `/api/v1/topics/${id}`,
    method: 'PUT',
    data: data
  })
  return res.data
}

// 删除心得
export async function deleteTopic(id) {
  const res = await  request({
    url: `/api/v1/topics/${id}`,
    method: 'DELETE'
  })
  return res.data
}

