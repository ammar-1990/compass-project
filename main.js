// assining variables
let value = document.querySelector("#inValue");
let btn = document.querySelector("#btn");
let wraper = document.querySelector(".wraper");
let extend = document.querySelector(".extend");
let calc = document.querySelector("#calc");
let weight = document.querySelector("#weight");
let height = document.querySelector("#height");
let age = document.querySelector("#age");
let activity = document.querySelectorAll(".activity li");
let choice = document.querySelectorAll(".choice span ");
let myCalories = document.querySelector(".my-calories");
let logo = document.querySelector('.logo');
let calculator = document.querySelector('.calc');
let openMega=document.querySelector('.open-mega');
let megaMenue=document.querySelector('.mega-menue');
let dietList = document.querySelectorAll('.diet-list li');
let intolerances= document.querySelectorAll('.intolerances-list li');
let cuisines = document.querySelectorAll('.cuisine-list li')
let loadWraper;
let loading;
let loader;

// events
btn.addEventListener("click", ()=>
{
  let myUrl= `https://api.spoonacular.com/recipes/complexSearch?apiKey=79cfe8c0c26e45209042ef87176d17d6&number=100`;
  let activeDiet=document.querySelector('.diet-list li.active-option')
  let activeIntolerances=document.querySelector('.intolerances-list li.active-option')
  let activeCuisine=document.querySelector('.cuisine-list li.active-option')
  let show=''
  if(!value.value && !activeDiet && !activeCuisine && !activeIntolerances)
  {show=`<p class="no-result">enter valid informations</p>`
  
  wraper.innerHTML = show;
  window.scrollBy(0,window.innerHeight);
}

  else{
if(value.value)
myUrl=myUrl + "&query=" + value.value
if(activeDiet)
myUrl=myUrl + activeDiet.dataset.diet;
if(activeIntolerances)
myUrl=myUrl+ activeIntolerances.dataset.intolerances
if(activeCuisine)
myUrl=myUrl+ activeCuisine.dataset.cuisine
loadWraper=document.createElement('div')
loading=document.createElement('span')

loading.appendChild(document.createTextNode('Loading'))
loader=document.createElement('span')
loadWraper.classList.add('load-wraper')
loading.classList.add('loading')
loader.classList.add("loader")
loadWraper.appendChild(loading)
loadWraper.appendChild(loader)
document.body.appendChild(loadWraper)
getData(myUrl)
  }

});
// btn listener
document.addEventListener("click", (e) => {
  if (e.target.id === "sBtn") {
    fetch(
      `https://api.spoonacular.com/recipes/${e.target.dataset.id}/nutritionWidget.json?apiKey=79cfe8c0c26e45209042ef87176d17d6`
    )
      .then((response) => response.json())
      .then((data) => {
        let { calories, carbs, fat, protein } = data;
        let { amount: sugar } = data.bad[4];
        let { amount: Cholesterol } = data.bad[5];
        let { amount: sodium } = data.bad[6];
        let facts = document.querySelector(".facts");
        facts.innerHTML = `
<p>nutrition facts</p>
<div class="fact">
   
    <span>calories</span>
    <span>${calories}</span>
</div>
<div class="fact">
    <span>protine</span>
    <span>${protein}</span>
</div>
<div class="fact">
    <span>carbs</span>
    <span>${carbs}</span>
</div>
<div class="fact">
    <span>fats</span>
    <span>${fat}</span>
</div>
<div class="fact">
    <span>sugars</span>
    <span>${sugar}</span>
</div>
<div class="fact">
    <span>cholesterol</span>
    <span>${Cholesterol}</span>
</div>

<div class="fact">
    <span>sodium</span>
    <span>${sodium}</span>
</div>
<span id="x">X</span>`;
      });
    
    fetch(
      `https://api.spoonacular.com/recipes/${e.target.dataset.id}/ingredientWidget.json?apiKey=79cfe8c0c26e45209042ef87176d17d6`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let wraper = document.querySelector(".ing-wraper");
        let ingredients = "";
        data.ingredients.forEach((elm) => {
          let name = elm.name;
          let unit = elm.amount.metric.unit;
          let value = elm.amount.metric.value;

          ingredients += `<div class="ing">
    
<span class="ing-name">${name}</span>
<div class="ing-quant">
    <span>${value}</span>
    <span>${unit}</span>
</div>
</div>`;
        });
        wraper.innerHTML = ingredients;
        extend.classList.replace("hide",'show');
        let myIngs=document.querySelectorAll('.ing')
        let i =0;
        
        myIngs.forEach((ele)=>{
          console.log(ele,i)
          ele.style.animationDelay=`${i}s`
          i=i+0.2
        })
      });
  }
});

// close listener
document.addEventListener("click", (e) => {
  if (e.target.id === "x"){extend.classList.replace("show",'unshow');
  extend.addEventListener('animationend',()=>
  {
    extend.classList.replace("unshow",'hide'); 
  })
}
});

