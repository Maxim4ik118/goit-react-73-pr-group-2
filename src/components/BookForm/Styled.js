import styled from 'styled-components';

// export const StyledFormButton = styled.button`
//   border: none;
//   background: #000;
//   color: #fff;
//   padding: 15px;
//   border-radius: 10px;
//   cursor: pointer;
//   font-size: 14px;
// `;

// export const StyledFormSubmitButton = styled(StyledFormButton)`
//   font-size: 18px;
// `;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
  margin: 20px auto 25px;
  gap: 16px;

  .form-label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .label-name {
    font-weight: bold;
    font-size: 18px;
    line-height: 1.2;
    margin: 0;
  }
  .radio-group {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }

  .form-btn {
    border: none;
    background: #000;
    color: #fff;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
  }
`;
