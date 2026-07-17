import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckBox } from '../src/components/CheckBox/CheckBox';
import { useTodoDispatch } from '../src/context/useTodoContext';

vi.mock('../src/context/useTodoContext', () => ({
    useTodoDispatch: vi.fn(),
}));

describe('CheckBox', () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockDispatch.mockClear();
        useTodoDispatch.mockReturnValue(mockDispatch);
    });

    it('task.completedがfalseの場合はチェックが外れている', () => {
        render(<CheckBox task={{ id: 1, completed: false }} />);

        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('task.completedがtrueの場合はチェックが入っている', () => {
        render(<CheckBox task={{ id: 1, completed: true }} />);

        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('クリック時にTASK_COMPLETEアクションが対象のidでdispatchされる', async () => {
        const user = userEvent.setup();
        render(<CheckBox task={{ id: 42, completed: false }} />);

        await user.click(screen.getByRole('checkbox'));

        expect(mockDispatch).toHaveBeenCalledWith({ type: 'TASK_COMPLETE', id: 42 });
    });
});
