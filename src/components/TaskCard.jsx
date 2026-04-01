const PRIORITY_LABEL = { high: 'สำคัญสูง', medium: 'สำคัญกลาง', low: 'สำคัญต่ำ' }

function formatDate(d) {
  if (!d) return '-'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className={`task-card ${task.status}`}>
      <div className="checkbox-wrap" onClick={() => onToggle(task.id)}>
        <div className={`checkbox ${task.status === 'completed' ? 'checked' : ''}`}>
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>

      <div className="task-body">
        <p className="task-title">{task.title}</p>
        {task.desc && <p className="task-desc">{task.desc}</p>}
        <div className="task-meta">
          <span className={`badge badge-priority-${task.priority}`}>
            {PRIORITY_LABEL[task.priority]}
          </span>
          <span className={`badge badge-status-${task.status}`}>
            {task.status === 'completed' ? 'ดำเนินการเสร็จสิ้น' : 'ยังไม่ดำเนินการ'}
          </span>
          <span className="task-date">กำหนดเสร็จ: {formatDate(task.due)}</span>
        </div>
      </div>

      <div className="task-actions">
        <button className="icon-btn edit" onClick={() => onEdit(task)} title="แก้ไข">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
        <button className="icon-btn delete" onClick={() => onDelete(task)} title="ลบ">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}