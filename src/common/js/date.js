/**
 * Created by Administrator on 2017/3/1.
 */
export function formatDate(date,fmt){
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let o ={
    'M+':date.getMonth()+1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }
  for(let k in o){
    if(new RegExp(`(${k}`).test(fmt)){
      let str = o[k] + '';//转换为string
      fmt = fmt.replace(RegExp.$1,)
    }
  }
}
