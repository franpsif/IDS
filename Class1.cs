using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;

namespace ClassLibrary4
{
    public class Class1
    {
        private static readonly HttpClient client = new HttpClient();

        public async System.Threading.Tasks.Task<HttpResponseMessage> CallServerAsync(String token_access)
        {
            //we need to use our own scope in order to know what is the scope secret (include that scope in the client definition)
            //secret active until october: 9404762a-daee-4db2-8bf4-6cea1249b3eb
            //scope: preveroemailscope

            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes("preveroemailscope:9404762a-daee-4db2-8bf4-6cea1249b3eb");
            var auth = Convert.ToBase64String(plainTextBytes);

            client.BaseAddress = new Uri("https://u4ids-sandbox.u4pp.com/identity/connect/introspect");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", auth);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var values = new Dictionary<string, string>()
            {
                {"token", token_access}                
            };
            var content = new FormUrlEncodedContent(values);

            HttpRequestMessage request = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                Content = content
            };

            return await client.SendAsync(request);
        }
    }
}
