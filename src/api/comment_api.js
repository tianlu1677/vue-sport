import request from './request'

// 获取心得的评论列表
export async function getTopicCommentList(topic_id, params = {}) {
  const res = await request({
    url: `/api/v1/topics/${topic_id}/comments`,
    method: 'GET',
    params: params
  });

  return res
}

// 创建评论
export async function createComment(data = {}) {
  const res = await request({
    url: `/api/v1/comments`,
    method: 'POST',
    data: data
  })

  return res.data
}

// 获取单个评论详情

export async function getComment(comment_id) {
  const res = await request({
    url: `/api/v1/comments/${comment_id}`,
    method: 'GET'
  })

  return res.data
}

// 删除评论
export async function deleteComment(comment_id) {
  const res = await request({
    url: `/api/v1/comments/${comment_id}`,
    method: 'DELETE'
  })

  return res.data
}

// 点赞
export async function praiseComment(comment_id) {
  const res = await request({
    url: `/api/v1/comments/${comment_id}/praise`,
    method: 'POST'
  })

  return res.data
}

// 取消点赞
export async function unpraiseComment(comment_id) {
  const res = await request({
    url: `/api/v1/comments/${comment_id}/unpraise`,
    method: 'POST'
  })

  return res.data
}

