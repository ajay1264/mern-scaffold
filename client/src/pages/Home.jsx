import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { api } from "../services/api";
import useAuth from "../hooks/useAuth";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";

import {
  formatDate,
  getPriorityLabel,
  getStatusLabel,
} from "../utils/helpers";

const initialForm = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
};

const Home = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/tasks");

      setTasks(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openCreateModal = () => {
    setEditingTask(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
    setForm(initialForm);
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingTask) {
        await api.put(
          `/tasks/${editingTask._id}`,
          form
        );
      } else {
        await api.post("/tasks", form);
      }

      closeModal();
      await fetchTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/tasks/${id}`);

      await fetchTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Welcome, {user?.name}
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Task
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-white p-10 text-center">
          <h2 className="text-lg font-semibold">
            No tasks yet
          </h2>

          <p className="mt-1 text-gray-500">
            Create your first task to get started.
          </p>

          <Button
            onClick={openCreateModal}
            className="mt-4"
          >
            Create Task
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-lg border bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="font-semibold text-gray-800">
                  {task.title}
                </h2>

                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                  {getStatusLabel(task.status)}
                </span>
              </div>

              <p className="mb-4 min-h-12 text-sm text-gray-600">
                {task.description ||
                  "No description provided."}
              </p>

              <div className="mb-4 space-y-1 text-sm text-gray-500">
                <p>
                  Priority:{" "}
                  <span className="font-medium text-gray-700">
                    {getPriorityLabel(task.priority)}
                  </span>
                </p>

                <p>
                  Created: {formatDate(task.createdAt)}
                </p>
              </div>

              <div className="flex gap-2 border-t pt-4">
                <Button
                  variant="outline"
                  onClick={() => openEditModal(task)}
                  className="flex flex-1 items-center justify-center gap-2"
                >
                  <Pencil size={16} />
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    handleDelete(task._id)
                  }
                  className="flex flex-1 items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={
          editingTask ? "Edit Task" : "Create Task"
        }
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />

          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={4}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="pending">
                  Pending
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="priority"
                className="text-sm font-medium text-gray-700"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">
                  Medium
                </option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={closeModal}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingTask
                ? "Update Task"
                : "Create Task"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;