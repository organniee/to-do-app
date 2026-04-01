export default function ConfirmDialog({ isOpen, taskTitle, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="confirm-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="confirm-box">
        <div className="confirm-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
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