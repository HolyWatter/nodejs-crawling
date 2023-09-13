import axios from "axios";
import * as cheerio from "cheerio";

const getHtml = async () => {
  const res = await axios.get(
    "https://www.coupang.com/np/search?component=&q=물고기&channel=user",
    {
      headers: {
        "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
      },
    }
  );
  return res.data;
};

getHtml().then((res) => {
  let ulList = [];
  const $ = cheerio.load(res);
  const bodyList = $(".search-related-keyword dd a");
  bodyList.map((i, e) => {
    ulList[i] = {
      id: i,
      keyword: $(e).text(),
    };
  });
  console.log(ulList);
});
