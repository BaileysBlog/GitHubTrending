using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitTrendingApi.Models
{
    public class MarkdownRequest
    {
        public string text { get; set; }
        public string mode { get; set; }
        public string context { get; set; }
    }
}
