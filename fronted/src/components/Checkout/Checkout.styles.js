import styled from 'styled-components';

export const CustomWrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 200px;
  top: 110px;
  position:relative;
  text-align:center;
  text-transform:capitalize;


    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);

    }
  
`;



