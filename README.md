# react-tutorial
改めてreactを学ぶついでにtypescirptもやってみる

# Let's start
## 環境構築
- フレームワーク
    - [ ] Next.js
        - Reactアプリケーションのためのフルスタックフレームワーク
        - パフォーマンス改善
    - [ ] Expo
        - モバイル向けReact Nativeのためのフレームワーク
        - 端末のカメラ、位置情報などのモジュールにアクセスするAPIが豊富
    - [x] Vite <= 今回使用するのはこちら！
        - フロントエンドの高速開発
## Vite環境の構築
- 参考
    - [viteでReact×TypeScript環境を爆速で作る最小版](https://qiita.com/teradonburi/items/fcdd900adb069811bfda)
- 前提
    - node.js, npmが入っていること
- Viteプロジェクトの作成
```bash
$ npm create vite@latest
```
- フレームワーク(React)と言語(Typescript + SWC)を選ぶ
- ホットリロードの設定(windows)
    - [Vite でいいじゃん！ React の開発環境](https://note.com/kaisokaiso/n/nb3109f23fb5d)
- 以上

## Todoリスト作った (`/todolist`)
- 参考動画
    - [(Youtube) Todoリストを作りながらTypescriptとReactを触ってみよう \~Typescript入門~](https://www.youtube.com/watch?v=ANcopd8Bmao&t=1s)
- 学び
    - `React.FC`は関数コンポーネントの型定義のための型。コンポーネントがどのような引数 propsを受け取るかを定義。
    - `e.preventDefault()`フォーム送信時にページがリロードされるのを防ぐ。これがないとユーザーの操作したデータが消えちゃう。
    - tsにおける整数型は`number`。`int`使えない。
    - `types.ts`みたいなファイルを作ってその中に`export type hogehoge = {...}`とやって型を定義する。そのファイルを`import`すると自分の定義した型がいろんなファイルで使える
    - powershellから起動したwslでプロジェクトのディレクトリ名変更できない。ファイルマネージャーからやったれ。管理者権限でpowershell実行すればいけるかも。

## 三目並べ作る (`/tic-tac-toe`)
- 参考サイト
    - [React公式 チュートリアル：三目並べ](https://ja.react.dev/learn/tutorial-tic-tac-toe)

## Hooksを理解したい