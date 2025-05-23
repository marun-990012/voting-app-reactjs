export default function (state, action) {
    switch (action.type) {
      case "LOGIN": {
        return { ...state, isLoggedIn: true, user: action.payload };
      }
      case "LOGOUT": {
        return { ...state, isLoggedIn: false, user: null };
      }
      case "VOTE": {
        return { ...state, votes: action.payload };
      }
      default: {
        throw new Error("invalid action type");
      }
    }
  }
  