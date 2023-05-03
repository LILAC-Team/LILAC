import * as S from "./style";
import MusicCard from "@/components/Player/MusicCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
            {list.map(({ code, name, albumImage, artistName }, index) => (
              <Draggable key={code} draggableId={code} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <MusicCard
                      data={{ code, name, albumImage, artistName }}
                      isEditable={true}
                    />
                  </div>
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

export default DragAndDrop;
