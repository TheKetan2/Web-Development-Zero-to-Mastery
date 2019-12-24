import React from "react";
import Card from "./Card";
// import { robots } from "./robots";
const CardList = ({ robots }) => {
  const cardComponent = robots.map((robot, i) => (
    <Card key={i} id={robot.id} name={robot.name} email={robot.email} />
  ));
  return <div>{cardComponent}</div>;
};

export default CardList;
