import React, { Fragment, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import dynamic from 'next/dynamic'

const DragIcon = dynamic(() => import('./DragIcon'), { ssr: false })
const DeleteIcon = dynamic(() => import('./DeleteIcon'), { ssr: false })

// import DragIcon from './DragIcon'
// import DeleteIcon from './DeleteIcon'

import {
  CardContent,
  FlexWrapper,
  DeleteWrapper,
} from '../styles/ComponentStyles'

const RowDraggable = ({ rowData, setState, index, columnId }) => {
  const [showInput, setShowInput] = useState(false)

  const handleRowDelete = () => {
    setState(prev => {
      return [
        ...prev.map(columnField => {
          if (columnField?.id == columnId)
            return {
              ...columnField,
              cards: columnField?.cards?.filter(i => i?.id != rowData?.id),
            }
          else return columnField
        }),
      ]
    })
  }

  const handleRowInput = e => {
    setState(prev =>
      prev.map(i => {
        if (i?.id === columnId) {
          i.cards[index].title = e.target.value || 'untitled submenu'
          return i
        } else return i
      })
    )
    setShowInput(false)
  }

  return (
    <Draggable
      key={rowData?.id}
      draggableId={String(rowData?.id)}
      index={index}
    >
      {(draggableProvided, draggableSnapshot) => {
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
                    <DragIcon fill={'#7474dd'} />
                  </span>

                  <span className="card">{rowData?.title}</span>
                </Fragment>
              ) : (
                <input
                  defaultValue={rowData?.title}
                  autoFocus
                  onBlur={e => handleRowInput(e)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleRowInput(e)
                    }
                  }}
                />
              )}
              {/* {droppableProvided.placeholder} */}
            </CardContent>
            <DeleteWrapper onClick={handleRowDelete}>
              <DeleteIcon />
            </DeleteWrapper>
          </FlexWrapper>
        )
      }}
    </Draggable>
  )
}

export default RowDraggable
