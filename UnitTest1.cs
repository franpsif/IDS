using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ClassLibrary4;
using System.Net.Http;
using System.Web.Helpers;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Class1 class1 = new Class1();

            System.Threading.Tasks.Task<HttpResponseMessage> response = class1.CallServerAsync("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlBQNHJnN25uejh0OVdxX0lXRi1ORHd4eWM1TSIsImtpZCI6IlBQNHJnN25uejh0OVdxX0lXRi1ORHd4eWM1TSJ9.eyJpc3MiOiJodHRwczovL3U0aWRzLXNhbmRib3gudTRwcC5jb20vaWRlbnRpdHkiLCJhdWQiOiJodHRwczovL3U0aWRzLXNhbmRib3gudTRwcC5jb20vaWRlbnRpdHkvcmVzb3VyY2VzIiwiZXhwIjoxNDkzMTk2MjA4LCJuYmYiOjE0OTMxOTI2MDgsImNsaWVudF9pZCI6ImluZm9ybWF0aW9uLWJyb3dzZXIiLCJzY29wZSI6WyJvcGVuaWQiLCJwcmV2ZXJvZW1haWxzY29wZSJdLCJzdWIiOiJfcXIzd1FTS25salNkSS1KV244amRRUkQ5eFd3cmdLY0FldHFvVURCSVNzIiwiYXV0aF90aW1lIjoxNDkzMTkyNjA4LCJpZHAiOiJvcGVuaWRjb25uZWN0IiwidGVuYW50IjoicHJhZXRvcmlhbnMiLCJ1bml0NF9pZCI6Ik1hcmEiLCJhbXIiOlsiZXh0ZXJuYWwiXX0.pj-TWbimkl-6qvRPZfn-y9a0nmpLW9L7-IIgYxPeZv3aJwVX9NOJ0rE-6tsZe07H-eG2UFKCufNeSeV9fCgOrcDoPbvsYMysIC8hDNopDcpx_tzM7rPaaV5FCFXST64x1US92FD2YQYtHieVcMqlj_Bv9P_wDtwv7uGTLxc6ujYOKpUUjCRpgiMzcTkTnTrYT4ftjxV85Pr56QenHDJR_kfl7TK4xXdOZB7TKNVjbo0etEwXSfjqmZLqSKJdPdoF6Ct_E-ewv508arNCMPQ1-LyBFU5YQ4NS0H1hQFON26-1RKeHRkulOApVLFp4_W5neOYhuyrsO3qxsj_o0Sg9CA");
            while (!response.IsCompleted) { }

            string result = response.Result.Content.ReadAsStringAsync().Result;

            dynamic decodedResponse = Json.Decode(result);

            if (decodedResponse.Active)
            {
                Console.WriteLine("Active token");
            }
            else
            {
                Console.WriteLine("Inactive token");
            }
        }
    }
}
