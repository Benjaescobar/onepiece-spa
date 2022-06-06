import api from './api';

export default {
  create({
    email, password, firstName, lastName,
  }) {
    return api({
      method: 'post',
      url: '/users',
      data: {
        email, password, firstName, lastName,
      },
    });
  },
  get(id) {
    return api({
      method: 'get',
      url: `/users/${id}`,
    });
  },
};
