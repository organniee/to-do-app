import { FaTrash, FaExclamationTriangle } from "react-icons/fa"

// เป็น Modal สำหรับยืนยันการลบ Task
export default function ConfirmDialog({ isOpen, taskTitle, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    // confirm-overlay พื้นหลังมืดๆคลุมทั้งจอ
    // e.currentTarget = div overlay
    <div className="confirm-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="confirm-box">
        <div className="confirm-icon">
          <div className="confirm-icon">
            <FaTrash size={24} />
          </div>
        </div>
        <h3 className="confirm-title">ยืนยันการลบ</h3>
        <p className="confirm-msg">
          คุณต้องการลบ <strong>"{taskTitle}"</strong> ใช่หรือไม่?
          <br />
          <span className="confirm-sub">การดำเนินการนี้ไม่สามารถย้อนกลับได้</span>
        </p>
        <div className="confirm-btns">
          <button className="btn btn-secondary" onClick={onCancel}>ยกเลิก</button>
          <button className="btn btn-danger" onClick={onConfirm}>ลบ Task</button>
        </div>
      </div>
    </div>
  )
}