import Task from './Task'
import React, { Fragment, useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import DragIcon from './DragIcon'
import { v4 as uuid } from 'uuid'
import DeleteIcon from './DeleteIcon'

const ColumnContainer = styled.div`
  margin: 8px;
  padding: 8px;
  border-radius: 3px;
  text-transform: capitalize;
  min-width: 150px;
  max-width: 240px;
  /* position: relative;
  flex-shrink: 0;

  ::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: red;
    /* left: 15px; */
    margin-left: 8px;
    z-index: 3;
  } */
`

const ColumnTitle = styled.div`
  position: relative;
  z-index: 3;
  background: white;
  font-weight: 600;
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 3px;
  /* max-width: 230px; */
  min-width: 200px;

  > span.drag {
    padding: 0px 6px;
    cursor: grab;
  }

  > input {
    border: none;
    outline: none;
  }
`

const Flex = styled.div`
  > button {
    height: 25px;
    margin: 8px;
    margin-top: 25px;
    border: none;
    color: #464573;
    background: #e3e3fc;
    border-radius: 3px;
    margin-left: 18px;
  }
`

const TitleContainer = styled.div`
  display: flex;

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

const ColumnWrapper = styled.div`
  position: relative;
  flex-shrink: 0;

  ::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: red;
    /* left: 15px; */
    margin-left: 8px;
    z-index: 3;
    height: calc(100% - 27px);
  }
`

const Column = ({ column, index, setState }) => {
  const [showInput, setShowInput] = useState(false)
  return (
    <Draggable draggableId={String(column.id)} index={index}>
      {(dragProvided, snap) => (
        <ColumnContainer
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
        >
          <TitleContainer>
            <ColumnTitle
              onDoubleClick={() => setShowInput(true)}
              {...dragProvided.dragHandleProps}
            >
              {!showInput ? (
                <Fragment>
                  <span className="drag">
                    <DragIcon />
                  </span>
                  <span onDrag={e => e.stopPropagation()}>{column.title}</span>
                </Fragment>
              ) : (
                <input
                  defaultValue={column.title}
                  autoFocus
                  onBlur={e => {
                    setState(prev =>
                      prev.map(item => {
                        if (item.id === column.id) {
                          return { ...item, title: e.target.value }
                        }
                        return item
                      })
                    )
                    setShowInput(false)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setState(prev =>
                        prev.map(item => {
                          if (item.id === column.id) {
                            return { ...item, title: e.target.value }
                          }
                          return item
                        })
                      )
                      setShowInput(false)
                    }
                  }}
                />
              )}
            </ColumnTitle>
            <span
              onClick={() =>
                setState(prev =>
                  prev.filter(i => {
                    return i.id !== column.id
                  })
                )
              }
            >
              <DeleteIcon />
            </span>
          </TitleContainer>

          <Droppable droppableId={String(column.id)}>
            {(droppableProvided, droppableSnapshot) => (
              <Flex
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                <ColumnWrapper>
                  {column?.cards?.map((task, index) => (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      setState={setState}
                      columnId={column?.id}
                    />
                  ))}
                </ColumnWrapper>

                {!droppableSnapshot.draggingFromThisWith && (
                  <button
                    onClick={() =>
                      setState(value =>
                        value?.map(i => {
                          if (i.id == column.id) {
                            return {
                              ...i,
                              cards: [
                                ...i.cards,
                                {
                                  title: 'untitled sub menu ',
                                  id: uuid(),
                                },
                              ],
                            }
                          } else {
                            return i
                          }
                        })
                      )
                    }
                  >
                    Add a sub-menu
                  </button>
                )}
              </Flex>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  )
}

export default Column
