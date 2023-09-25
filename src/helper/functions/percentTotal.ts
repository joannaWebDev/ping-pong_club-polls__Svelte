export default function percentTotal(num:number, total:number, sign:boolean = false):string {
  // to prevent division by 1
  total = total || 1

  let formula:string = ((num * 100) / total).toFixed(2)
  let res:string = sign ? `${formula}%` : formula

  return res
}
