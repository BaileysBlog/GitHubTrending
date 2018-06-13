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
            Web.DefaultRequestHeaders.Add("User-Agent", Program.UserAgent);
        }

        public async static Task<Repo> GetRepoAsync(string owner, string repo)
        {
            var result = await Web.GetAsync($"https://api.github.com/repos/{owner}/{repo}" + GetAuthQuery());

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

        public static String GetAuthQuery()
        {
            return $"?client_id={Program.ClientId}&client_secret={Program.ClientSecret}";
        }

        public async static Task<ReadMe> GetReadMeAsync(string owner, string repo)
        {
            var result = await Web.GetAsync($"https://api.github.com/repos/{owner}/{repo}/readme"+GetAuthQuery());

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
