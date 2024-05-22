"use client";

import React, { useEffect } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  deleteTask,
  selectIsTaskModalOpen,
  selectTasks,
  selectTasksState,
  setTasks,
  setTasksState,
  triggerTaskModal,
} from "@/lib/features/counter/counterSlice";
import TaskFormModal from "./TaskFormModal";

interface IProps {}

Modal.setAppElement("#root");

function TasksTable() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const modalIsOpen = useAppSelector(selectIsTaskModalOpen);
  const tasksState = useAppSelector(selectTasksState);

  useEffect(() => {
    (async () => {
      const raw = await fetch("https://localhost:7298/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await raw.json();

      dispatch(setTasksState("READY"));
      // todo : check for error....

      dispatch(setTasks(data));
    })();
  }, []);

  const handleAdd = async () => {
    dispatch(triggerTaskModal({ isOpen: true }));
  };

  const handleUpdate = async (task) => {
    dispatch(triggerTaskModal({ isOpen: true, task }));
  };

  const handleCloseModal = () => {
    dispatch(triggerTaskModal({ isOpen: false }));
  };

  const handleDelete = async (id) => {
    await fetch(`https://localhost:7298/tasks/${id}`, {
      method: "DELETE",
    });
    dispatch(deleteTask(id));
  };

  return (
    <div>
      {tasksState === "LOADING" ? (
        <h1>Loading list...</h1>
      ) : tasksState === "READY" ? (
        <>
          <button onClick={handleAdd}>Add</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Priority</th>
                <th>Due date</th>
                <th>Created at</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tasks) &&
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.content}</td>
                    <td>{task.priority}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.createdAt}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleUpdate(task);
                        }}
                      >
                        Update
                      </button>
                      <button onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        "ERROR"
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            color: "lightsteelblue",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <TaskFormModal handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default TasksTable;
