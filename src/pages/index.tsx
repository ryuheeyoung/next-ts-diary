import BookSelf from "components/book-form";
import styled from "styled-components";

const GridLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: visible;
  border-bottom: 3px solid;
  height: 165px;
`;

export default function Home() {
  return (
    <>
      <GridLayout>
        <BookSelf />
      </GridLayout>
    </>
  );
}
