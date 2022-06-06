import api from './api';

export default {
  create(email, password) {
    return api({
      method: 'post',
      url: '/sessions',
      data: { email, password },
    });
  },
};
