

// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab[0].url;
// }


var curTab;
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    curTab = tabs[0].url;
    //document.getElementById("link").value = curTab;
    console.log(curTab);
});

const btn = document.querySelector("button");
const copy = document.getElementById("copy");
btn.addEventListener("click", async function () {
    try {
        const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
        const options = {
            method: 'POST',
            headers: {
		        'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '927a451a34mshbb050a983788efdp1acd71jsnd6d0f2c21725',
                'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
	        },
	        body: new URLSearchParams({
		        url: curTab
	        })
        };
        const response = await fetch(url, options);
        const result = await response.json();
        let property = "";
        for (const x in result) {
            property = x;
            break;
        }
        let text = "";
        if (property == "result_url") {
            text = result.result_url;
        } else if (property == "message") {
            text = result.message;
        } else {
            text = result.error;
        }
        document.getElementById("link").textContent = text;
    } catch (error) {
        console.log(error)
    }

}); 

copy.addEventListener("click", async function () {
    var text = document.getElementById("link").textContent;
    navigator.clipboard.writeText(text);
});