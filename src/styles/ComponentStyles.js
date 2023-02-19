import styled from 'styled-components'

export const Container = styled.div`
  margin: 8px;
  padding: 8px;
  border-radius: 3px;
  display: flex;

  width: auto;

  > div {
    /* background: white; */
  }
  > button {
    height: 25px;
    margin: 8px;
    margin-top: 25px;
    border: none;
    color: #464573;
    background: #e3e3fc;
    border-radius: 3px;
  }
`

export const Wrapper = styled.div`
  overflow: scroll;
  min-height: 100vh;
  min-width: 100vh;
`

export const ColumnContainer = styled.div`
  margin: 8px;
  padding: 8px;
  border-radius: 3px;
  text-transform: capitalize;
  width: 350px;
`

export const ColumnTitle = styled.div`
  position: relative;
  z-index: 3;
  font-weight: 600;
  width: 220px;

  background: #fbf2f9;
  border: 2px solid #ffabe5;
  border-radius: 5px;
  padding: 12px 10px;
  display: grid;
  grid-template-columns: auto 1fr;

  > span.drag {
    padding: 0px 6px;
  }

  > span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  > input {
    font-weight: 600;
    color: #1d111a;
    border: none;
    outline: none;
    background: #faf1f9;
    font-size: 16px;
    width: 200px;
  }
`

export const RowWrapper = styled.div``

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  > span {
    visibility: hidden;
  }

  :hover {
    > span {
      visibility: visible;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
`

export const ColumnWrapper = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 10px;

  ::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: #a8a7ea;
    /* left: 15px; */
    margin-left: 8px;
    z-index: 3;
    height: calc(100% - 25px);
  }
`

export const CardContent = styled.div`
  width: 80%;
  margin-left: 18px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  max-width: 200px;
  min-width: 150px;
  z-index: 2;
  display: grid;
  grid-template-columns: auto 1fr;
  background: #f5f5fc;
  border: 2px solid #a8a7ea;
  border-radius: 5px;
  color: #7474dd;
  font-size: 15px;

  > span.card {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  > span.drag {
    padding: 0px 6px;
    cursor: grab;
  }

  > input {
    background: #f5f5fc;
    color: #7474dd;
    font-size: 15px;
    border: none;
    outline: none;
    width: 200px;
  }
`

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 0;
  /* background: white; */

  ::before {
    content: '';
    position: absolute;
    width: calc(13% - 25px);
    height: 2px;
    background: ${prop => (prop.hide ? '' : '#a8a7ea')};
    top: 50%;
    z-index: 2;
    left: 8px;
  }

  > span {
    visibility: hidden;
  }

  :hover {
    > span {
      visibility: visible;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
`

export const ButtonWrapper = styled.div`
  margin-left: 25px;
  > button.menu {
    margin: 0px;
    margin-top: 25px;
  }
  > button {
    min-width: 125px;
    height: 25px;
    margin: 15px;
    border: none;
    color: #31306d;
    background: #e3e3fc;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 15px 8px;
    border-radius: 5px;

    > span.icon {
      background: #7272dc;
      color: white;
      border-radius: 50%;
      width: 18px;
      align-items: center;
      height: 18px;
      font-size: 17px;
    }
    > span.text {
      margin-left: 8px;
      font-size: 14px;
      font-weight: 600;
    }
  }
`

export const DeleteWrapper = styled.span`
  background: #dce4ef;
  width: 15px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  width: 35px;
  height: 35px;
  margin-left: 10px;
`
