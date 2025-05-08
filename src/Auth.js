import { createContext, useReducer, useEffect, useState } from "react";
import reducer from "./reducer";
import { useNavigate } from "react-router-dom";
import users from "../user-data.json";

// AuthContex
export const AuthContex = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

const items = [
  {
    itemId: 1,
    name: "Virat Kohli",
    user: [],
    votes: 0,
    image:
      "https://nationaltoday.com/wp-content/uploads/2022/09/Virat-Kohli.jpg",
  },
  {
    itemId: 2,
    name: "MS Dhoni",
    user: [],
    votes: 0,
    image: "https://wallpapercave.com/wp/wp8937811.jpg",
  },
  {
    itemId: 3,
    name: "Rohit Sharma",
    user: [],
    votes: 0,
    image:
      "https://tse4.mm.bing.net/th?id=OIP.hm5NUHlIOOjRr7BRNFLZCQHaHe&pid=Api&P=0&h=180",
  },
  {
    itemId: 4,
    name: "Hardik Pandya",
    user: [],
    votes: 0,
    image:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_800,q_50/lsci/db/PICTURES/CMS/349500/349572.jpg",
  },
  {
    itemId: 5,
    name: "Mohammed Shami",
    user: [],
    votes: 0,
    image:
      "https://www.hindustantimes.com/static-content/1y/cricket-logos/players/mohammed-shami.png",
  },
  {
    itemId: 6,
    name: "Bumrah",
    user: [],
    votes: 0,
    image:
      "https://cricclubs.com/documentsRep/profilePics/ceb795e5-afde-4216-b476-bb51fd433a4b.png",
  },
  {
    itemId: 7,
    name: "Yuzvendra Chahal",
    user: [],
    votes: 0,
    image: "https://img.wegreenkw.com/sites/4/2023/03/Yuzvendra-Chahal.webp",
  },
  {
    itemId: 8,
    name: "KL Rahul",
    user: [],
    votes: 0,
    image: "https://www.cricgram.com/wp-content/uploads/2019/08/KL-Rahul.jpg",
  },
];

// console.log(items);
//AuthProvider
export function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [votes, setVotes] = useState([]);
  const [success, setSuccess] = useState(false);
  console.log(success);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 9000);
  }, [success]);
  // console.log(votes);
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      const user = users.find((user) => {
        return user.id == id;
      });

      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  useEffect(() => {
    const allVotes = JSON.parse(localStorage.getItem("votes")) || items;
    setVotes(allVotes);
    // console.log(allVotes);
  }, []);

  function handleLogin(user) {
    // console.log(user);
    dispatch({ type: "LOGIN", payload: user });
    localStorage.setItem("id", user.id);
    navigate("/dashboard");
  }
  // console.log(state);

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("id");
    navigate("/login");
  }

  function handleVote(itemId, userId, votes) {
    // const voteChecking = [];
    // votes.forEach((item) => {
    //   voteChecking.push(...item.user);
    // });

    const voteChecking = votes.find((ele) => {
      return ele.user.includes(userId);
    });
    // console.log(voteChecking);

    // if (voteChecking) {
    //   alert("you cannot vote again");
    // } else {

    // }

    let alreadyVoted = false;
    const result = votes.map((ele) => {
      if (ele.itemId == itemId) {
        if (voteChecking) {
          alreadyVoted = true;
          return ele;
        } else {
          return {
            ...ele,
            votes: ele.votes + 1,
            user: [...ele.user, userId],
          };
        }
      } else {
        return ele;
      }
    });

    if (alreadyVoted) {
      alert("already voted");
    } else {
      // return result;
      localStorage.setItem("votes", JSON.stringify(result));
      setVotes(result);
      setSuccess(true);
    }
  }

  return (
    <AuthContex.Provider
      value={{
        ...state,
        dispatch,
        handleLogin,
        handleLogout,
        handleVote,
        items,
        votes,
        success,
      }}
    >
      {props.children}
    </AuthContex.Provider>
  );
}
