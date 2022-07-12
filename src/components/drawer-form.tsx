import styled from "styled-components";
import WritingForm from "./writing-form";

interface divType {
  visible?: boolean;
}
const DrawerLayout = styled.div<divType>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 500px;
  display: ${(props) => (props.visible ? "block" : "none")};
  background: white;
  box-shadow: 0 0 5px ${(props) => props.theme.color.grey500};
`;

type PropsType = {
  visible?: boolean;
};

const Drawer = ({ visible }: PropsType) => {
  return (
    <DrawerLayout visible={visible}>
      <WritingForm type="auto"></WritingForm>
    </DrawerLayout>
  );
};

export default Drawer;
