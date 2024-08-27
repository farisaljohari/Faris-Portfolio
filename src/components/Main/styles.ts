import styled from "styled-components";


export const Container = styled.main`
  position: relative;
  z-index: 0;
  padding: 0 10rem;
  overflow-x: hidden;
  #tsparticles{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  @media (max-width: 740px){
    padding: 0 4rem;
  }

  @media(max-width: 360px){
    padding: 0 2rem;
  }
`


export const ScrollButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px; /* Adjust if needed */
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  z-index: 10;
  transition: opacity 0.9s ease;
`;
