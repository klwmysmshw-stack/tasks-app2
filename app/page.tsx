'use client'

import { useState, useEffect } from 'react'
import { supabase, type Task } from '@/lib/supabase'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import toast from 'react-hot-toast'
import { CheckSquare, Plus } from 'lucide-react'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (title: string, description?: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, description }])
        .select()
        .single()

      if (error) throw error
      setTasks([data, ...tasks])
      toast.success('Task created successfully!')
      setShowForm(false)
    } catch (error) {
      console.error('Error adding task:', error)
      toast.error('Failed to create task')
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setTasks(tasks.map(task => task.id === id ? data : task))
      toast.success('Task updated successfully!')
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task')
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTasks(tasks.filter(task => task.id !== id))
      toast.success('Task deleted successfully!')
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
    }
  }

  const toggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    
    await updateTask(id, { completed: !task.completed })
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Tasks App</h1>
          </div>
          <p className="text-lg text-gray-600">Stay organized and get things done</p>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">Total Tasks</span>
              <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">Completed</span>
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-500">Remaining</span>
              <div className="text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</div>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            Add New Task
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-8">
            <TaskForm
              onSubmit={addTask}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  )
}