import api from './api';

export default {
  getAll(gameId) {
    return api({
      method: 'get',
      url: `/games/${gameId}/fruits`,
    });
  },
  buy(gameId, name) {
    return api({
      method: 'post',
      url: `/games/${gameId}/fruits/buy`,
      data: { name },
    });
  },
  sell(gameId, id) {
    return api({
      method: 'post',
      url: `/games/${gameId}/fruits/${id}/sell`,
    });
  },
  consume(gameId, id, pirateId) {
    return api({
      method: 'post',
      url: `/games/${gameId}/fruits/${id}/consume`,
      data: { pirateId },
    });
  },
};
