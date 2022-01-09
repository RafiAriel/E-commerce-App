import styled from 'styled-components';

export const CustomWrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 540px;

  top: 195px;
  position:relative;
  text-align:center;
  text-transform:capitalize;
  .btn
  {
      color: white;
      font-weight: bold;
  }

    h1 {
    color: var(--medGrey);
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);

    }
  }
`;

export const CustomContent = styled.div`

  .msg { color: red; }
  font-weight: bold;

  margin: 0 auto;

  form {
    max-width: 450px;
    margin: auto;

 }

 .inputContainer i {
    position: absolute;
 }

 .inputContainer {
    width: 100%;
    margin-bottom: 20px;
 }

 .icon {
    padding: 15px;
    color: rgb(49, 0, 128);
    width: 70px;
    text-align: left;
 }

 .Field {
    width: 100%;
    padding: 10px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
 }


 .priceCustomGrid
 {
   font-size: 25px;
   font-weight:bold; 

 }


`;

