import styled from 'styled-components'
import { theme } from 'styles/theme'

export const Container = styled.div``
export const Wrapper = styled.div`
  display: grid;
  background-color: ${theme.SECONDARYBLUECOLOR};
  border-radius: 16px;
  padding: 80px 20px 0 20px;
  grid-gap: 52px;
  text-align: left;
  width: 220px;
  /* min-height: 77vh; */
  min-height: calc(100vh - 186px);
`
export const BasicLinksContainer = styled.div``
export const DataWrapper = styled.div`
  max-width: 180px;
  min-height: 44px;
  display: flex;
  grid-gap: 10px;
  align-items: center;
  padding-left: 11px;
  cursor: pointer;
  a {
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
    color: ${theme.WHITE};
    width: 100%;
    max-width: 180px;
    padding: 12px;
    border-radius: 8px;
  }
  a.active {
    background: ${theme.ORANGERUST};
  }
`
export const NavItems = styled.div`
  color: ${theme.WHITE};
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  font-family: 'Inter';
  text-transform: capitalize;
  white-space: nowrap;
  margin-bottom: 2px;
  text-decoration: none;
`
export const Title = styled.div``
