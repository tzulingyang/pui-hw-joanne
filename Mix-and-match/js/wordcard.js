

if(document.readyState === 'loading'){

    document.addEventListener('DOMContentLoaded', () => {

    let openBtnArr = []; 
    let closeBtnArr = []; 
    let wordcardArr = [];    

    for (let i=1; i < 13; i++){
        let open_id = 'opencard-' + i;
        openBtnArr.push(open_id);
        let close_id = 'closecard-' + i;
        closeBtnArr.push(close_id);
        let wordcard_id = 'wordcard-' + i;
        wordcardArr.push(wordcard_id);
    }



    for (let j=0; j<12; j++){
        let openBtn = document.getElementById(openBtnArr[j]);
        let closeBtn = document.getElementById(closeBtnArr[j]);
        let wordcard = document.getElementById(wordcardArr[j]);

        openBtn.addEventListener('click', () => {
            wordcard.classList.add('open');
        });
    
        closeBtn.addEventListener('click', () => {
            wordcard.classList.remove('open');
        });
    }

});
}


