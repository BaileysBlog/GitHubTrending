using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitTrendingApi.Models
{
    public class ReadMeResponse
    {
        public string Content { get; set; }
        public ReadMeFormat Format { get; set; } = ReadMeFormat.Markdown;
    }

    public enum ReadMeFormat
    {
        Markdown = 0,
        Html = 1
    }
}
