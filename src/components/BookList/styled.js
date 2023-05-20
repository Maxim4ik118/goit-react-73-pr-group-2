import styled from 'styled-components';

export const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

export const StyledBookCard = styled.div`
  position: relative;
  padding: 15px;
  border: 1px solid black;
  border-radius: 10px;
  width: calc((100% - 90px) / 4);

  .removeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .book-icon.favourite {
    fill: red;
  }

  .book-icon {
    position: absolute;
    top: 10px;
    left: 10px;
  }
`;
