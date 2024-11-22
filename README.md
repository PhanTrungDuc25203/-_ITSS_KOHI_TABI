# NIHONGO_ITSS_KOHI_TABI
日本語　アイティエスエスのプロジェクトである　KOHI TABI と　言う。

# hướng dẫn clone dự án base và chạy trên localhost:<số cổng mà mn muốn>
- trước hết, đảm bảo đang sử dụng phiên bản NodeJS 14.18.0. Nếu muốn cài nhiều phiên bản trên cùng một máy thì hãy cài nvm (node version manager) (chi tiết xem trên mạng)
- clone dự án
- tạo DB mysql (Đức sử dụng phpadmin)
- tạo một file .env vói nội dung tương tự file .env.example (copy từ .env.example sang .env) và điền các thông số mà mn dùng để kết nối với DB trên máy của mình theo hướng dẫn sau:
    * PORT: số cổng mà dự án BE chạy (có thể truy cập bằng đường link localhost:<PORT>)
    * NODE_ENV: hãy để là development
    * URL_REACT_SERVER: chưa có dự án FE nên tạm thời không ghi gì ở đây
    * DB_HOST: để là localhost
    * DB_DATABASE_NAME: để là kohitabi (để có tên db này, hãy lên trình quản lý DB của mình và tạo thủ công, chỉ cần tạo DB thôi không cần tạo bảng cho nó vì chương trình sẽ làm sau)
    * DB_USERNAME: để là root
    * DB_PASSWORD: nếu trình quản lý DB của mn đặt mk thì ghi nó vào đây (ghi các ký tự mật khẩu thôi không cần đóng mở ngoặc gì cả)
    * DB_PORT: cổng để mà mysql chạy
    * DB_DIALECT: để là mysql
- khi cài đặt môi trường xong như trên, hãy chạy lệnh npm install để cài đặt những thư viện cần thiết, có một số thư viện báo deprecated cũng không sao, kể cả mức độ là vulnerable
- thêm bảng vào dữ liệu: chạy câu lệnh npx sequelize-cli db:migrate (check CSDL thì mn sẽ thấy bảng user và các trường của nó đã được tạo)
- thêm thử dữ liệu vào bảng user: chạy câu lệnh npx sequelize-cli db:seed:all, refresh lại sẽ thấy CSDL đã được thêm
- chạy câu lệnh npm start để code BE chạy trên cổng <PORT> định nghĩa trong file .env
- truy cập đường link http://localhost:8081/, nếu mọi người thầy dòng chữ "xin chào các bạn mình ở file .ejs" và đoạn dữ liệu mà mn vừa thêm thử hiện trên màn hình thì là kết nối DB và chạy thành công BE



# ローカルホスト（<希望のポート番号>）でBaseプロジェクトをクローンして実行する手順：
- まず、NodeJSバージョン14.18.0を使用していることを確認してください。複数のバージョンをインストールしたい場合は、nvm（Node Version Manager）をインストールしてください（詳細はインターネットで調べてください）。
- プロジェクトをクローンします。
- MySQLデータベースを作成します（ Đức はphpMyAdminを使用）。
- .envというファイルを作成し、.env.exampleの内容をコピーします。そして、以下の指示に従い、自分の環境に合わせて必要な情報を記入します：
    * PORT: バックエンドが動作するポート番号（例: localhost:<PORT>）
    * NODE_ENV: development に設定
    * URL_REACT_SERVER: フロントエンドのプロジェクトがまだないため、ここは空白のままにします。
    * DB_HOST: localhost に設定
    * DB_DATABASE_NAME: kohitabi に設定（この名前のデータベースをデータベース管理ツールで手動で作成してください。テーブル * の作成は必要ありません、プログラムが後で自動的に作成します）
    * DB_USERNAME: root に設定
    * DB_PASSWORD: データベース管理ツールに設定されているパスワードがある場合は、それを記入します（パスワードの文字列のみ記入し、カギ括弧やその他の記号は不要です）。
    * DB_PORT: MySQLが動作しているポート番号を設定
    * DB_DIALECT: mysql に設定
- 上記のように環境を設定した後、必要なライブラリをインストールするために npm install コマンドを実行します。一部のライブラリが非推奨（deprecated）や脆弱性（vulnerable）と警告されても問題ありません。
- データベースにテーブルを追加するために npx sequelize-cli db:migrate コマンドを実行します（データベースを確認すると、user テーブルとそのフィールドが作成されていることが分かります）。
- user テーブルにデータを追加するには、npx sequelize-cli db:seed:all コマンドを実行します。その後、データベースをリフレッシュすると、データが追加されていることが確認できます。
- バックエンドのコードを指定した<PORT>で実行するには、npm start コマンドを実行します。
- ブラウザで http://localhost:8081/ にアクセスします。もし「xin chào các bạn mình ở file .ejs」という文字と、先ほど追加したデータが画面に表示された場合、データベースの接続とバックエンドの実行が成功したことを意味します。
