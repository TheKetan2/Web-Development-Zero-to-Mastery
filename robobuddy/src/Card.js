import React from "react";

function Card({ name, email, id }) {
  return (
    <div className="bg-light-green dib br3 pa0 ma2 bw3 grow shadow-2">
      <img src={`https://robohash.org/${id}?200x200`} alt="robo_photo" />
      <div>
        {/* {`https://robohash.org/${this.props.name}?200x200`} */}
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}
export default Card;
