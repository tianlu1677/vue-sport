import * as types from '../types';
import {
  getTopicCommentList,
  createComment,
  getComment,
  deleteComment,
  praiseComment,
  unpraiseComment,
} from '@/api/comment_api';

const state = {
  commentList: []
};

const getters = {
  commentList(state) {
    return state.commentList
  }
};

const mutations = {
  [types.SET_COMMENT_LIST](state, comments) {
    state.commentList = comments;
  },
  [types.DELETE_COMMENT](state, comment_id) {
    state.commentList = state.commentList.splice((comment) => {
      if (comment.id !== comment_id) {
        return comment
      }
    })
  },
  [types.CREATE_COMMENT](state, comment) {
    state.commentList = [comment].concat(state.commentList)
  },
  [types.PRAISE_COMMENT](state, comment) {

  },
  [types.UNPRAISE_COMMENT](state, comment) {

  }
};

const actions = {
  async setCommentList({state, commit}, topic_id) {
    const response = await getTopicCommentList(topic_id)
    commit(types.SET_COMMENT_LIST, response.data.comments)
  },
  async deleteComment({state, commit}, comment_id) {
    const response = await deleteComment(comment_id)
    commit(types.DELETE_COMMENT, comment_id)
  },
  async createComment({state, commit}, payload = {}) {
    const response = await createComment(payload)
    commit(types.CREATE_COMMENT, response.comment)
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
};
