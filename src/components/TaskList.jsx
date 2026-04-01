import TaskCard from './TaskCard'


export default function TaskList({ tasks, filter, onEdit, onDelete, onToggle }) {
  const filtered = tasks.filter((t) => filter === 'all' || t.status === filter)

  if (!filtered.length) {
    return <div className="empty">ไม่มี Task ในขณะนี้</div>
  }

  return (
    <div className="task-list">
      {filtered.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}