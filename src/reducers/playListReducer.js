export const playListReducer = (state = {}, action) => {
    switch (action.type) {
    case "FETCH_PLAYLIST":
      return {
        ...state,
    
        lists: {
          ...state.lists,
          [action.id]: {
            id: action.id,
            name: action.name,
            images: action.images,
            tracks: action.tracks
          }
        }
      };
  
  
    default:
      return state;
    }
  };

  export default playListReducer;
  