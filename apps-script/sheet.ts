interface sheetType {
  WS_NAME: string;
  SET_VAL_ARRAY: string[][];
  sheet: () => GoogleAppsScript.Spreadsheet.Sheet | null;
  getLastRow: () => number;
  setMailBody: () => void;
}

class Sheet implements sheetType {
  WS_NAME: string;
  SET_VAL_ARRAY: string[][];

  constructor(ws_name, set_val_array) {
    this.WS_NAME = ws_name;
    this.SET_VAL_ARRAY = set_val_array;
  }

  // 有効なワークシートを返す
  sheet() {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.WS_NAME);
  }

  // 最終行を取得
  getLastRow() {
    const sheet = this.sheet();
    if (!sheet) return 1;
    const lastRow =
      sheet
        .getRange(1, 1)
        .getNextDataCell(SpreadsheetApp.Direction.DOWN)
        .getRow() ?? 1;
    return lastRow + 1;
  }

  // メールの内容を配列にパースしたものをSpreadSheetに反映
  setMailBody() {
    const sheet = this.sheet();
    if (!sheet) return;
    sheet
      .getRange(this.getLastRow(), 1, this.SET_VAL_ARRAY.length, 3)
      .setValues(this.SET_VAL_ARRAY);
  }
}
