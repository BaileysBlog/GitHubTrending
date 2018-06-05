using HtmlAgilityPack;
using System;
using System.Linq;
using System.Net;

namespace GitTrendingApi.Utils
{
    public static class TrendingReposUtil
    {


        public static int GetRepoStarsToday(HtmlNode Parent)
        {
            try
            {
                return int.Parse(Parent.Descendants()
                    .Where(x => x.Name == "span")
                    .Where(x => x.HasChildNodes)
                    .Where(x => x.HasAttributes)
                    .Where(x => x.GetAttributeValue("class", "") == "d-inline-block float-sm-right")
                    .Select(x => x)
                    .First()
                    .ChildNodes
                    .Where(x => x.Name == "#text")
                    .Where(x => x.InnerHtml.Trim() != "")
                    .Select(x => x.InnerHtml.Replace("stars today", "").Replace(",", "").Trim())
                    .First());
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public static int GetRepoForks(HtmlNode Parent)
        {
            try
            {
                return int.Parse(Parent.Descendants().Where(x => x.Name == "a").Where(x => x.HasAttributes).Where(x => x.GetAttributeValue("href", "").Contains("network")).Select(x => x).First().ChildNodes.Where(x => x.Name == "#text").Where(x => x.InnerHtml.Trim() != "").Select(x => x.InnerHtml.Trim().Replace(",", "")).First());
            }
            catch (Exception)
            {
                return 0;
            }

        }

        public static int GetRepoStars(HtmlNode Parent)
        {
            try
            {
                return int.Parse(Parent.Descendants().Where(x => x.Name == "a").Where(x => x.HasAttributes).Where(x => x.GetAttributeValue("href", "").Contains("stargazers")).Select(x => x).First().ChildNodes.Where(x => x.Name == "#text").Where(x => x.InnerHtml.Trim() != "").Select(x => x.InnerHtml.Trim().Replace(",", "")).First());
            }
            catch (Exception)
            {
                return 0;
            }

        }

        public static String GetRepoLanguage(HtmlNode Parent)
        {
            try
            {
                return Parent.Descendants().Where(x => x.Name == "span").Where(x => x.HasAttributes).Where(x => x.GetAttributeValue("itemprop", "") == "programmingLanguage").Select(x => x.InnerHtml.Trim()).First();
            }
            catch (Exception)
            {
                return String.Empty;
            }

        }

        public static String GetRepoDescription(HtmlNode Parent)
        {
            try
            {
                return Parent.ChildNodes.Where(x => x.Name == "p").Select(x => x.InnerText.Trim()).First();
            }
            catch (Exception)
            {
                return String.Empty;
            }
        }

        public static String GetRepoTitle(HtmlNodeCollection Divs)
        {
            return Divs.Where(x => x.Name == "#text").Where(x => x.InnerHtml.Trim() != "").Select(x => x.InnerText.Trim()).First();
        }

        public static String GetRepoOwner(HtmlNodeCollection Divs)
        {
            return Divs.Where(x => x.Name == "span").Select(x => x.InnerText.Replace("/", "").Trim()).First();
        }

        public static String GetUrl(String Period, String Language)
        {
            return $"https://github.com/trending/{WebUtility.UrlEncode(Language)}?since={Period}";
        }

    }
}
