import { useState } from "react";
import { useContext } from "react";
import { AuthContex } from "./Auth";

function ListItem() {
  const { user, handleVote, items, votes } = useContext(AuthContex);
  const [itemId, setItemId] = useState(null);

  const handlesubmit = () => {
    if (itemId === null) {
      alert("Please select a player before voting!");
    } else {
      handleVote(itemId, user.id, votes);
      setItemId(null);
    }
  };
  // console.log(user);
  return (
    <div className="list-item">
      <div className="heading">
        <img
          src="https://www.worldatlas.com/upload/4e/94/92/shutterstock-133239521.jpg"
          alt=""
        />
        <h4>Select Your Favorite Player and Vote</h4>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={item.itemId}>
            <div className="select-container">
              <img
                src={item.image}
                alt=""
                onClick={() => {
                  setItemId(item.itemId);
                  // setSelected(index);
                }}
                className={
                  itemId == item.itemId
                    ? "player-image selected-image"
                    : "player-image"
                }
              />
              <p>{item.name}</p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handlesubmit} className="vote-button">
        Vote
      </button>
    </div>
  );
}
export default ListItem;
