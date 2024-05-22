import {
  addTask,
  selectTaskOnEdit,
  setSubmitState,
  updateTask,
} from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { useForm } from "react-hook-form";

function TaskFormModal({ handleCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { dirtyFields, errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const dispatch = useAppDispatch();

  const taskOnEdit = useAppSelector(selectTaskOnEdit);

  const getDefualtValue = (key) => {
    return taskOnEdit?.[key] || "";
  };
  const addOrUpdate = async (task) => {
    let method = "";
    dispatch(setSubmitState("LOADING"));
    const id = taskOnEdit ? taskOnEdit.id : "";

    if (taskOnEdit) {
      task.id = id;
      dispatch(updateTask({ id, task }));
      method = "PUT";
    } else {
      method = "POST";
      dispatch(addTask(task));
    }

    const res = await fetch(`https://localhost:7298/tasks/${id}`, {
      method,
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // todo: check status....

    dispatch(setSubmitState("DONE"));
    handleCloseModal();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(addOrUpdate)}
        className="mt-2 flex flex-col space-y-2"
      >
        <input
          {...register("title", { required: true })}
          defaultValue={getDefualtValue("title")}
          placeholder="Title"
        />

        <input
          {...register("content", { required: true })}
          placeholder="Content"
          defaultValue={getDefualtValue("content")}
        ></input>

        <input
          {...register("priority", {
            required: true,
          })}
          className={`rounded-md border p-1 outline-none `}
          placeholder="Priority"
          defaultValue={getDefualtValue("priority")}
        ></input>

        <input
          {...register("dueDate", {
            required: true,
          })}
          placeholder="Due date"
          defaultValue={getDefualtValue("dueDate")}
        ></input>

        <button type="submit">Add/Update</button>
        <button onClick={handleCloseModal}>Close</button>
      </form>
    </div>
  );
}

export default TaskFormModal;
