using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitTrendingApi.Models
{
    public class ReadMeResponse
    {
        public string Owner { get; set; }
        public string Repo { get; set; }
        public string Content { get; set; }
        public ReadMeFormat Format { get; set; } = ReadMeFormat.Markdown;

        public string download_url
        {
            get
            {
                return $"http://localhost:9832/api/repo/readme/download?Owner={Owner}&Repo={Repo}&format=";
            }
        }
    }

    public enum ReadMeFormat
    {
        Markdown = 0,
        Html = 1
    }
}
