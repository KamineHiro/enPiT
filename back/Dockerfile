FROM python:3.11-slim

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# マイグレーション用のコマンドを実行
RUN flask db init && flask db migrate -m "Initial migration" && flask db upgrade

COPY . .

CMD ["flask", "run", "--host=0.0.0.0", "--port=5001", "--reload"]

EXPOSE 5001