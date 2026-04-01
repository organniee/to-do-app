import { useState, useEffect } from 'react'

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'ออกแบบ UI สำหรับหน้า Dashboard',
    desc: 'ครอบคลุม mobile และ desktop layout',
    priority: 'high',
    due: '2026-04-05',
    status: 'completed',
    created: '2026-03-28',
  },
  {
    id: 2,
    title: 'เขียน Unit Test สำหรับ API',
    desc: '',
    priority: 'medium',
    due: '2026-04-10',
    status: 'pending',
    created: '2026-03-30',
  },
]

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : INITIAL_TASKS
    } catch {
      return INITIAL_TASKS
    }
  })

  const [nextId, setNextId] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks')
      const arr = saved ? JSON.parse(saved) : INITIAL_TASKS
      return arr.length ? Math.max(...arr.map((t) => t.id)) + 1 : 1
    } catch {
      return 3
    }
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (data) => {
    const newTask = {
      id: nextId,
      created: new Date().toISOString().slice(0, 10),
      ...data,
    }
    setTasks((prev) => [newTask, ...prev])
    setNextId((n) => n + 1)
  }

  const editTask = (id, data) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    )
  }

  return { tasks, addTask, editTask, deleteTask, toggleStatus }
}