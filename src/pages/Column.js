import React, { Fragment, useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'
import dynamic from 'next/dynamic'

// import DragIcon from './DragIcon'
// import DeleteIcon from './DeleteIcon'
// import RowDraggable from './RowDraggable'

const DragIcon = dynamic(() => import('./DragIcon'), { ssr: false })
const DeleteIcon = dynamic(() => import('./DeleteIcon'), { ssr: false })
const RowDraggable = dynamic(() => import('./RowDraggable'), { ssr: false })

import {
  ColumnContainer,
  ColumnTitle,
  RowWrapper,
  TitleContainer,
  ColumnWrapper,
  ButtonWrapper,
  DeleteWrapper,
} from '../styles/ComponentStyles'

const Column = ({ column, index, setState }) => {
  const [showInput, setShowInput] = useState(false)

  const handleSubmenu = () =>
    setState(preValue =>
      preValue?.map(i => {
        if (i?.id == column?.id) {
          return {
            ...i,
            cards: [
              ...i?.cards,
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

  const handleDeleteClick = () =>
    setState(prev =>
      prev?.filter(item => {
        return item?.id !== column?.id
      })
    )

  const handleInput = e => {
    setState(prev =>
      prev?.map(item => {
        if (item?.id === column?.id) {
          return {
            ...item,
            title: e.target.value || 'untitled menu',
          }
        }
        return item
      })
    )
    setShowInput(false)
  }

  const renderContent = () => {
    if (!showInput) {
      return (
        <Fragment>
          <span className="drag">
            <DragIcon fill={'#d959af'} />
          </span>
          <span onDrag={e => e.stopPropagation()}>{column?.title}</span>
        </Fragment>
      )
    } else
      return (
        <input
          defaultValue={column?.title}
          autoFocus
          onBlur={e => handleInput(e)}
          onKeyDown={e => {
            if (e?.key === 'Enter') {
              handleInput(e)
            }
          }}
        />
      )
  }

  return (
    <Draggable draggableId={String(column?.id)} index={index}>
      {(dragProvided, snap) => (
        <ColumnContainer
          {...dragProvided.draggableProps}
          ref={dragProvided.innerRef}
        >
          <TitleContainer>
            <ColumnTitle
              onDoubleClick={() => setShowInput(!showInput)}
              {...dragProvided.dragHandleProps}
            >
              {renderContent()}
            </ColumnTitle>
            <DeleteWrapper onClick={handleDeleteClick}>
              <DeleteIcon />
            </DeleteWrapper>
          </TitleContainer>

          <Droppable droppableId={String(column?.id)}>
            {(droppableProvided, droppableSnapshot) => (
              <RowWrapper
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                <ColumnWrapper>
                  {column?.cards?.map((rowData, index) => (
                    <RowDraggable
                      key={rowData?.id}
                      rowData={rowData}
                      index={index}
                      setState={setState}
                      columnId={column?.id}
                    />
                  ))}
                </ColumnWrapper>

                <ButtonWrapper>
                  {!droppableSnapshot.draggingFromThisWith && (
                    <button onClick={handleSubmenu}>
                      <span className="icon">+</span>
                      <span className="text"> Add a sub-menu</span>
                    </button>
                  )}
                </ButtonWrapper>
              </RowWrapper>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  )
}

export default Column
