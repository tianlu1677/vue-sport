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
    state.commentList = comments
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
  [types.PRAISE_COMMENT](state, new_comment) {
    state.commentList = state.commentList.map((comment) => {
      if (new_comment.id === comment.id) {
        return new_comment
      } else {
        return comment
      }
    })
  },
  [types.UNPRAISE_COMMENT](state, new_comment) {
    state.commentList = state.commentList.map((comment) => {
      if (new_comment.id === comment.id) {
        return new_comment
      } else {
        return comment
      }
    })
  }
};

const actions = {
  async setCommentList({state, commit}, topic_id, params = {}) {
    const response = await getTopicCommentList(topic_id, params = {})
    commit(types.SET_COMMENT_LIST, response.data.comments)
  },
  async deleteComment({state, rootState, commit}, comment_id) {
    const response = await deleteComment(comment_id)
    commit(types.DELETE_COMMENT, comment_id)
    commit(types.SET_TOPIC_DETAIL, {comments_count: rootState.topicDetail.comments_count - 1})
  },

  async createComment({state, rootState, commit}, payload = {}) {
    const response = await createComment(payload)
    commit(types.CREATE_COMMENT, response.comment)
    commit(types.SET_TOPIC_DETAIL, {comments_count: rootState.topicDetail.comments_count + 1})
  },
  async praiseComment({state, commit}, comment_id) {
    const response = await praiseComment(comment_id)
    commit(types.PRAISE_COMMENT, response.comment)
  },
  async unpraiseComment({state, commit}, comment_id) {
    const response = await unpraiseComment(comment_id)
    commit(types.UNPRAISE_COMMENT, response.comment)
  },

};

export default {
  state,
  actions,
  getters,
  mutations,
};
