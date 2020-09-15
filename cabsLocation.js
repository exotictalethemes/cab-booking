import jsdom from "jsdom"
import nodefetch from "node-fetch"
import jq from "jquery"

const { JSDOM } = jsdom

let cabs = []

let mainUrl = "https://www.distancelatlong.com/country/india"
cabs.data = []

cabs.getdata = async function(){
    await nodefetch(mainUrl)
    .then(res => res.text())
    .then(body => {
        const dom = new JSDOM(body)
        const $ = jq(dom.window)
        let urls = []
        $("table.table.table-striped.setBorder > tbody").find("tr.setFont").each(function(x){
           urls.push( $(this).find("a").attr("href"))
        })

        return urls
    })
    .then( async (urls) => {

        console.log(urls.length+" location's cabs data requested")
        for (let url = 0; url < urls.length; url++) {
            const link = urls[url];
            
             await nodefetch(link)
            .then(res => res.text())
            .then(body => {
                const dom = new JSDOM(body)
                const $ = jq(dom.window)
           
                $("table.table.table-striped.setBorder > tbody").find("tr.setFont").each(function(x){
                   let obj = []
                   $(this).find("td").each(function(index){
                       obj[index] =  $(this).text()
                   })
            
                   if(obj.length == 4){
                       obj.pop()

                       if(obj[0] != null && obj[0] != "" && obj[0].length !=0){
                        cabs.data.push(obj)
                        console.log("updating cabs data from "+obj[0]  );
                    }
                      
                   }else if(obj.length == 3){
                       
                    if(obj[0] != null && obj[0] != "" && obj[0].length != 0){
                        cabs.data.push(obj)
                        console.log("updating cabs data from "+obj[0]  );
                       }
                     
                   }
                   obj = []

                   
           
                })
                
    
            })
        }


    })
 
} 

export default cabs

