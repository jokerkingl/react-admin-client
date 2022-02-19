export function formatDate(date) {
    let time = new Date(date)
    return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日 ${time.getHours()>=10?time.getHours():"0"+time.getHours()}:${time.getMinutes()>=10?time.getMinutes():"0"+time.getMinutes()}:${time.getSeconds()>=10?time.getSeconds():"0"+time.getSeconds()}`
}
