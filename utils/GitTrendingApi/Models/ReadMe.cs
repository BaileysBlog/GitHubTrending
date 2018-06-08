using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace GitTrendingApi.Models
{
    public class ReadMe
    {

        static HttpClient Web = new HttpClient();

        static ReadMe()
        {
            Web.DefaultRequestHeaders.Add("User-Agent", "BaileyMillerSSI");
        }

        public int size { get; set; }
        public String name { get; set; }
        public string path { get; set; }
        public string download_url { get; set; }

        public string Owner { get; set; }
        public string Repo { get; set; }


        public String content { get; set; }

        public String GetContent()
        {
            return Encoding.UTF8.GetString(Convert.FromBase64String(content));
        }

        public async Task<String> GetHtmlAsync()
        {
            var content = new StringContent(JsonConvert.SerializeObject(new MarkdownRequest()
            {
                text = GetContent(),
                mode = "gfm",
                context = $"{Owner}/{Repo}"
            }), Encoding.UTF8, "application/json");

            var data = await Web.PostAsync("https://api.github.com/markdown", content);

            if (data.IsSuccessStatusCode)
            {
                return await data.Content.ReadAsStringAsync();
            }
            else
            {
                return String.Empty;
            }
        }
    }
}
