class Utils {

    // 時間のフォーマットを変換
    static formatDate(date: Date){
      const formatted_date = `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      return formatted_date
    }

}
