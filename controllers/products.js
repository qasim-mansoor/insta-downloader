const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');


async function searchVid(downloadURL){
    const url = "https://fastdl.app/c/";

    // const pattern = /reels?\/(.*?)\//g;

    // const matches = [...downloadURL.matchAll(pattern)];
    // const reelID = matches.map(match => match[1]);
  
    const data = {
        url: downloadURL,
        lang_code: "en",
        token: '',
    };
  
    const dataLength = qs.stringify(data).length.toString();
  
    const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Length': dataLength,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://fastdl.app',
        'Referer': 'https://fastdl.app/',
        'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69',
        'X-Requested-With': 'XMLHttpRequest',
      };
        
    maindata = await axios.post(url, qs.stringify(data), {headers}).then((res) => {
        const x = res.data;
        // const y = x.data;
        // console.log(x);
        // const $ = cheerio.load(x);
        const result = x
        // console.log(result)
        return result;
  
    }).catch((err) => {
      console.log(err); 
    });

    return maindata
}


const getVid = async (req, res) => {
    const payload = req.body; // This will contain the JSON payload sent with the POST request
    // console.log("Received JSON payload:", payload);
    const vid_link = payload.dllink
    // console.log(vid_link)
    
    try {
        let maindata = await searchVid(vid_link)
        // console.log(maindata);
        // console.log(maindata);
        await res.status(200).json({dllink: maindata})
    } catch (error) {
        console.log(error)   
    };
};


module.exports = {getVid};