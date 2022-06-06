import api from './api';

export default {
  getAll(gameId) {
    return api({
      method: 'get',
      url: `/games/${gameId}/consumables`,
    });
  },
  buy(gameId, name) {
    return api({
      method: 'post',
      url: `/games/${gameId}/consumables/buy`,
      data: { name },
    });
  },
  sell(gameId, id) {
    return api({
      method: 'post',
      url: `/games/${gameId}/consumables/${id}/sell`,
    });
  },
  consume(gameId, id) {
    return api({
      method: 'post',
      url: `/games/${gameId}/consumables/${id}/consume`,
    });
  },
};
