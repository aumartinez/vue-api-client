//JS Script

var API_KEY = "Z3Vlc3Q6bXlwYXNz";
var url = "https://localhost:4343/php-api-demo/api.php";

Vue.component("continent-item",{
  props: ["continent"],
  template: "<li>{{continent.text}}</li>",
});

var vm = new Vue({
  el: "#app",
  data: {
      title: "COVID 19 monitoring app",
      subtitle: "Countries list",
      continentList: [],      
   },
  mounted
});
  
async function mounted() {
  var json = {};
  var data = {};
  
  try {
    json = await axios
    .get(url, {
     headers: {
       "API-Key": API_KEY,
     },
    })
    .then((response) => (response.data.response));
    
    //Getting continents
    data = json;
    
    var continents = [];
    for (var i = 0; i < data.length; i++) {
      continents.push(data[i].continent);
    }
    
    var count = {};
    continents.forEach((i) => {count[i] = ++count[i]|| 1});    
    delete count.All;
    delete count.null;
    
    var keys = [];    
    for (var prop in count) {
      if (count.hasOwnProperty(prop)) {
        keys.push(prop);
      }
    }
    
    keys.sort();
    
    for (var i = 0; i < keys.length; i++) {
      this.continentList.push({text: keys[i]});
    }
    
    
  }
  catch(e) {
    console.log(e);
  }  
  
  
  
}