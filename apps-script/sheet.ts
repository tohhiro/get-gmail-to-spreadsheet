interface sheetType {
    WS_NAME: string
    SET_VAL_ARRAY: string[]
    sheet: () => any
    getlastRow: () => number
    setMailBody: () => void
  }


  class Sheet implements sheetType{

      WS_NAME: string
      SET_VAL_ARRAY: string[]

      constructor(ws_name, set_val_array){
        this.WS_NAME = ws_name
        this.SET_VAL_ARRAY = set_val_array
      }

      // 有効なワークシートを返す
      sheet() {
        return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.WS_NAME)
      }


      // 最終行を取得
      getlastRow() {
        const lastRow = this.sheet().getRange(1, 1).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow()
        return lastRow + 1
      }


      // メールの内容を配列にパースしたものをSpreadSheetに反映
      setMailBody() {
        this.sheet().getRange(this.getlastRow(), 1, this.SET_VAL_ARRAY.length, 11).setValues(this.SET_VAL_ARRAY)
      }

    }
