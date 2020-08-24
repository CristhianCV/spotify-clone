export const initialState = {
  user: null,
  playlists: [],
  current_playlist: null,
  current_track: null,
  current_audio: null,
  is_playing: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_CURRENT_PLAYLIST":
      return {
        ...state,
        current_playlist: action.current_playlist,
      };
    case "SET_CURRENT_TRACK":
      return {
        ...state,
        current_track: action.current_track,
      };
    case "SET_CURRENT_AUDIO":
      return {
        ...state,
        current_audio: action.current_audio,
      };
    case "SET_IS_PLAYING":
      return {
        ...state,
        is_playing: action.is_playing,
      };
    default:
      return state;
  }
};

export default reducer;
