import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { taskReducer } from '../src/context/TodoProvider';

const buildTasks = () => [
    {
        id: 1,
        content: 'Main Task 1',
        edit: false,
        completed: false,
        deadline: '2026-01-01',
        children: [
            { id: 11, content: 'Sub Task 1', edit: false, completed: false, deadline: '2026-01-02' },
            { id: 12, content: 'Sub Task 2', edit: false, completed: false, deadline: '2026-01-03' },
        ],
    },
    {
        id: 2,
        content: 'Main Task 2',
        edit: false,
        completed: false,
        deadline: '2026-01-04',
        children: [],
    },
];

describe('taskReducer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-07-17'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('未知のactionを渡した場合は同一の参照をそのまま返す', () => {
        const tasks = buildTasks();

        const result = taskReducer(tasks, { type: 'UNKNOWN_ACTION' });

        expect(result).toBe(tasks);
    });

    describe('TASK_ADD', () => {
        it('末尾にid = tasks.length + 1のメインタスクを追加する', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TASK_ADD', payload: { content: 'New Task' } });

            expect(result).toHaveLength(3);
            expect(result[2]).toMatchObject({ id: 3, content: 'New Task', edit: false, children: [] });
        });

        it('payloadが文字列の場合もcontentとして扱われる(レガシー呼び出し互換)', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TASK_ADD', payload: 'New Task' });

            expect(result[2]).toMatchObject({ content: 'New Task' });
        });

        it('deadlineを指定しない場合は現在日時から7日後が設定される', () => {
            const result = taskReducer([], { type: 'TASK_ADD', payload: { content: 'New Task' } });

            expect(result[0].deadline).toBe('2026-07-24');
        });

        // タスク削除後に追加すると、生成ロジックが tasks.length ベースのため
        // 既存タスクとidが衝突しうる(削除がid採番に反映されない既知の挙動)
        it('削除後に追加すると既存タスクとidが重複しうる', () => {
            const afterDelete = taskReducer(buildTasks(), { type: 'TASK_DELETE', id: 1 });

            const result = taskReducer(afterDelete, { type: 'TASK_ADD', payload: { content: 'New Task' } });

            expect(afterDelete).toHaveLength(1);
            expect(result[1]).toMatchObject({ id: 2, content: 'New Task' });
            expect(result[0].id).toBe(2);
        });
    });

    it('SUBTASK_ADDは指定した親タスクの子に `${parentId}${連番}` のidでサブタスクを追加する', () => {
        const tasks = buildTasks();

        const result = taskReducer(tasks, {
            type: 'SUBTASK_ADD',
            payload: { parentId: 1, content: 'Sub Task 3' },
        });

        expect(result[0].children).toHaveLength(3);
        expect(result[0].children[2]).toMatchObject({ id: 13, content: 'Sub Task 3' });
        expect(result[1].children).toHaveLength(0);
    });

    describe('TASK_COMPLETE', () => {
        it('トップレベルのタスクのcompletedを反転する', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TASK_COMPLETE', id: 1 });

            expect(result[0].completed).toBe(true);
            expect(result[1].completed).toBe(false);
        });

        it('ネストしたサブタスクのcompletedも再帰的に反転できる', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TASK_COMPLETE', id: 11 });

            expect(result[0].children[0].completed).toBe(true);
            expect(result[0].children[1].completed).toBe(false);
        });
    });

    describe('TASK_DELETE', () => {
        it('トップレベルのタスクを削除する', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TASK_DELETE', id: 1 });

            expect(result).toHaveLength(1);
            expect(result[0].id).toBe(2);
        });

        // TASK_DELETEはトップレベル配列のfilterのみで再帰処理をしていないため、
        // サブタスクのidを指定しても子タスクは削除されない(既存実装の挙動)
        it('サブタスクのidを指定しても子タスクは削除されない', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TASK_DELETE', id: 11 });

            expect(result).toHaveLength(2);
            expect(result[0].children).toHaveLength(2);
        });
    });

    describe('TASK_EDITED', () => {
        it('トップレベルのタスクのcontentを更新し、editを反転する', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, {
                type: 'TASK_EDITED',
                payload: { id: 1, content: 'Updated Content' },
            });

            expect(result[0]).toMatchObject({ content: 'Updated Content', edit: true });
        });

        it('ネストしたサブタスクのcontentも再帰的に更新できる', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, {
                type: 'TASK_EDITED',
                payload: { id: 11, content: 'Updated Sub Content' },
            });

            expect(result[0].children[0]).toMatchObject({ content: 'Updated Sub Content', edit: true });
        });
    });

    describe('TOGGLE_EDIT_MODE', () => {
        it('トップレベルのタスクのeditを反転する', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TOGGLE_EDIT_MODE', id: 1 });

            expect(result[0].edit).toBe(true);
        });

        it('ネストしたサブタスクのeditも再帰的に反転できる', () => {
            const tasks = buildTasks();

            const result = taskReducer(tasks, { type: 'TOGGLE_EDIT_MODE', id: 11 });

            expect(result[0].children[0].edit).toBe(true);
        });
    });
});
