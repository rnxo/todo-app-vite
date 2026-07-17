# Todo App

Udemyを用いてWeb開発を学習後のアウトプットとして開発した。
React + Vite で構築したタスク管理アプリです。メインタスクとサブタスクの階層構造を持ち、直感的な操作でタスクの追加・編集・管理ができます。
URL[https://todo-app-vite-chi.vercel.app/]

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| メインタスク追加 | フォームからタスク名を入力して追加 |
| サブタスク追加 | 親タスクを選択してサブタスクを追加 |
| インライン編集 | EDIT ボタンでその場でタスク名を編集・保存 |
| サブタスク表示切替 | トグルボタンでサブタスク一覧を折りたたみ表示 |
| チェックボックス | タスクの完了状態をチェックで管理 |

---

## 使用技術

| カテゴリ | 技術 |
|----------|------|
| フレームワーク | React 18 |
| ビルドツール | Vite 6 |
| 状態管理 | React Context API + useReducer |
| スタイリング | CSS Modules / Tailwind CSS v4 |
| 型チェック | PropTypes |
| Lint | ESLint (eslint-plugin-react-hooks) |

---

## セットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd todo-vite-app

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:5173` を開くと動作確認できます。

```bash
# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

---

## ディレクトリ構成

```
src/
├── App.jsx                    # ルートコンポーネント
├── main.jsx                   # エントリポイント
├── context/
│   ├── TodoProvider.jsx       # グローバルな状態管理（Context + Reducer）
│   └── useTodoContext.jsx     # Context を扱うカスタムフック
└── components/
    ├── Form/
    │   └── Form.jsx           # タスク追加フォーム（メイン・サブ切替）
    ├── TaskList.jsx            # タスク一覧
    └── Task/
        ├── Task.jsx            # タスク単体（メイン + サブ）
        ├── MainTask.jsx        # メインタスク表示
        ├── SubTask.jsx         # サブタスク一覧表示
        ├── TaskItem.jsx        # タスク1件（チェック・編集・削除）
        ├── SubDispButton.jsx   # サブタスク表示切替ボタン
        └── Task.module.css
```

---

## 設計のポイント

### Context API + useReducer による状態管理

Redux を使わず、React 標準の `useReducer` と `Context API` を組み合わせてグローバルな状態管理を実装しました。状態（`TodoContext`）と dispatch（`TodoDispatchContext`）を分割して提供することで、不要な再レンダリングを抑制しています。

```jsx
// 状態と dispatch を分けて Context を作成
const TodoContext = createContext();
const TodoDispatchContext = createContext();
```

### 再帰的なタスク更新

メインタスクとサブタスクが同一の Reducer で管理されており、ツリー構造に対して再帰的な更新処理を実装しています。

```js
const updateTaskRecursively = (taskList, targetId, updateFunc) => {
    return taskList.map(task => {
        if (task.id === targetId) return updateFunc(task);
        if (task.children?.length > 0) {
            return { ...task, children: updateTaskRecursively(task.children, targetId, updateFunc) };
        }
        return task;
    });
};
```

### コンポーネントの責務分離

`Task → MainTask → TaskItem` という階層でコンポーネントを分割し、それぞれの責務を明確にしています。`children` props を活用してサブタスクの表示制御をコンポーネント間で受け渡しています。

### カスタムフックによるロジックの集約

Context へのアクセスを `useTodoState` / `useTodoDispatch` というカスタムフックに集約し、コンポーネントから Context の実装詳細を隠蔽しています。

---

## こだわった点

- **Context の分割**: 状態と dispatch を別 Context に分けることで、dispatch のみ使うコンポーネントが状態変化で再レンダリングされないよう配慮しました。
- **Reducer の純粋性**: `taskReducer` はすべて純粋関数として実装し、副作用を一切持たせていません。
- **コンポーネント粒度**: 単一責任の原則に沿い、1コンポーネントが持つ役割を最小限に絞りました。
- **PropTypes による型安全**: TypeScript を使わずとも PropTypes で props の型を明示し、開発時の誤使用を防いでいます。
