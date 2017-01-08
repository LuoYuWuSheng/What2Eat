/**
 * Module dependencies.
 */

ApiClient = require('./index.js').ApiClient;

var client = new ApiClient({
                            'appkey':'123456',
                            'appsecret':'123456',
                            'url':'https://eco.taobao.com/router/rest',
                            });

client.execute('alipay.user.account.get',
              {'session':'610241433031ea2f5cbfed11b3c86d90e26cb0b6b33bc1470468270',
        },
              function (error,response) {
          console.log("====================alipay.user.get=========================")
                  if(!error)
                    console.log(response);
                  else
                    console.log(error);
              }) 
        
        
client.execute('alipay.user.accountreport.get', 
{
  'session':'610241433031ea2f5cbfed11b3c86d90e26cb0b6b33bc1470468270',
  'fields':'create_time,type,business_type,balance,in_amount,out_amount,alipay_order_no,merchant_order_no,self_user_id,opt_user_id,memo',
  'start_time':'2016-10-13 00:00:30',
  'end_time':'2016-10-13 23:59:30',
 },
function (error,response) {
  console.log("====================alipay.user.accountreport.get=========================")
  if(!error)
  console.log(response);
  else
  console.log(error);
})
