const main = () => {

    // 前回の更新日時からMail取得した時間を設定
    const ss = new Sheet('シート1',null) // 前回の更新日時があるSpreadSheetを取得
    const getSheetTime = ss.sheet().getRange(1,1).getValue() // 前回の更新日時をSpreadSheetから取得
    const getSheetTimeIfErr = ss.sheet().getRange(1,1).getDisplayValue() // エラーがあった場合のために文字列のまま前回の更新日時をSpreadSheetから取得
    const unixTime = Math.floor(getSheetTime.getTime()/1000) // 前回更新日時をunix時間に変換 → すでに日本時間
    const targetTime = unixTime.toString() // Unix時間を文字に変換

    //検索条件を配列で格納
    const searchCondition = [
      'subject:(hoge) ',   // Mailのタイトルに「hoge」とあるもの
      `after:${targetTime}`  // 指定の時間より後のもの
    ].join("\u0020"); //半角スペースで連結

    // 条件で指定したMailを取得
    const myThreads = GmailApp.search(searchCondition, 0, 500)
    const myMessages = GmailApp.getMessagesForThreads(myThreads)

    // 取得できたMailがあれば内容をパースし配列に格納、SpreadSheetへ積み上げ式で反映
    try {
      // 指定した条件でMailが取得された場合
      if(myMessages.length !== 0) {

        // 取得したMailの内容をパースして配列にする
        const setValArray: Object[] = []
        for(let i in myMessages){
          for(let j in myMessages[i]){

            //スターがないメッセージのみ処理
            if(!myMessages[i][j].isStarred()){

              const strDate = myMessages[i][j].getDate();// 受信の日時を取得しフォーマットを変換
              const strSubject = myMessages[i][j].getSubject(); // Mailのタイトルを取得。タイトルからどの媒体かを判断
              const strMessage = myMessages[i][j].getPlainBody(); // MailのBody（本文）を取得

             //件名に「Fwd」がなければ追加（転送のメールでない場合）
              if(!strSubject.match(/Fwd/)){
                // 返ってきたオブジェクトを配列に追加
                setValArray.push({start: strDate, subject: strSubject, message: strMessage})
              }

            }// end if

          } // end for j
        } // end for i


          const duplicateMain = setValArray.filter((data)=>  Date.parse(getSheetTime) <=  Date.parse(data[0])) // SpreadSheetの日付よりも新しいものだけ、Fwdの文字列がないものを反映
          const validateSetValArry = duplicateMain.filter((ary)=> Object.keys(ary).length) // 二次元配列の中に空の配列を持つものがあれば除外する

          if(validateSetValArry.length){
            // Mailの内容をスプシに反映
            const sheet = new Sheet('シート1', validateSetValArry) // ワークシート名、反映させたい配列にパースしたMailの内容
            sheet.setMailBody()
          }


        } // end if

        // SpreadSheetの更新年月日時間を更新
        const date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)) // 現在の日本時間を取得
        const fomattedDate = Utils.formatDate(date) // YYYY/mm/dd hh:mm:ss のフォーマットにする
        ss.sheet().getRange(1,1).setValue(fomattedDate) // 前回の更新日時を更新しSpreadSheetへ反映


    }catch(e){
      // エラー時の処理を書く

      console.log(e)
      // SpreadSheetの更新年月日時間をエラーで止まったときの時間のままにする（一応更新しておく）
      ss.sheet().getRange(1,1).setValue(getSheetTimeIfErr) // 前回の更新日時を更新しSpreadSheetへ反映


    }

  } // const main = () => {
