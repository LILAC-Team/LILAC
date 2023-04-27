import MyAlbumBox from "../../components/Container/MyAlbumBox";
import { useTabs } from "@/hooks/useTabs";
import * as S from "./style";
const allTab = [
  {
    idx: 0,
    name: "나의 앨범",
    component: <MyAlbumBox text="하하" />,
  },
  {
    idx: 1,
    name: "내가 소장한 앨범",
    component: <MyAlbumBox text="호호" />,
  },
];

const AlbumPage = () => {
  const { currentItem, changeItem } = useTabs(0, allTab);
  return (
    <div>
      <S.TabWrapper>
        <S.Tabs>
          {allTab.map(({ idx, name }) => (
            <S.TabItem
              isCurrent={currentItem.idx === idx}
              key={idx}
              onClick={() => changeItem(idx)}
            >
              {name}
            </S.TabItem>
          ))}
        </S.Tabs>
      </S.TabWrapper>
      {/* <DashBoardTab currentItem={currentItem} changeItem={changeItem} /> */}
      {currentItem.component};
    </div>
  );
};

export default AlbumPage;
