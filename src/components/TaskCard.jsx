import { LuCheck, LuPencil, LuTrash2 } from "react-icons/lu"

// map ค่า
const PRIORITY_LABEL = { high: 'สำคัญสูง', medium: 'สำคัญกลาง', low: 'สำคัญต่ำ' }

// แปลง 2026-04-05 เป็น 05/04/2026
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
          <LuCheck size={16} />
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
          <LuPencil size={18} />
        </button>
        <button className="icon-btn delete" onClick={() => onDelete(task)} title="ลบ">
          <LuTrash2 size={18} />
        </button>
      </div>
    </div>
  )
}