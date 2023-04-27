import * as S from "./style";
import AlbumCard from "@/components/common/AlbumCard";
import dummy from "@/pages/test.json";
interface MyAlbumBoxProps {
  text: string;
}
const AlbumBox = ({ text }: MyAlbumBoxProps) => {
  return (
    <S.AlbumContainer>
      {dummy.releasedAlbumList.map(
        (data: {
          name: string;
          albumImage: string;
          code: string;
          releasedDate: string;
          nickname: string;
        }) => (
          <>
            <AlbumCard
              onClickEvent={() => console.log("히히")}
              data={data}
              showAlbumDetail={false}
            />
          </>
        )
      )}
    </S.AlbumContainer>
  );
};

export default AlbumBox;
