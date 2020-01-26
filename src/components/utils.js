var request=require('sync-request');

export function initializeState(){
  
    let url='https://work.setu.co/assignments/stock-ui/anurag12345/portfolio';
      
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
 
    let url='https://work.setu.co/assignments/stock-ui/anurag12345/buy';
    
    let data={
        stockId:id,
        unitsToBuy:Number(val)
    };
    
    const options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        credentials: 'same-origin'
    };

    const res=await fetch(url, {...options,body:JSON.stringify(data)});
     
    if(res.status===200)
        {
            document.getElementById('buyingFailed').innerHTML=''
            await res.json();
            alert(`${val} Stock bought for ${stockName}. Congratulations !!`)
            window.location.href = '/';
        }
    else if(res.status===403){
        alert('Insufficient balance available. Can not buy this stock.')

    }    
    else{
        alert(`Sorry buying failed for ${stockName}. Try again !`)
    }
}



export async function sellStock(id,val,stockName){
     
    let url='https://work.setu.co/assignments/stock-ui/anurag12345/sell';

    let data={
        stockId:id,
        unitsToSell:1
    };

    const options={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        credentials: 'same-origin'
    };

    const res=await fetch(url, {...options,body:JSON.stringify(data)});
 
    if(res.status===200)
        {
            let response=await res.json();

            alert(`${val} Stock of ${stockName} sold for ${response.data.price} .Congratulations !!`)
            window.location.href = '/sellstocks';
        }
    else if(res.status===403){
        alert(`Insufficient units available. Can not sell this stock.`)
    }    
    else{
        alert(`Sorry selling failed for ${stockName}. Try again !`)
    }

}
