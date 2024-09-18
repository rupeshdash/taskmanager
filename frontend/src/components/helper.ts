export const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}-${month}-${day}`;
}

export const parseStatus = (status: string) => {
    switch (status) {
      case "backlog":
        return "Backlog";
      case "in-progress":
        return "In Progress";
      case "assigned":
        return "Assigned";
      case "review":
        return "Review";
    }
}