using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitTrendingApi.Models
{
    public class TrendingRepo
    {
        public String RepoOwner { get; set; }
        public String RepoTitle { get; set; }

        public String RepoDescription { get; set; }

        public String Language { get; set; }

        public int StarsToday { get; set; }
        public int Stars { get; set; }
        public int Forks { get; set; }
    }
}
