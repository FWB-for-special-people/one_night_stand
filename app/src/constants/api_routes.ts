const BASE_URL = '/api/v1';

export const API = {
  cards: `${BASE_URL}/cards/`,
  cardComments: (cardId: number) => `${BASE_URL}/cards/${cardId}/comments`,
  likeCard: (cardId: number) => `${BASE_URL}/cards/${cardId}/like`,
  viewCard: (cardId: number) => `${BASE_URL}/cards/${cardId}/view`,
  login: `${BASE_URL}/token/`,
  loginDemo: `${BASE_URL}/token/demo`,
}