import CircularJSON from "circular-json";
import MyAlbumBox from "../../components/Container/MyAlbumBox";
import { useTabs } from "@/hooks/useTabs";
import * as S from "./style";
import Layout from "@/components/common/Layout";
import React from "react";
const allTab = [
  {
    idx: 0,
    name: "나의 앨범",
    component: <MyAlbumBox content='My' />,
  },
  {
    idx: 1,
    name: "내가 소장한 앨범",
    component: <MyAlbumBox content='Own' />,
  },
];

const AlbumPage = () => {
  const { currentItem, changeItem } = useTabs(0, allTab);
  return (
    <Layout>
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
      {currentItem.component}
    </Layout>
  );
};

// export async function getServerSideProps({ req }) {
//   const serializedReq = CircularJSON.stringify(req);
//   return {
//     props: {
//       req: serializedReq,
//     },
//   };
// }

export default AlbumPage;
