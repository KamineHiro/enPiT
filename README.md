# 構造説明
- back：バックエンド(Flask)
- front：フロントエンド(React)

## 実行手順 (Docker)

### 1. DockerとDocker Composeのインストール
   Dockerがインストールされていない場合は、公式サイトからインストールしてください。

### 2. Dockerコンテナのビルドと起動

   `docker-compose.yml`がプロジェクトに含まれているので、以下のコマンドでコンテナのビルドと起動が行えます。

   ```bash
   docker-compose up --build

