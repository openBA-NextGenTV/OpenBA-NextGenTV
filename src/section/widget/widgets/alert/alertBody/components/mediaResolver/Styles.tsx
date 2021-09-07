import styled from 'styled-components';

export const Image = styled.img<{ selected: boolean }>`
  border: ${({ selected, theme }) => `${selected ? theme.menu.selectedItemColor : 'transparent'} 5px solid`};
  object-fit: contain;
  object-position: top;
  height: auto;
  max-width: 100%;
  margin-bottom: 10px;
`;

export const Video = styled.video<{ selected: boolean }>`
  border: ${({ selected }) => (selected ? 'solid blue 2px' : 'none')};
  background-color: transparent;
  border: ${({ selected, theme }) => `${selected ? theme.menu.selectedItemColor : 'transparent'} 5px solid`};
  object-fit: contain;
  object-position: top;
  height: auto;
  max-width: 100%;
  margin-bottom: 10px;
`;

export const MediaContainer = styled.div``;
