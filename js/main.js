(function(){
  const actions = { //함수를 action객체의 method로 등록
    birdFlies(key){ //아래 in~activate 함수에서 받아온 true,false 인자값을 key로 받아옴
      if(key){
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`
      } else {
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`
      }
    },
    birdFlies2(key){ //두번째 함수(data-index 5)
      if(key){
        console.log('두번째 새')
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, -${window.innerHeight}px)`
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`
      }
    }
  }
  const graphicElms = document.querySelectorAll('.graphic-item')
  const stepElms = document.querySelectorAll('.step')
  let currentItem = graphicElms[0]; //현재 visible클라스가 부여된 graphic-item
  let ioIndex //intersectionobserver로 관찰되는 .step의 dataset index number

  const io = new IntersectionObserver((entries, observer)=>{
    ioIndex = entries[0].target.dataset.index * 1 //숫자열로 만들어주기 위해 1을 곱함
  })

  //data-index속성 부여
  for(let i=0; i<stepElms.length; i++){
    io.observe(stepElms[i]) // 관찰대상 등록
    stepElms[i].dataset.index = i; //dataset 넘버 부여
    graphicElms[i].dataset.index = i;
  }


  //활성화 & 비활성화 분리
  function activate(action){ //data-action이 설정된 부분에 가면 action 인자를 받아옴
    currentItem.classList.add('visible')

    if(action){
      actions[action](true)
    }
  }
  function inActivate(action){
    currentItem.classList.remove('visible')

    if(action){
      actions[action](false)
    }
  }

  //스크롤 시 마다
  window.addEventListener('scroll', ()=>{
    let step; //몇 번째 step인지 저장할 변수
    let boundingRect; //위치 값 변수

    for(let i=ioIndex-1; i<ioIndex+2; i++){
      step = stepElms[i]; //몇번째 step인지 알아옴

      if(!step) continue; //step이 없다면(스크롤이 하지 않았다면) for문 밖으로 나감.

      //getBoundingClentRect() : 위치 값을 알아옴
      boundingRect = step.getBoundingClientRect()

      if(boundingRect.top > window.innerHeight * 0.1 &&
         boundingRect.top < window.innerHeight * 0.9){ //step의 위치가 화면의 10%보다는 크고, 90%보다는 작을 때

          inActivate(currentItem.dataset.action);

          currentItem = graphicElms[step.dataset.index]
          activate(currentItem.dataset.action);
      } 
    }
  })


//새로고침 했을 때 최상위로 스크롤 올림
window.addEventListener('load', ()=>{
  setTimeout(()=>scrollTo(0,0), 100)
})

activate(); //스크롤과 관계 없이 화면이 열리자마자 activate 함수를 발동(첫번째 이미지가 보이는 상태로 만듦)

})()