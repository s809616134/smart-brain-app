import React from "react";

function Rank({ entries, name }) {
  return (
    <div className="center">
      <div>
        <div className="white f3">{`${name}, The times you've committed is`}</div>
        <div className="white f1 centers">{`#${entries}`}</div>
      </div>
    </div>
  );
}

export default Rank;
