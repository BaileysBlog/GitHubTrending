using GitTrendingApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace GitTrendingApi.Utils
{
    public static class RepoUtil
    {

        private static HttpClient Web = new HttpClient();

        static RepoUtil()
        {
            Web.DefaultRequestHeaders.Add("User-Agent", "BaileyMillerSSI");
        }

        public async static Task<Repo> GetRepoAsync(string owner, string repo)
        {
            var result = await Web.GetAsync($"https://api.github.com/repos/{owner}/{repo}");

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<Repo>(content);
            }
            else
            {
                return null;
            }
        }


        public async static Task<ReadMe> GetReadMeAsync(string owner, string repo)
        {
            var result = await Web.GetAsync($"https://api.github.com/repos/{owner}/{repo}/readme");

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();

                var readme = JsonConvert.DeserializeObject<ReadMe>(content);
                readme.Owner = owner;
                readme.Repo = repo;

                return readme;
            }
            else
            {
                return null;
            }
        }

    }
}
