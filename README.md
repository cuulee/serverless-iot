# IoT Serverless

## Serverless function to receive webhook from Bintray and trigger POST request 

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