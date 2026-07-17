import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from '../src/components/Task/TaskItem';
import { useTodoDispatch } from '../src/context/useTodoContext';

vi.mock('../src/context/useTodoContext', () => ({
    useTodoDispatch: vi.fn(),
}));

describe('TaskItem', () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        useTodoDispatch.mockReturnValue(mockDispatch);
    });

    const task = { id: 1, content: 'Task Content', edit: false, completed: false };

    it('edit=falseの場合はcontentがテキストとして表示される', () => {
        render(<TaskItem task={task}>{null}</TaskItem>);

        expect(screen.getByText('Task Content')).toBeInTheDocument();
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'EDIT' })).toBeInTheDocument();
    });

    it('edit=trueの場合はTaskFormの入力欄が表示される', () => {
        render(<TaskItem task={{ ...task, edit: true }}>{null}</TaskItem>);

        expect(screen.getByRole('textbox')).toHaveValue('Task Content');
        expect(screen.queryByText('Task Content', { selector: 'span' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'SAVE' })).toBeInTheDocument();
    });

    it('EDIT/SAVEボタン押下でTOGGLE_EDIT_MODEアクションがdispatchされる', async () => {
        const user = userEvent.setup();
        render(<TaskItem task={task}>{null}</TaskItem>);

        await user.click(screen.getByRole('button', { name: 'EDIT' }));

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'TOGGLE_EDIT_MODE', id: 1 });
    });

    it('DELボタン押下でTASK_DELETEアクションがdispatchされる', async () => {
        const user = userEvent.setup();
        render(<TaskItem task={task}>{null}</TaskItem>);

        await user.click(screen.getByRole('button', { name: 'DEL' }));

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'TASK_DELETE', id: 1 });
    });

    it('childrenとして渡した要素が描画される', () => {
        render(
            <TaskItem task={task}>
                <span>child content</span>
            </TaskItem>
        );

        expect(screen.getByText('child content')).toBeInTheDocument();
    });
});
