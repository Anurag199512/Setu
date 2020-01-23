var request=require('sync-request')


export function selectedstock(){

    let url1='https://work.setu.co/assignments/stock-ui/stocks';
    //var data=[];

    
    var res = request('GET', url1);
    console.log(res.statusCode);
    //data=res.getBody()

    // request({url:url1,json:true},(error,response)=>{
    //     console.log(error)
        
    //     console.log(response.statusCode)
    //     console.log(response.body)
    //     data=response.body
        
    // })
    if (res.statusCode===200)
        return res
    else
        return {
            error:'Connection error , not able to fetch data'
        }

}