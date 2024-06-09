import styled from 'styled-components';
export const Discount = styled.div`
  position: absolute;
  
`;

export const TextPriceBase = styled.span`
  font-size: 13px;
  color: rgb(22, 101, 52);
  text-decoration: line-through;
  display: flex;
  
`;

export const TextPrice = styled.span`
  font-size: 26px;
  color: rgb(22, 101, 52);
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
