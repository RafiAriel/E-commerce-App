import styled from 'styled-components';

export const Image = styled.img`

  width: 200px;
  height: 170px;
  max-width: 720px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 20px;
  animation: animateThumb 0.5s;

  :hover {
    opacity: 0.9;
    visibility: visible;
  }


  
  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  

}
`;

export const CustomDiv = styled.div`

 font-weight: bold;
 font-size: 18px;

 .rating
 {
   padding: 0 45px;
 }


`;