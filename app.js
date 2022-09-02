var request = require('request');
var fs = require('fs');

const { WebClient } = require('@slack/web-api');
const web = new WebClient('bogus token');

apiToken = "ここにトークン"; 
slack = new WebClient(apiToken);

console.log("slack api")
try {
  console.log("get emoji list")
  slack.apiCall("emoji.list").then((response) => {
    console.log("generate emoji")
    for(key in response.emoji) {
      url = response.emoji[key];
      //エイリアスは無視
      if(url.match(/alias/)){
        continue;
      }

      // 取得対象の拡張子
      extention = url.match(/\.[^\.]+$/);

      request
        .get(url)
        .on('response', function (res) {
        })
        .pipe(fs.createWriteStream('image/' + key + extention));
    }
    console.log("Done")
  })
} catch (e) {
  console.log("err call api", e)
}

