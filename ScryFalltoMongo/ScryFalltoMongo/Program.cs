using System;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace ReadScryFall
{
    class Program
    {
        static void Main(string[] args)
        {
            var getter = "https://api.scryfall.com/cards?page=1";

            MongoClient mongoclient = new MongoClient("mongodb://localhost:27017");
            var database = mongoclient.GetDatabase("MtgApp");
            var collection = database.GetCollection<card>("Cards");

            while (!string.IsNullOrEmpty(getter))
            {
                var request = (HttpWebRequest)WebRequest.Create(getter);

                //create the requests
                request.Method = "GET";
                var response = (HttpWebResponse)request.GetResponse();
                string content = string.Empty;

                using (var stream = response.GetResponseStream())
                {
                    using (var sr = new StreamReader(stream))
                    {
                        content = sr.ReadToEnd();
                    }
                    //All the data to Json
                    JToken nextpage = JObject.Parse(content)["next_page"];
                    JToken data = JObject.Parse(content)["data"];

                    foreach (JToken card in data.Children())
                    {
                        //For Inital Debugging
                        //Console.WriteLine(card["name"]);
                        //Console.WriteLine(card["image_uris"]);
                        //Console.WriteLine(card["cmc"]);
                        //Console.WriteLine(card["colors"]);
                        //Console.WriteLine(card["legalities"]);
                        //Console.WriteLine("\n\n");
                        collection.InsertOneAsync(new card
                        {
                            Name = card["name"]?.ToString(),
                            Images = card["image_uris"]?.ToString(),
                            Cmc = card["cmc"]?.ToString(),
                            Colors = card["colors"]?.ToString(),
                            Legalities = card["legalities"]?.ToString()
                        });
                    }

                    //Console.WriteLine(nextpage);
                    getter = nextpage.ToString().Replace("\"", "");
                }
            }

            Console.Read();
        }
    }
}

//represent the Json as C# code
public class card
{
    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("images")]
    public string Images { get; set; }

    [BsonElement("cmc")]
    public string Cmc { get; set; }

    [BsonElement("colors")]
    public string Colors { get; set; }

    [BsonElement("legalities")]
    public string Legalities { get; set; }
}

