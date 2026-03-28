'use client';

import { useQuery, useMutation } from 'convex/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, Trash2 } from 'lucide-react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

export default function TasksPage() {
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.update);
  const deleteTask = useMutation(api.tasks.remove);
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createTask({ title });
    setTitle('');
  };

  const handleToggle = async (id: Id<'tasks'>, completed: boolean) => {
    await toggleTask({ id, completed: !completed });
  };

  const handleDelete = async (id: Id<'tasks'>) => {
    await deleteTask({ id });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Convex CRUD Test</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="Task title..."
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' && handleCreate()
              }
            />
            <Button onClick={handleCreate}>Add</Button>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {tasks?.map((task: { _id: Id<'tasks'>; title: string; completed: boolean }) => (
            <Card key={task._id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggle(task._id, task.completed)}
                  >
                    <Check
                      className={`h-4 w-4 ${task.completed ? 'text-green-500' : 'text-gray-300'}`}
                    />
                  </Button>
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.title}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(task._id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </CardContent>
            </Card>
          ))}

          {tasks?.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No tasks yet. Add one above!</p>
          )}
        </div>

        {tasks === undefined && (
          <p className="text-center text-muted-foreground py-8">Loading tasks...</p>
        )}
      </div>
    </div>
  );
}
