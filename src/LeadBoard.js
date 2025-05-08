import { useContext } from "react";
import { AuthContex } from "./Auth";

function LeadBoard() {
  const { votes, items } = useContext(AuthContex);
  const sortVotes = votes.sort((a = a.votes, b = b.votes) => {
    return b.votes - a.votes;
  });
  return (
    <div className="lead-board">
      <h4>Players LeadBoard</h4>
      <ul>
        {sortVotes.map((item) => {
          return (
            <li key={item.itemId}>
              <div className="palayer-card">
                <div className="image-name">
                  <img src={item.image} alt="" className="leadboard-imgage" />
                  <p>{item.name}</p>
                </div>

                <div className="palayes-vote">
                  <p>{item.votes}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default LeadBoard;
