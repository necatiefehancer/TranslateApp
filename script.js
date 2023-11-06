
const toLang=document.querySelector('#to_select');
const fromLang=document.querySelector('#from_select');
const toText=document.querySelector('#to_text');
const fromText=document.querySelector('#from_text');
const translate_button=document.querySelector('#translate_button');
const exchange_icon=document.querySelector('#exchange_icon');
const icons=document.querySelectorAll('.icons');
for(let lng in languages){
var option=`
<option value="${lng}">${languages[lng]}</option>`;
fromLang.insertAdjacentHTML('beforeend',option);
toLang.insertAdjacentHTML('beforeend',option);
fromLang.value="tr-TR";
toLang.value="en-GB";
}
translate_button.addEventListener('click',()=>{
    let text=fromText.value;
    let from=fromLang.value;
    let to=toLang.value;
    const url=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`;
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        toText.value="";
        toText.value=data.responseData.translatedText;
    })

})
exchange_icon.addEventListener('click',()=>{
    let text=fromText.value;
    fromText.value=toText.value;
    toText.value=text;

    let lng=fromLang.value;
    fromLang.value=toLang.value;
    toLang.value=lng;
})
for(let icon of icons){

    icon.addEventListener('click',(element)=>{
        if(element.target.classList.contains('fa-copy')){
            if(element.target.id=="to"){
                console.log('to copy icon')
                navigator.clipboard.writeText(toText.value);
            }
            else{
                console.log('from copy icon')
                navigator.clipboard.writeText(fromText.value);

            }
        }
        else{
            var utterance;
            if(element.target.id=="from"){
                utterance=new SpeechSynthesisUtterance(fromText.value);
                utterance.lang=fromLang.value;
                console.log('from volume icon')
            }
            else{
                utterance=new SpeechSynthesisUtterance(toText.value);
                utterance.lang=toLang.value;
                console.log('to volume icon')
            }
            speechSynthesis.speak(utterance);   
        }
    })

}