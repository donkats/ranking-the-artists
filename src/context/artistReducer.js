import { CREATE_ARTIST, UPDATE_ARTIST, INCREMENT_RATING, DECREMENT_RATING } from './types';
import initialState from './initialState';

const artistReducer = (state, action) => {
  const { type } = action;
  const nextId = state.idCounter + 1;
  const createdArtist = {
    id: nextId,
    artistName: action.artistName,
    artistPhoto: '',
    artistStars: 0,
  };

  const indexStars = state.artist.findIndex((artist) => artist.id === action.id);
  const currentStars = [...state.artist];

  const editedArtist = {
    id: action.id,
    artistName: action.artistName,
    artistPhoto: action.artistPhoto,
    artistStars: action.artistStars,
  };
  const index = state.artist.findIndex((artist) => artist.id === action.id);
  switch (type) {
    case CREATE_ARTIST:
      return {
        idCounter: nextId,
        artist: [...state.artist, createdArtist],
      };
    case UPDATE_ARTIST:
      return {
        ...state,
        artist: [...state.artist.slice(0, index), editedArtist, ...state.artist.slice(index + 1)],
      };
    case INCREMENT_RATING:
      return {
        ...state,
        artist: [
          ...state.artist.slice(0, indexStars),
          { ...currentStars[indexStars], artistStars: currentStars[indexStars].artistStars + 1 },
          ...state.artist.slice(indexStars + 1),
        ],
      };
    case DECREMENT_RATING:
      return {
        ...state,
        artist: [
          ...state.artist.slice(0, indexStars),
          { ...currentStars[indexStars], artistStars: currentStars[indexStars].artistStars - 1 },
          ...state.artist.slice(indexStars + 1),
        ],
      };
    default:
      return initialState;
  }
};

export default artistReducer;