# get-gmail-to-spreadsheet
## Summary
Gmailを取得し、Spreadsheetに転機するコードサンプル。
トリガーはGASにて、時間毎に発動されることを想定。

## 環境構築
ClaspとTypeScriptにて、SpreadSheetに紐づくGASとして作成。
ClaspとTypeScriptの開発環境構築手順は下記。

下記コマンドでnpmパッケージをインストールする。

```
npm init -y
npm install -D @google/clasp
npm install -D @types/google-apps-script
```
下記コマンドでGoogleにログインします。
```
clasp login
```
ターミナルにリンクが表示されるので、⌘を押しながらクリックしリンクに飛び、Googleの認証画面が表示されるので許可をする。
続いて、rootパスで下記名前でディレクトリを生成。 このディレクトリ内に開発用のファイルを作成する。
```
mkdir apps-script
```

`npm init`した際に`packege.json`ができているので開き、　`script`に下記コードを追加し、claspコマンドが使えるようにする。
例えば、ログインした場合のコマンドは、`npm run glogin`というように`npm run`を先頭につける。
```
    "glogin": "clasp login",                                                   // googleへのログイン（ログインが切れた場合もこのコマンド）
    "glogout": "clasp logout",　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　        // ログアウト
    "gcreate": "clasp create --title 'ファイル名を入力' --rootDir ./apps-script", // 最初のファイルを作成するコマンド
    "gclone": "clasp clone xxxxxxx --rootDir ./apps-script",                  // 既存のGASをcloneするコマンド xxxxxxのところにscript IDを貼る
    "gpull": "clasp pull",　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　       // 紐づくGASからlocalにpullする
    "gpush": "clasp push",                                                    // 紐づくGASにpushする
    "gstart": "clasp push --watch"                                            // localファイルが保存されたら、自動で紐づくGASもpushする
  },
```
初回、ファイルを最初につくる場合、`npm run gcrete`のコマンドを打つ。2つ目以降はtouchやエディターからでOK。
選択肢が表示れるので、目的に応じたものをカーソルで選択。 例えば、SpreadSheetに紐づくGASを作成したい場合はsheetを選択。（ReactなどでWebアプリを作成した場合はwebappを選択）
```
standalone
docs
sheets
slides
forms
webapp
api
```
`apps-script`ディレクトリの中に`.clasp.json`が作成されているので、root直下に移動。
