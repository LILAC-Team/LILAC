import * as S from "./style";
import MusicCard from "@/components/Player/MusicCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CLOUD_FRONT } from "@/api/index";

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
            {list.map(
              ({ code, name, albumImage, artistName, playtime }, index) => (
                <Draggable
                  key={index + ""}
                  draggableId={index + ""}
                  index={index}
                >
                  {(provided) => (
                    <S.OneMusicCard
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <MusicCard
                        data={{
                          code,
                          name,
                          albumImage: CLOUD_FRONT + albumImage,
                          artistName,
                          playtime,
                        }}
                        isEditable={true}
                      />
                    </S.OneMusicCard>
                  )}
                </Draggable>
              )
            )}
            {provided.placeholder}
          </S.DragDropWrap>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
