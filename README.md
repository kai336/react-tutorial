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
- Viteプロジェクトの作成&パッケージインストール
```bash
npm create vite@latest
npm install
npm install @types/react @types/react-dom
```
- フレームワーク(React)と言語(Typescript + SWC)を選ぶ
- ホットリロードの設定(windows)
    - [Vite でいいじゃん！ React の開発環境](https://note.com/kaisokaiso/n/nb3109f23fb5d)
- 起動
```bash
cd your-project
npm run dev
```
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
- 学び
    - `return`するhtmlは１つのタグで囲まれている必要がある
    - `export default`でこのファイルのメイン関数として外部からアクセスできる
    - `typescript`で型を明示して関数を書く方法
        
        ```typescript
        // function
        function Func(arg1: type1, arg2: type2, ...): returnType {
            // processing data
            return hogehoge;
        }
        // アロー関数
        const allowFunc: (arg1: type1, arg2: type2, ...) => returnType = (arg1, arg2, ...) => {
            //processing data
            return hogehoge;
        };
        ```
    - `typescript`で型を明示してReactコンポーネントを書く方法
        ```typescript
        type: AllowFuncProps = {
            arg1: type1;
            arg2: type2;
            .
            .
            .
        };
        // functionの場合
        function ComponentFunc({arg1, arg2, ...}: AllowFuncProps): JSX.Element {
            // processing data
            return (
                <>hogehoge</>
            );
        }
        // アロー関数の場合
        const ComponentAllowFunc: React.FC<allowFuncProps> = ({ arg1, arg2, ...}) => {
            // processing data
            return (
                <>hogehoge</>
            );
        }  
        ```
    - [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ja&utm_source=ext_sidebar)
        - chromeの拡張機能
        - ローカルで動いてるreact appのコンポーネントの様子を見ることができる
    - 子コンポーネントが持つデータは親の`state`で管理しておいたほうがいい
        - リフトアップと呼ぶ
        - propsでもろもろのデータを子に与える
    - `variable = condition? trueの時の値 : falseの時の値`
    - `useState`のsetなんちゃらみたいな状態更新は非同期で行われるので、更新した後の値をすぐ使おうとすると前の値のままになってバグった。
        - 次のレンダー以降に`useState`が返す値にのみ影響を与える
        - https://ja.react.dev/reference/react/useState
    - 配列を結合したいとき
        ```typescript
        const array1: number[];
        const array2: number[];
        const combinedArray: number[] = [...array1, ...array2];
        ```
        - スプレッド構文
### 最強の敵を実装する `/src/Enemy.tsx`
- 敵は後攻
- 真ん中が空いてたらそこに打つ
- 相手のリーチを検出したところに打つ
- めんどくさかったバグ
    - `useState`, `useEffect`絡みのバグ
        - ２回目以降のプレイにおいて結果表示モーダルがでてこない
        - ゲームの結果を格納する`result`という`useState`変数の変更に応じて`useEffect`でモーダルを開いていた。ゲームのリセット時に`result`を初期化(`=null`)しておらず結果が同じ場合変数の中身が変わっていなかった。そのためモーダルを開く`useEffect`が走らなかった。
    - `var: number | null`という変数があるとき`if (var)`で、`null`だけをはじこうとしたけど`var=0`のときもはじかれてしまう
    
- 最弱の敵を実装する
    - 打つべきところに打たない
        - 真ん中打たない
        - リーチに打たない
        - 角に打たない

## `tic-tac-toe`をfirebaseでデプロイしてみる
- 参考サイト
    - [Firebaseでデプロイしよう！](https://qiita.com/hiroki-harada/items/ca22ac177db68e3c3796)
    - [Firebaseの機能](https://note.com/techbits/n/n94c2baf41195)
    - chatgpt
- ブラウザからFirebaseのプロジェクト作成
    - https://firebase.google.com/?hl=ja
- `/tic-tac-toe`に移動して
    ```bash
    npm install -g firebase-tools
    ```
- Firebaseログイン
    ```bash
    firebase login
    ```
    - ブラウザが開くのでgoogleアカウントを選んでログイン
- 初期設定
    ```bash
    firebase init
    ```
    >ウェブサイトやウェブアプリをホスティングしたい場合は、「Hosting」を選択します。

    >リアルタイムデータ同期が必要な場合は、「Realtime Database」を選択します。

    >大規模なデータセットや複雑なクエリを扱うアプリを開発する場合は、「Firestore」が適しています。

    >ユーザーがアップロードするメディアファイルを扱う場合は、「Storage」を選択します。

    >バックエンドロジックやAPIを実装する必要がある場合は、「Functions」を選択します。

    >ローカルでの開発やテストを行いたい場合は、「Emulators」を選択します。

    >GitHub Actionsを通じて自動デプロイを設定したい場合は、「Hosting: Set up GitHub Action deploys」を選択します。

    - 今回はバックエンドがいらないのでHostingを選ぶ


    ```bash
    npm run build
    ```
    - 作ったreactアプリケーションをコンパイルし、本番環境向けにコンパクトにする
    - 使ってない変数があるとエラーになる
        ```bash
        src/Square.tsx:2:10 - error TS6133: 'ChakraProvider' is declared but its value is never read.

        2 import { ChakraProvider, Box, VStack, Heading, Button, Grid, useColorModeValue } from '@chakra-ui/react';
        ```
    - コードの汚さに気づく
        - prettier, eslintでコードフォーマット
        - https://qiita.com/mzmz__02/items/12d198b696efa8b29bda
        - https://qiita.com/mzmz__02/items/63f2624e00c02be2f942
- Firebase Hostingにデプロイ
    ```bash
    firebase deploy
    ```
    


## Hooksを理解したい
