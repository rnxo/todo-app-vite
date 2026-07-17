import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../src/components/Form/Form';
import { useTodoDispatch, useTodoState } from '../src/context/useTodoContext';

vi.mock('../src/context/useTodoContext', () => ({
    useTodoDispatch: vi.fn(),
    useTodoState: vi.fn(),
}));

describe('Form', () => {
    const mockDispatch = vi.fn();
    const tasks = [
        { id: 1, content: 'Main Task 1' },
        { id: 2, content: 'Main Task 2' },
    ];

    beforeEach(() => {
        mockDispatch.mockClear();
        useTodoDispatch.mockReturnValue(mockDispatch);
        useTodoState.mockReturnValue(tasks);
    });

    it('親が選択されていない場合はmainタスク用のplaceholderが表示される', () => {
        render(<Form />);

        expect(screen.getByPlaceholderText('Create a main task...')).toBeInTheDocument();
    });

    it('タスク一覧から選択肢が生成される', () => {
        render(<Form />);

        expect(screen.getByRole('option', { name: 'Add as subtask to: Main Task 1' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Add as subtask to: Main Task 2' })).toBeInTheDocument();
    });

    it('親未選択で送信するとTASK_ADDがdispatchされ、入力欄がクリアされる', async () => {
        const user = userEvent.setup();
        render(<Form />);
        const input = screen.getByPlaceholderText('Create a main task...');

        await user.type(input, 'New Task');
        await user.click(screen.getByRole('button', { name: 'Add Task' }));

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'TASK_ADD', payload: 'New Task' });
        expect(input).toHaveValue('');
    });

    it('親を選択して送信するとSUBTASK_ADDが選択したparentIdでdispatchされる', async () => {
        const user = userEvent.setup();
        render(<Form />);

        await user.selectOptions(screen.getByRole('combobox'), '2');
        await user.type(screen.getByPlaceholderText('Create a sub task...'), 'New Sub Task');
        await user.click(screen.getByRole('button', { name: 'Add Task' }));

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'SUBTASK_ADD',
            payload: { content: 'New Sub Task', parentId: 2 },
        });
    });

    it('空白のみの入力を送信してもdispatchされない', async () => {
        const user = userEvent.setup();
        render(<Form />);

        await user.type(screen.getByPlaceholderText('Create a main task...'), '   ');
        await user.click(screen.getByRole('button', { name: 'Add Task' }));

        expect(mockDispatch).not.toHaveBeenCalled();
    });
});