// calc

 calc.addEventListener('click',()=>
 {
 
    if(weight.value!=0 && height.value!=0  && age.value!=0){
   
   let result;
   let myActivityLevel= +document.querySelector(".active-list").dataset.act;
    if (document.querySelector(".active-choice").dataset.choice==='male'){
        result=parseInt((10*(+weight.value) + 6.25*(+height.value) - 5*(+age.value) +5)*myActivityLevel);
    
    }
    else 
    {
        result=parseInt((10*(+weight.value) + 6.25*(+height.value) - 5*(+age.value) -161)*myActivityLevel);
          
    }

    let cont=`
    <div class="end-result">
        <div class="main-title">your daily intake</div>
    <div class="my-calories"><span class="left ">${result}</span> <span class="right">calories</span></div>
    <div class="my-calories"><span class="left two">${parseInt(weight.value*2.2)}g</span> <span class="right two">protine</span></div>
    <div class="my-calories"><span class="left three ">${parseInt(weight.value*50/100)}g</span> <span class="right three">fats</span></div>
    <div class="my-calories"><span class="left four">${ parseInt((result-(weight.value*2*4 + weight.value*50/100*9))/4)}g</span> <span class="right four">carbs</span></div>
      </div>
    `

   
    let wraper= document.querySelector('.result-wraper')
    wraper.innerHTML=cont;
    document.querySelector(".active-list").classList.remove("active-list");
    activity[0].classList.add('active-list')
    document.querySelector(".active-choice").classList.remove("active-choice");
    choice[0].classList.add('active-choice');

    weight.value='';
    height.value='';
    age.value='';

 }
 else {
  document.querySelector('.result-wraper').innerHTML=`<p class="valid">Enter valid Values</p> `
  let valid = document.querySelector('.valid')
  setTimeout(() => {
   
    valid.classList.add('vanish')
  }, 4000);
 }
}

 )

// choose activity
activity.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".active-list").classList.remove("active-list");
    element.classList.add("active-list");
  });
});

//choose Gender

choice.forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelector(".active-choice").classList.remove("active-choice");
      element.classList.add("active-choice");
    });
  });




  //toggle calc 
  logo.addEventListener('click', ()=> {
    calculator.classList.toggle('hide-calc')

  })


//open mega menue 
openMega.addEventListener('click',(e)=>{
  e.target.classList.toggle('glow')
megaMenue.classList.toggle('hide-mega')

})

//choosing diet 
choosing(dietList,'diet')



//choosing intolerances 
choosing(intolerances,"intolerances");



//choose cuisine
choosing(cuisines,'cuisine');


// functions

async function getData(a) {
  try {
    let response = await fetch(a);
    let data = await response.json();
    let results = data.results;
    console.log(data);
if(results.length==0 ){
let show='';
show=`<p class="no-result">there are no results, try to enter an other recipe or make your advanced search more general </p>`
loadWraper.classList.add('vanish')
setTimeout(() => {loadWraper.remove()
  
}, 700);

wraper.innerHTML = show;
window.scrollBy(0,window.innerHeight);

}

else{
    showData(results);
}
  } catch (err) {
    console.log(err);
    let show='';
show=`<p class="no-result">there are no results, try to check your daily requests of the APIs </p>`
loadWraper.classList.add('vanish')
setTimeout(() => {loadWraper.remove()
  
}, 700);

wraper.innerHTML = show;
window.scrollBy(0,window.innerHeight);
  }
}


function showData(r) {
 

  let show = "";
  r.forEach((element) => {
    show += `<div class="result">
            <img src= ${!element.image ? "./images/1.png" : element.image} >
            
           <p>${element.title}</p>
            
            
            <button id="sBtn" data-id="${element.id}">see more</button>
        
        </div>
    
 `;
  });
  wraper.innerHTML = show;
let i =0;
  let cartImg=[...document.querySelectorAll('.result img')]
  cartImg.forEach((ele)=>
    ele.addEventListener('load',()=>{
 i=i+1;
 if (i==cartImg.length)
 {
  loadWraper.classList.add('vanish')
  setTimeout(() => {loadWraper.remove()
    
  }, 700);
 wraper.scrollIntoView();
 }
    }))
}

function choosing (a,b)
{


  a.forEach(li=>{
    li.addEventListener('click',()=>{
      if(document.querySelector(`.${b} .active-option`))
      document.querySelector(`.${b} .active-option`).classList.remove('active-option');
      if(li.getAttribute(`data-${b}`)==='none'){
        li.classList.add('none')
        document.querySelector(`.${b} > p`).style.opacity=0.3
        document.querySelector(`.${b} > p`).style.boxShadow= "0 0 "
      }
      else {
        if(document.querySelector(`.${b} .none`))
        document.querySelector(`.${b} .none`).classList.remove('none')
        li.classList.add('active-option')
        document.querySelector(`.${b} > p`).style.opacity=1
        document.querySelector(`.${b} > p`).style.boxShadow= "0 0 5px white"
      }
      
      
      
     
     
    })
  })

}
