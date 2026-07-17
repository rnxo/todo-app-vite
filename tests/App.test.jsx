import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('App (結合テスト: 実際のTodoProviderを使用)', () => {
    it('初期表示で3件のメインタスクが表示される', () => {
        render(<App />);

        expect(screen.getByText('MainTask1')).toBeInTheDocument();
        expect(screen.getByText('メインタスク２')).toBeInTheDocument();
        expect(screen.getByText('make your day productively')).toBeInTheDocument();
    });

    it('チェックボックスをクリックすると完了状態がトグルされる', async () => {
        const user = userEvent.setup();
        render(<App />);
        const taskItem = screen.getByText('make your day productively').closest('div');
        const checkbox = within(taskItem).getByRole('checkbox');

        expect(checkbox).not.toBeChecked();
        await user.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('EDIT→内容変更→Enterで保存すると表示内容が更新される', async () => {
        const user = userEvent.setup();
        render(<App />);
        const taskItem = screen.getByText('make your day productively').closest('div');

        await user.click(within(taskItem).getByRole('button', { name: 'EDIT' }));
        const input = within(taskItem).getByRole('textbox');
        await user.clear(input);
        await user.type(input, 'Updated Task{Enter}');

        expect(within(taskItem).getByText('Updated Task')).toBeInTheDocument();
        expect(within(taskItem).getByRole('button', { name: 'EDIT' })).toBeInTheDocument();
    });

    it('DELボタンをクリックするとタスクが削除される', async () => {
        const user = userEvent.setup();
        render(<App />);
        const taskItem = screen.getByText('make your day productively').closest('div');

        await user.click(within(taskItem).getByRole('button', { name: 'DEL' }));

        expect(screen.queryByText('make your day productively')).not.toBeInTheDocument();
    });

    it('Show/Hide Subtasksボタンでサブタスクの表示・非表示が切り替わる', async () => {
        const user = userEvent.setup();
        render(<App />);
        const taskItem = screen.getByText('make your day productively').closest('div');
        const taskContainer = taskItem.parentElement;

        expect(within(taskContainer).queryByText('task in task')).not.toBeInTheDocument();

        await user.click(within(taskContainer).getByRole('button', { name: 'Show subtasks' }));
        expect(within(taskContainer).getByText('task in task')).toBeInTheDocument();

        await user.click(within(taskContainer).getByRole('button', { name: 'Hide subtasks' }));
        expect(within(taskContainer).queryByText('task in task')).not.toBeInTheDocument();
    });

    it('Formから新しいメインタスクを追加すると一覧に反映される', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.type(screen.getByPlaceholderText('Create a main task...'), 'Brand New Task');
        await user.click(screen.getByRole('button', { name: 'Add Task' }));

        expect(screen.getByText('Brand New Task')).toBeInTheDocument();
    });
});
