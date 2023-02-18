import Task from "./Task";
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 8px;
`;

const Title = styled.div`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(dragProvided) => (
        <Container {...dragProvided.draggableProps} ref={dragProvided.innerRef}>
          <Title {...dragProvided.dragHandleProps}>{column?.title}</Title>

          <Droppable droppableId={column.id}>
            {(provided, droppableSnapshot) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {tasks?.map((task, index) => (
                  <Task key={index} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
