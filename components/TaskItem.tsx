'use client'

import { useState } from 'react'
import { type Task } from '@/lib/supabase'
import TaskForm from './TaskForm'
import { Check, Edit2, Trash2, Clock, CheckCircle } from 'lucide-react'

interface TaskItemProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export default function TaskItem({ task, onUpdate, onDelete, onToggleComplete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (title: string, description?: string) => {
    onUpdate(task.id, { title, description })
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isEditing) {
    return (
      <TaskForm
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
        initialTitle={task.title}
        initialDescription={task.description || ''}
        isEditing
      />
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
      task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-indigo-400'
            }`}
          >
            {task.completed && <Check className="h-4 w-4" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-medium transition-all duration-200 ${
              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-2 text-sm transition-all duration-200 ${
                task.completed ? 'text-gray-400 line-through' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                {task.completed ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <Clock className="h-3 w-3" />
                )}
                <span>Created: {formatDate(task.created_at)}</span>
              </div>
              {task.updated_at !== task.created_at && (
                <div className="flex items-center gap-1">
                  <Edit2 className="h-3 w-3" />
                  <span>Updated: {formatDate(task.updated_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              title="Edit task"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}