import { useState } from 'react'


const EMPTY_FORM = { title: '', desc: '', priority: '', due: '', status: '' }
const EMPTY_ERRORS = { title: '', priority: '', due: '', status: '' }

function TaskModalInner({ onClose, onSave, editTask }) {
  const [form, setForm] = useState(
    editTask ? { ...EMPTY_FORM, ...editTask } : EMPTY_FORM
    )
  const [errors, setErrors] = useState(EMPTY_ERRORS)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = { ...EMPTY_ERRORS }
    let valid = true
    if (!form.title.trim()) { newErrors.title = 'กรุณากรอกชื่อ Task'; valid = false }
    if (!form.priority) { newErrors.priority = 'กรุณาเลือกความสำคัญ'; valid = false }
    if (!form.due) { newErrors.due = 'กรุณาเลือกวันที่กำหนดเสร็จ'; valid = false }
    if (!form.status) { newErrors.status = 'กรุณาเลือกสถานะ'; valid = false }
    setErrors(newErrors)
    return valid
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({ title: form.title.trim(), desc: form.desc.trim(), priority: form.priority, due: form.due, status: form.status })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{editTask ? 'Edit Task' : 'Add Task'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-group">
          <label className="form-label">ชื่อ Task <span className="required">*</span></label>
          <input
            className={`form-input ${errors.title ? 'error' : ''}`}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="กรอกชื่อ Task"
          />
          {errors.title && <p className="err-msg">⚠ {errors.title}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">รายละเอียด</label>
          <textarea
            className="form-textarea"
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">ความสำคัญ <span className="required">*</span></label>
            <select
              className={`form-select ${errors.priority ? 'error' : ''}`}
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="">-- เลือก --</option>
              <option value="high">สูง</option>
              <option value="medium">กลาง</option>
              <option value="low">ต่ำ</option>
            </select>
            {errors.priority && <p className="err-msg">⚠ {errors.priority}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">วันที่กำหนดเสร็จ <span className="required">*</span></label>
            <input
              className={`form-input ${errors.due ? 'error' : ''}`}
              type="date"
              name="due"
              value={form.due}
              onChange={handleChange}
            />
            {errors.due && <p className="err-msg">⚠ {errors.due}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">สถานะ <span className="required">*</span></label>
          <select
            className={`form-select ${errors.status ? 'error' : ''}`}
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">-- เลือก --</option>
            <option value="pending">ยังไม่ดำเนินการ</option>
            <option value="completed">ดำเนินการเสร็จสิ้น</option>
          </select>
          {errors.status && <p className="err-msg">⚠ {errors.status}</p>}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>ยกเลิก</button>
          <button className="btn btn-primary" onClick={handleSave}>บันทึก</button>
        </div>
      </div>
    </div>
  )
}

// ใช้ key prop เพื่อ reset state ทุกครั้งที่เปิด modal
// แทนการใช้ useEffect + setState ซึ่งทำให้เกิด cascading renders
export default function TaskModal({ isOpen, onClose, onSave, editTask }) {
  if (!isOpen) return null
  return (
    <TaskModalInner
      key={editTask ? `edit-${editTask.id}` : 'add'}
      onClose={onClose}
      onSave={onSave}
      editTask={editTask}
    />
  )
}