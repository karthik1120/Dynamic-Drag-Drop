import React, { Fragment, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import DragIcon from './DragIcon'
import DeleteIcon from './DeleteIcon'

const CardContent = styled.div`
  width: 100%;

  border: 1px solid lightgrey;
  /* margin: 8px; */
  margin-left: 18px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 3px;
  max-width: 200px;
  min-width: 150px;
  background: white;
  z-index: 2;

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
    border: none;
    outline: none;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  //::after
  position: relative;
  z-index: 0;
  background: white;

  ::before {
    content: '';
    position: absolute;
    width: calc(15% - 25px);
    height: 2px;
    background: ${prop => (prop.hide ? '' : 'blue')};
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

const Task = ({ task, setState, index, columnId }) => {
  const [showInput, setShowInput] = useState(false)
  return (
    <Draggable key={task.id} draggableId={String(task.id)} index={index}>
      {(draggableProvided, draggableSnapshot) => {
        console.log(
          '->>>draggableSnapshot.isDragging',
          draggableSnapshot.isDragging
        )
        return (
          <FlexWrapper hide={draggableSnapshot.isDragging}>
            <CardContent
              onDoubleClick={() => setShowInput(true)}
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
            >
              {!showInput ? (
                <Fragment>
                  <span className="drag">
                    <DragIcon />
                  </span>

                  <span className="card">{task.title}</span>
                </Fragment>
              ) : (
                <input
                  defaultValue={task.title}
                  autoFocus
                  onBlur={e => {
                    setState(prev =>
                      prev.map(i => {
                        if (i.id === columnId) {
                          i.cards[index].title = e.target.value
                          return i
                        } else return i
                      })
                    )
                    setShowInput(false)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setState(prev =>
                        prev.map(i => {
                          if (i.id === columnId) {
                            i.cards[index].title = e.target.value
                            return i
                          } else return i
                        })
                      )
                      setShowInput(false)
                    }
                  }}
                />
              )}
              {/* {droppableProvided.placeholder} */}
            </CardContent>
            <span
              onClick={() =>
                setState(prev => {
                  return [
                    ...prev.map(columnField => {
                      if (columnField?.id == columnId)
                        return {
                          ...columnField,
                          cards: columnField?.cards?.filter(
                            i => i?.id != task?.id
                          ),
                        }
                      else return columnField
                    }),
                  ]
                })
              }
            >
              <DeleteIcon />
            </span>
          </FlexWrapper>
        )
      }}
    </Draggable>
  )
}

export default Task
