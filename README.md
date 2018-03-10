# IoT Serverless

## [Serverless](https://serverless.com/) function to receive webhook from Bintray and trigger POST request 

### Steps to deploy Serverless function to AWS
* Install serverless: `npm install serverless -g`
* Login to Serverless: `serverless login`
* Deploy Serverless function to AWS: `serverless deploy`

### Add Webhook on Bintray to call Serverless:
```
curl -X POST \
  https://api.bintray.com/webhooks/$SUB/$REPO/$PACKAGE \
  -u '$USERNAME:$API_KEY' \
  -H 'content-type: application/json' \
  -d '{
  "url": "$SERVERLESS_URL",
  "method": "post"
}'
```