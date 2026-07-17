import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../src/ErrorBoundary';

function ThrowingComponent() {
    throw new Error('Test Error');
}

describe('ErrorBoundary', () => {
    beforeEach(() => {
        // Reactが例外をconsole.errorに出力するため、テスト出力を汚さないよう抑制する
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('エラーが発生しない場合はchildrenをそのまま表示する', () => {
        render(
            <ErrorBoundary>
                <span>Normal Content</span>
            </ErrorBoundary>
        );

        expect(screen.getByText('Normal Content')).toBeInTheDocument();
    });

    it('子要素で例外が発生した場合はフォールバックUIを表示する', () => {
        render(
            <ErrorBoundary>
                <ThrowingComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText('アプリでエラーが発生しました')).toBeInTheDocument();
        expect(screen.getByText(/Test Error/)).toBeInTheDocument();
        expect(screen.queryByText('Normal Content')).not.toBeInTheDocument();
    });
});
