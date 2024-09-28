const BASE_URL = '/api/v1';

export const API = {
  cards: `${BASE_URL}/cards`,
  cards_comments: `${BASE_URL}/cards/{card_id}/comments`,
  cards_like: `${BASE_URL}/cards/{card_id}/like`,
  cards_view: `${BASE_URL}/cards/{card_id}/view`,
}