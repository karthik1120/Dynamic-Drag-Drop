import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 8px;
  background-color: white;
`;
const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={`${task.id}`} index={index}>
      {(provided, draggableSnapshot) => {
        // console.log("---> draggableSnapshot.isDragging", draggableSnapshot);
        return (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              {" "}
              {task?.content} {task.id}
            </div>
          </Container>
        );
      }}
    </Draggable>
  );
};

export default Task;
