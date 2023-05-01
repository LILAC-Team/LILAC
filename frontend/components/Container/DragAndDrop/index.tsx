import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as S from "./style";
const DragAndDrop = ({ list, setList }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <S.DragDropWrap {...provided.droppableProps} ref={provided.innerRef}>
            {list.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </S.DragDropWrap>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const DragAndDropWithClientOnly = ({ list, setList }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <DragAndDrop list={list} setList={setList} />
  ) : (
    <S.DragDropWrap>
      {list.map(({ id, content }) => (
        <li key={id}>{content}</li>
      ))}
    </S.DragDropWrap>
  );
};

export default DragAndDropWithClientOnly;
