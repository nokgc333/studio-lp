# studio-lp

型チェック、単体テスト、E2Eテスト、CI/CDを備えた、モダンなTypeScript構成のLP。

【目的】

- **技術検証**:

型チェック、単体テスト、E2Eテスト、CI/CDを組み合わせ、品質を自動で検証できる開発環境を整える。

## 技術スタック

| 分野           | 使用ツール                  |
| -------------- | --------------------------- |
| フレームワーク | Next.js (App Router), React |
| 言語           | TypeScript                  |
| スタイリング   | Tailwind CSS v4             |
| 単体テスト     | Vitest, Testing Library     |
| CI/CD          | GitHub Actions, Vercel      |
| 品質管理       | ESLint, Prettier            |

## セットアップ

必要なもの: Node.js 24, npm

```bash
npm ci
npm run dev
```

起動後、<http://localhost:3000>を開く。
3000番が使用中の場合は、別ポートが自動で選ばれる。

## スクリプト一覧

| コマンド                | 内容                                                 |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | 開発サーバーを起動                                   |
| `npm run build`         | 本番用ビルドを作成                                   |
| `npm run start`         | 本番用ビルドを起動                                   |
| `npm run check`         | lint、型チェック、整形確認、単体テストをまとめて実行 |
| `npm run lint`          | ESLintを実行                                         |
| `npm run typecheck`     | ルートの型を生成し、TypeScriptの型チェックを実行     |
| `npm run format`        | Prettierで全ファイルを整形                           |
| `npm run format:check`  | ファイルを変更せず、整形済みかを確認                 |
| `npm run test`          | 単体テストを1回実行                                  |
| `npm run test:watch`    | 単体テストを監視モードで実行                         |
| `npm run test:coverage` | 単体テストをカバレッジ付きで実行                     |

## 環境変数

現時点で必須のものはない。
必要とする機能を追加するとき（問い合わせフォームなど）に随時記載。

## 注意事項

- 文言と画像は仮のもので、今後変更予定。
- CIでは、lint、型チェック、整形確認、単体テスト、ビルドを実行する。
