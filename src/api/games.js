import api from './api';

export default {
  get(id) {
    return api({
      method: 'get',
      url: `/games/${id}`,
    });
  },
  join(id) {
    return api({
      method: 'post',
      url: `/games/${id}/join`,
    });
  },
  create() {
    return api({
      method: 'post',
      url: '/games',
    });
  },
  start(id) {
    return api({
      method: 'post',
      url: `/games/${id}/start`,
    });
  },
  getPlayers(id) {
    return api({
      method: 'get',
      url: `/games/${id}/players`,
    });
  },
  rollDice(id) {
    return api({
      method: 'post',
      url: `/games/${id}/roll_dice`,
    });
  },
  endTurn(id) {
    return api({
      method: 'post',
      url: `/games/${id}/end_turn`,
    });
  },
  getState(id) {
    return api({
      method: 'get',
      url: `/games/${id}/state`,
    });
  },
  getLogs(id) {
    return api({
      method: 'get',
      url: `/games/${id}/logs`,
    });
  },
  me(id) {
    return api({
      method: 'get',
      url: `/games/${id}/players/me`,
    });
  },
};
