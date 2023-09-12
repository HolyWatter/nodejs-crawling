import axios from "axios";
import * as cheerio from "cheerio";

export const crawling = async (req, res) => {
  const keyword = req.query.keyword;

  const naverShoppingRelKeyword = await axios.get(
    `https://search.shopping.naver.com/search/all?query=${keyword}&cat_id=&frm=NVSHATC`
  );

  res.json({
    relKeyword: crawlNaverRelKeyword(naverShoppingRelKeyword.data),
    autoKeyword: await crawlNaverAutoComplete(keyword),
  });
};

const crawlNaverRelKeyword = (html) => {
  const $ = cheerio.load(html);
  let relKeywordList = [];
  const bodyList = $(".relatedTags_relation_srh__YG9s7 ul li a");
  bodyList.map((i, e) => {
    relKeywordList[i] = {
      id: i,
      keyword: $(e).text(),
    };
  });

  return relKeywordList;
};

const crawlNaverAutoComplete = async (keyword) => {
  const res = await axios.get(
    `https://ac.shopping.naver.com/ac?frm=shopping&q=${keyword}&q_enc=UTF-8&r_cr=111111&r_enc=UTF-8&r_format=json&r_lt=111111&r_unicode=0&st=111111&t_koreng=1`
  );

  const autoCompleteWord = [];

  res.data.items
    .flat(1)
    .map((item) => item[0])
    .flat(2)
    .forEach((item, idx) => {
      autoCompleteWord[idx] = {
        id: idx,
        keyword: item,
      };
    });

  return autoCompleteWord;
};
