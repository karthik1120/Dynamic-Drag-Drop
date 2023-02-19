import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
const Column = dynamic(() => import('./Column'), { ssr: false })

const Container = styled.div`
  margin: 8px;
  padding: 8px;
  border-radius: 3px;
  display: flex;
  > div {
    background: white;
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

const Flex = styled.div`
  overflow: scroll;
`

export default function Home() {
  const [state, setState] = useState(initialData)

  const handleDragEnd = result => {
    const { destination, source, type } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state)
      const [removed] = newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, removed)

      const newState = [...newColumnOrder]

      setState(newState)
      return
    }

    if (source.droppableId === destination.droppableId) {
      const cardObj = Array.from(state).find(
        i => i?.id === destination?.droppableId
      )

      const cardArr = cardObj.cards
      const [removed] = cardArr.splice(source.index, 1)
      cardArr.splice(destination.index, 0, removed)

      let filterArr = state?.map(i => {
        if (i.id === destination.droppableId) {
          return { ...i, cards: cardArr }
        } else {
          return i
        }
      })

      setState(filterArr)
      return
    }

    const sourceObj = Array.from(state).find(i => i?.id === source?.droppableId)

    const destObj = Array.from(state).find(
      i => i?.id === destination?.droppableId
    )

    const cardArr = sourceObj.cards
    const [removed] = cardArr.splice(source.index, 1)
    destObj.cards.splice(destination.index, 0, removed)

    let filterArr = state?.map(i => {
      if (i.id === source.droppableId) {
        return { ...i, cards: cardArr }
      } else if (i.id === destination.droppableId) {
        return { ...destObj }
      } else {
        return i
      }
    })

    setState(filterArr)
  }

  console.log('--result>>>>>', state)
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapProvided) => (
          <Flex>
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {state?.map((columnInfo, index) => (
                <Column
                  key={columnInfo.id}
                  column={columnInfo}
                  index={index}
                  setState={setState}
                />
              ))}

              {!snapProvided.draggingFromThisWith && (
                <button
                  onClick={() =>
                    setState(prev => [
                      ...prev,
                      {
                        id: uuid(),
                        cards: [],
                        title: 'untitled menu',
                      },
                    ])
                  }
                >
                  Add a menu
                </button>
              )}
            </Container>

            {/* {provided.placeholder} */}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}
const initialData = [
  {
    id: '1',
    cards: [
      {
        title: 'lkjljllk',
        id: '2',
      },
      {
        title: 'one value ',
        id: '3',
      },
    ],
    title: 'one board',
  },
  {
    id: '4',
    cards: [
      {
        id: '5',
        title: 'ten value ',
      },
      {
        id: '6',
        title: 'twenty value ',
      },
      {
        id: '7',
        title: 'fifter value ',
      },
    ],
    title: 'second bore',
  },
  {
    id: '8',
    cards: [
      {
        id: '21',
        title: 'one value ',
      },
      {
        id: '32',
        title: 'two value',
      },
      {
        id: '74',
        title: 'three value ',
      },
    ],
    title: 'third value ',
  },
]
