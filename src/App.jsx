import { useState } from 'react'
import { useTasks } from './hooks/useTasks'
import TaskList from './components/TaskList'
import TaskModal from './components/TaskModal'
import ConfirmDialog from './components/ConfirmDialog'
import './App.css'

const NAV_ITEMS = [
  { key: 'all',       label: 'ทั้งหมด',           icon: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' },
  { key: 'pending',   label: 'ยังไม่ดำเนินการ',    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
  { key: 'completed', label: 'ดำเนินการเสร็จสิ้น', icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' },
]

export default function App() {
  const { tasks, addTask, editTask, deleteTask, toggleStatus } = useTasks()
  const [filter, setFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [confirmTask, setConfirmTask] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2500)
  }

  const handleAdd = () => { setEditingTask(null); setModalOpen(true) }
  const handleEdit = (task) => { setEditingTask(task); setModalOpen(true) }
  const handleSave = (data) => {
    if (editingTask) { editTask(editingTask.id, data); showToast('แก้ไข Task เรียบร้อย') }
    else { addTask(data); showToast('เพิ่ม Task เรียบร้อย') }
  }
  const handleConfirmDelete = () => {
    deleteTask(confirmTask.id)
    setConfirmTask(null)
    showToast('ลบ Task เรียบร้อย')
  }

  const total   = tasks.length
  const done    = tasks.filter((t) => t.status === 'completed').length
  const pending = tasks.filter((t) => t.status === 'pending').length
  const pct     = total ? Math.round((done / total) * 100) : 0
  const filterLabel = NAV_ITEMS.find((n) => n.key === filter)?.label

  return (
    <div className="layout">

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <span className="logo-text">TaskFlow</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-section-label">เมนู</p>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${filter === item.key ? 'active' : ''}`}
              onClick={() => setFilter(item.key)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ flexShrink: 0 }}>
                <path d={item.icon} />
              </svg>
              {item.label}
              <span className="nav-badge">
                {item.key === 'all' ? total : item.key === 'pending' ? pending : done}
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebar-progress">
          <div className="progress-header">
            <span>ความคืบหน้า</span>
            <span className="progress-pct">{pct}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="progress-sub">{done} จาก {total} tasks เสร็จสิ้น</p>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">

        <header className="topbar">
          <div>
            <h1 className="topbar-title">{filterLabel}</h1>
            <p className="topbar-sub">
              {filter === 'all'       ? `${total} tasks ทั้งหมด`
               : filter === 'pending' ? `${pending} tasks ที่รอดำเนินการ`
               :                        `${done} tasks ที่เสร็จสิ้นแล้ว`}
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
            </svg>
            Add Task
          </button>
        </header>

        <div className="stats">
          {[
            { label: 'Total Tasks', num: total,   cls: '',              iconPath: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' },
            { label: 'เสร็จสิ้น',   num: done,    cls: 'stat-card-done',    iconPath: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
            { label: 'รอดำเนินการ', num: pending, cls: 'stat-card-pending', iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
            { label: 'สำเร็จ',      num: `${pct}%`, cls: 'stat-card-pct',  iconPath: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z' },
          ].map(({ label, num, cls, iconPath }) => (
            <div key={label} className={`stat-card ${cls}`}>
              <div className={`stat-icon stat-icon-${cls || 'total'}`}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d={iconPath} /></svg>
              </div>
              <div>
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="content">
          <TaskList
            tasks={tasks}
            filter={filter}
            onEdit={handleEdit}
            onDelete={setConfirmTask}
            onToggle={toggleStatus}
          />
        </div>
      </div>

      <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} editTask={editingTask} />
      <ConfirmDialog isOpen={!!confirmTask} taskTitle={confirmTask?.title} onConfirm={handleConfirmDelete} onCancel={() => setConfirmTask(null)} />
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}