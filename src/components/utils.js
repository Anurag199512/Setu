//import createhistory from  'history/createBrowserHistory'

var request=require('sync-request');

//const history=createhistory()

export function initializeState(){
  
    let url='https://work.setu.co/assignments/stock-ui/1a2b3c4d5/portfolio';
      
    var res = request('GET', url);
    
    if (res.statusCode===200)
        return res.body;
    else
        {
            return({
            error:'Connection error , not able to fetch data'
        });
    }

}

export function selectedStock(){

    let url='https://work.setu.co/assignments/stock-ui/stocks';
      
    var res = request('GET', url);
   
    if (res.statusCode===200)
        return res
    else
    {
       
        return {
            error:'Connection error , not able to fetch data'
        };
    }

}

export async function buyStock(id,val,stockName){
 
    let url='https://work.setu.co/assignments/stock-ui/1a2b3c4d5/buy';
    
    // let val=document.getElementById(e.target.id).value;
    // let id=e.target.id;

    let data={
        stockId:id,
        unitsToBuy:val
    };
    
    const options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        credentials: 'same-origin'
    };

    const res=await fetch(url, {...options,body:JSON.stringify(data)});
    console.log(res.status);
    if(res.status===200)
        {
            document.getElementById('buyingFailed').innerHTML=''
            await res.json();
            alert(`${val} Stock bought for ${stockName}. Congratulations !!`)
            window.location.href = '/';
        }
    else if(res.status===403){
        document.getElementById('buyingFailed').innerHTML='Insufficient balance available. Can not buy this stock.';
        //window.location.href = '/';
    }    
    else{
        document.getElementById('buyingFailed').innerHTML='Connection interrupted! Buying failed.'
        alert(`Sorry buying failed for ${stockName}. Try again !`)

    }
}



export async function sellStock(id,val,stockName){
    console.log('here')
    let url='https://work.setu.co/assignments/stock-ui/1a2b3c4d5/sell';
    
    // let val=document.getElementById(e.target.id).value;
    // let id=e.target.id;

    let data={
        stockId:id,
        unitsToBuy:val
    };
    
    const options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        credentials: 'same-origin'
    };

    const res=await fetch(url, {...options,body:JSON.stringify(data)});
    console.log(res.status);
    if(res.status===200)
        {
            document.getElementById('buyingFailed').innerHTML=''
            await res.json();
            alert(`${val} Stock bought for ${stockName}. Congratulations !!`)
            window.location.href = '/';
        }
    else if(res.status===403){
        document.getElementById('buyingFailed').innerHTML='Insufficient balance available. Can not buy this stock.';
        //window.location.href = '/';
    }    
    else{
        document.getElementById('buyingFailed').innerHTML='Connection interrupted! Buying failed.'
        alert(`Sorry buying failed for ${stockName}. Try again !`)

    }
}
