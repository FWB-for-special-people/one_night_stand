export const API = {
  cards: "/cards/",
  cardLike: (cardId: number) => `/cards/${cardId}/like/`,
  cardView: (cardId: number) => `/cards/${cardId}/view/`,
  cardComments: (cardId: number) => `/cards/${cardId}/comments`,
  cardTags: "/cards/tags",

  channels: "/channels/",
  channelsFollow: (channelId: number) => `/channels/${channelId}/follow`,
  channelsUnfollow: (channelId: number) => `/channels/${channelId}/unfollow`,
  channelsFollowed: "/channels/followed/",

  user: "/users/",
  userDetail: (userId: number) => `/users/${userId}/`,
  userPreferences: "/users/preferences/",
  userFollow: (userId: number) => `/users/${userId}/follow/`,
  userUnfollow: (userId: number) => `/users/${userId}/unfollow/`,
  userFollowers: (userId: number) => `/users/${userId}/followers/`,
  userFollowing: (userId: number) => `/users/${userId}/following/`,
}

const BASE_URL = '/api/v1';

export const PrefixedAPI = {
  cards: `${BASE_URL}/cards/`,
  login: `${BASE_URL}/token/`,
  loginDemo: `${BASE_URL}/token/demo`,
 cardContent: `${BASE_URL}/cards/content/`,
}