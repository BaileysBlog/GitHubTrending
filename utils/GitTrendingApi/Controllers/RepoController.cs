using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using GitTrendingApi.Models;
using GitTrendingApi.Utils;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GitTrendingApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Repo")]
    public class RepoController : Controller
    {

        [Route("Search")]
        public async Task<object> SearchRepo([FromRoute]string Owner, [FromRoute]string Repo)
        {

            return null;
        }

        [Route("Trending")]
        public async Task<IEnumerable<TrendingRepo>> GetTrending([FromQuery]string Period = "daily", [FromQuery]string Language = "")
        {
            List<TrendingRepo> Repos = new List<TrendingRepo>();
            using (var web = new HttpClient())
            {
                
                var result = await web.GetAsync(TrendingReposUtil.GetUrl(Period, Language));

                if (result.IsSuccessStatusCode)
                {
                    var htmlData = await result.Content.ReadAsStringAsync();
                    var doc = new HtmlDocument();
                    doc.LoadHtml(htmlData);

                    var baseRepos = doc.DocumentNode.Descendants().Where(x => x.Name == "ol").Select(x => x.ChildNodes).First().Where(x => x.Name == "li").Select(x => x);

                    foreach (HtmlNode repo in baseRepos)
                    {
                        var tempTrendingRepo = new TrendingRepo();
                        var childDivs = repo.ChildNodes.Where(x => x.Name == "div").Where(x => x.HasAttributes).Where(x => x.GetAttributeValue("class", "") != "float-right");


                        var repoOwnerData = childDivs.ElementAt(0).ChildNodes.Where(x => x.Name == "h3").First().ChildNodes.Where(x => x.Name == "a").First().ChildNodes;

                        tempTrendingRepo.RepoOwner = TrendingReposUtil.GetRepoOwner(repoOwnerData);
                        tempTrendingRepo.RepoTitle = TrendingReposUtil.GetRepoTitle(repoOwnerData);


                        tempTrendingRepo.RepoDescription = TrendingReposUtil.GetRepoDescription(childDivs.ElementAt(1));

                        tempTrendingRepo.Language = TrendingReposUtil.GetRepoLanguage(childDivs.ElementAt(2));

                        

                        tempTrendingRepo.Stars = TrendingReposUtil.GetRepoStars(childDivs.ElementAt(2));
                        tempTrendingRepo.Forks = TrendingReposUtil.GetRepoForks(childDivs.ElementAt(2));
                        tempTrendingRepo.StarsToday = TrendingReposUtil.GetRepoStarsToday(childDivs.ElementAt(2));
                        Repos.Add(tempTrendingRepo);
                    }
                }
            }

            return Repos.OrderByDescending(x=>x.StarsToday);
        }

        
    }
}