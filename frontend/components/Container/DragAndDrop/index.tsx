import { useState } from "react";

export const DragAndDrop = () => {
  const [dragItem, setDragItem] = useState(0);
  const [list, setList] = useState([
    "The Call Of Ktulu",
    "For Whom The Bell Tolls",
    "The Day That Never Comes",
    "The Memory Remains",
    "Confusion",
    "Moth Into Flame",
    "The Outlaw Torn",
    "No Leaf Clover",
    "Halo on Fire",
  ]);

  const handleDragStart = (index) => {
    setDragItem(index);
  };

  const handleDragEnter = (e, index) => {
    e.target.style.backgroundColor = "#336699";
    const newList = [...list];
    const item = newList[dragItem];
    newList.splice(dragItem, 1);
    newList.splice(index, 0, item);
    setDragItem(index);
    setList(newList);
  };

  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = "black";
  };

  const handleDrop = (e) => {
    e.target.style.backgroundColor = "black";
  };

  return (
    <ul className="dnd">
      {list &&
        list.map((item, index) => (
          <li
            draggable
            key={index}
            onDragStart={() => handleDragStart(index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => e.preventDefault()}
          >
            {item}
          </li>
        ))}
    </ul>
  );
};
