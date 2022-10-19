import React, {useState} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

type FilterValuesType = 'all' | 'active' | 'completed' | 'delete' | 'three';

export function Todolist(props: PropsType) {
    let [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodolist = props.tasks;

    if (filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    if (filter === 'delete') {
        tasksForTodolist = [];
    }
    if (filter === 'three') {
        tasksForTodolist = props.tasks.slice(0, 3);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <button onClick={() => {
            changeFilter('delete')
        }}>
            Delete All
        </button>
        <div>
            <button onClick={() => {
                changeFilter('all')
            }}>
                All
            </button>
            <button onClick={() => {
                changeFilter('active')
            }}>
                Active
            </button>
            <button onClick={() => {
                changeFilter('completed')
            }}>
                Completed
            </button>
            <button onClick={() => {
                changeFilter('three')
            }}>
                First three
            </button>
        </div>
    </div>
}