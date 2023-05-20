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

  .removeBtn,
  .favoriteButton{
    cursor: pointer;
    position: absolute;
    top: 10px;
  }
  .removeBtn {
    right: 10px;
  }

  .book-icon.favourite {
    fill: red;
  }

  .favoriteButton {
    left: 10px;
    background-color: transparent;
    border: none;
    padding: 0;
  }
`;
