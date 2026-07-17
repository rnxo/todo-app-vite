import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from '../src/components/TaskForm';
import { useTodoDispatch } from '../src/context/useTodoContext';

vi.mock('../src/context/useTodoContext', () => ({
    useTodoDispatch: vi.fn(),
}));

describe('TaskForm', () => {
    const mockDispatch = vi.fn();
    const task = { id: 1, content: 'Original Task' };

    beforeEach(() => {
        mockDispatch.mockClear();
        useTodoDispatch.mockReturnValue(mockDispatch);
    });

    it('editContentの初期値が入力欄に表示される', () => {
        render(<TaskForm task={task} editContent="Original Task" />);

        expect(screen.getByRole('textbox')).toHaveValue('Original Task');
    });

    it('入力値を変更すると表示も更新される', async () => {
        const user = userEvent.setup();
        render(<TaskForm task={task} editContent="Original Task" />);
        const input = screen.getByRole('textbox');

        await user.clear(input);
        await user.type(input, 'Updated Task');

        expect(input).toHaveValue('Updated Task');
    });

    it('フォーム送信時にTASK_EDITEDアクションがdispatchされる', async () => {
        const user = userEvent.setup();
        render(<TaskForm task={task} editContent="Original Task" />);
        const input = screen.getByRole('textbox');

        await user.clear(input);
        await user.type(input, 'Updated Task{Enter}');

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'TASK_EDITED',
            payload: { id: 1, content: 'Updated Task' },
        });
    });
});
