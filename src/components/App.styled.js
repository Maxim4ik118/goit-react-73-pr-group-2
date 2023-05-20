import styled from "styled-components";

export const StyledButtons = styled.div`
display: flex;
justify-content: center;
gap: 20px;
padding: 40px 0;

.filterBtn {
    border: 4px solid #0000ff;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #000000;
    color: #ffffff;
    font-size: 23px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.filterBtn.active{
    border: 4px solid yellow;
    background-color: rgba(0, 0, 0, 0.2);
    color: #000000;
    
}
` 
