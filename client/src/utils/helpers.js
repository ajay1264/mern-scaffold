export const formatDate = (date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString();
};

export const getStatusLabel = (status) => {
  switch (status) {
    case "pending":
      return "Pending";

    case "in-progress":
      return "In Progress";

    case "completed":
      return "Completed";

    default:
      return status;
  }
};

export const getPriorityLabel = (priority) => {
  switch (priority) {
    case "low":
      return "Low";

    case "medium":
      return "Medium";

    case "high":
      return "High";

    default:
      return priority;
  }
};