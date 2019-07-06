# how to add photos

- 写真のサムネイルを書き出し
  - 長辺が600px
- 写真をアップロード
  - https://console.cloud.google.com/storage/browser/phantomtype-180814.appspot.com/photos/?project=phantomtype-180814&authuser=1&folder=true&hl=JA&organizationId=149863457491
  - `{bucket}/{city_name}/{place_name}`
- 本番環境から/prepareにアクセスしてexifを作成
  - https://console.cloud.google.com/datastore/entities;kind=Photo;ns=__$DEFAULT$__/query/kind?authuser=1&folder=true&hl=JA&organizationId=149863457491&project=phantomtype-180814
  - `{bucket}/{city_name}/{place_name}`
- index.jsにコード追加
- `npm run dev` でローカルサーバ起動
  - localhost:3000 で確認
- `npm run build` & `npm run exports`
- `npm run gcloud`  
