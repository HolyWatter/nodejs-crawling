import axios from "axios";
import * as cheerio from "cheerio";

const getHtml = async () => {
  const res = await axios.get("");
  return res.data;
};

getHtml().then((res) => {
  console.log(res.items);
  // let ulList = [];
  // const $ = cheerio.load(res);
  // const bodyList = $("._autoComplete_basis_result_1cDj8 div ul li a");
  // console.log(bodyList);
  // bodyList.map((i, e) => {
  //   ulList[i] = {
  //     id: i,
  //     keyword: $(e).text(),
  //   };
  // });
  // console.log(ulList);
});
