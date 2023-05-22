import * as S from "./style";
import MusicCard from "@/components/Player/MusicCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CustomIconButton from "@/components/common/CustomIconButton";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { playListState } from "@/store/modules/playList";
import { setPlayList, deleteTrack } from "@/store/modules/playList";

interface AppState {
  playList: playListState;
}

const DragAndDrop = ({ list, setList, nowPlayList }) => {
  console.log("in", list);
  const dispatch = useDispatch();
  const { data } = nowPlayList;
  const tempList = { ...nowPlayList };

  const { currentTrackIndex } = useSelector(
    (state: AppState) => state.playList
  );

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
    tempList.musicList = items;
    dispatch(setPlayList(tempList));
  };

  const handleDelete = (index) => {
    const newList = list.filter((_, idx) => idx !== index);
    tempList.musicList = newList;
    dispatch(deleteTrack(tempList));
    setList(newList);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* <S.DragDropWrap> */}
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
                      active={index === currentTrackIndex}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <S.DeleteBtn>
                        <CustomIconButton
                          size="2rem"
                          handleOnClickButton={() => handleDelete(index)}
                        >
                          <FaTimes color="#F68888" size={20} />
                        </CustomIconButton>
                      </S.DeleteBtn>
                      <MusicCard
                        data={{
                          code,
                          name,
                          albumImage,
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
      {/* </S.DragDropWrap> */}
    </DragDropContext>
  );
};

export default DragAndDrop;
