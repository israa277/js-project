// ========> types jquery file ========> 
/// <reference types="../@types/jquery"/>
$('#iconClose').on('click',function(){
    $('#iconClose').css('display' , 'none')
    $('#iconOpen').show()
    $('.side').animate({width:'hide'},500);
    $('.sideInfo').slideUp(500)
})

$('#iconOpen').on('click',function(){
    $('#iconOpen').css('display' , 'none')
    $('#iconClose').show()
    $('.side').animate({width:'show'},500);
    $('.sideInfo').slideDown(500)

})
// ? =============> loading ===============>
$(function(){
    $('.loader').fadeOut(2000 , function(){
        $('.loading').slideUp(2000, function(){
            $('body').css('overflow','auto')
        });
    });
})

// ? =============> Global ===============>
let dataCategories = [];
let dataIN = [];
let AreaData = [];
let dataCategoriesMeal = []
let dataINMeal = []
let AreaM = []
let dataCategoriesDetails = []
let dataIDetails = []
let AreaD = []
let search = []
let searchD = []
let search2 = []
let isValid = false;
let formData = document.getElementById('form');
let inputN = document.getElementById('firstName')
let EmailN = document.getElementById('email')
let PassN = document.getElementById('password')
let AgeN = document.getElementById('age')
let PhoneN = document.getElementById('phone')
let PassRp = document.getElementById('Rpassword')
let btn = document.getElementById('btn')

// ! =============> Events ===============>
document.getElementById('input-1').addEventListener('input' , function(e){
    let input1 = e.target.value
    getSearch(input1)
})
document.getElementById('input-2').addEventListener('input' , function(e){
    let input2 = e.target.value
    console.log(input2);
    getSearch2(input2)
})
formData.addEventListener('submit' , function(e){
    e.preventDefault();
 
 })
 formData.addEventListener('input',function(){
    if(   validationName()
     && validationEmail()
     &&  validationPhone()
     &&   validationAge()
     && validationpass()
     &&  validationRpass()
     ){
       isValid = true;
       btn.removeAttribute('disabled')

     }else{
       isValid = false
       btn.setAttribute('disabled')

     }
    
 })
// ! =============> Function Categories ===============>
async function getCategories(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let  finalResponse = await response.json();
    dataCategories = finalResponse.categories;
    document.getElementById('Categories').classList.remove('d-none');
    document.getElementById('categoriesDetails').classList.add('d-none');
    document.getElementById('Ingredients').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
     displayDataCategories()
}
function displayDataCategories(){
    let cartona = '';
    for (let i = 0 ; i <dataCategories.length ; i++) {
        cartona += `
        <div class="col-md-3 ">
        <div class="item rounded-2" onclick = "getCategoriesMeal('${dataCategories[i].strCategory}')" >
            <img class="w-100" src="${dataCategories[i].strCategoryThumb}" alt="meal">
            <div class="info p-2">
                <h3>${dataCategories[i].strCategory}</h3>
                <p>${( dataCategories[i].strCategoryDescription.substring(0,134))}</p>
            </div>
        </div>                  
    </div>
        `
    }
    document.getElementById('catecoriesData').innerHTML = cartona
}
async function getCategoriesMeal(meal){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`);
    let  finalResponse = await response.json();
    dataCategoriesMeal = finalResponse.meals;
    document.getElementById('CategoriesMeal').classList.remove('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    displayDataMeal()
}
function displayDataMeal(){
    let cartona = '';
    for (let i = 0 ; i < dataCategoriesMeal.length ; i++) {
        if(i>19){
            break;   
       }
        cartona += `
        <div class="col-md-3">
        <div class="item rounded-2" onclick = "getCategoriesDetails('${dataCategoriesMeal[i].idMeal}')">
            <img class="w-100" src="${dataCategoriesMeal[i].strMealThumb}" alt="meal">
            <div class="info meal p-2">
                <h3>${dataCategoriesMeal[i].strMeal}</h3>
            </div>
        </div>                  
    </div>
        `
    }

    document.getElementById('catecoriesDataMeal').innerHTML = cartona
}
async function getCategoriesDetails(key){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${key}`);
    let  finalResponse = await response.json();
    dataCategoriesDetails = finalResponse.meals;
    document.getElementById('categoriesDetails').classList.remove('d-none');
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    displayDataDetails()
}
function displayDataDetails(){
        cartona = `
        <div class="col-md-4">
        <img class=" w-100 rounded-2" src="${dataCategoriesDetails[0].strMealThumb}" alt="">
        <h2>${dataCategoriesDetails[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <div>
            <h2>Instructions</h2>
            <p>${dataCategoriesDetails[0].strInstructions}</p>
            <h3><span>Area :</span>${dataCategoriesDetails[0].strArea}</h3>
            <h3><span>Category :</span>${dataCategoriesDetails[0].strCategory}</h3>
            <h3>Recipes: </h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure1}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure2}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure3}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure4}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure5}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure6}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure7}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure8}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure9}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure10}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure11}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure12}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure13}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure14}</li>
                <li class="p-1 m-2 alert alert-info">${dataCategoriesDetails[0].strMeasure15}</li>
            </ul>
            <h3><span>Tags :</span></h3>
            <a href="${dataCategoriesDetails[0].strSource}" target="_blank" class="btn btn-success">Success</a>
            <a href="${dataCategoriesDetails[0].strYoutube}" target="_blank" class="btn btn-danger">Youtoub</a>
        </div>
    </div>
        `
    document.getElementById('DataDetails').innerHTML = cartona
}
// ! =============> Function Ingredients ===============>
async function getIN(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let  finalResponse = await response.json();
    dataIN = finalResponse.meals;
    document.getElementById('Ingredients').classList.remove('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
     displayDataIN()
}
function displayDataIN(){
    let cartona = '';
    for (let i = 0 ; i <20; i++) {
        cartona += `
        <div class="col-md-3" >
        <div class="item rounded-2"   onclick = "IngredientsMeal('${dataIN[i].strIngredient}')" >
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <div class = "info p-2" >
        <h3>${dataIN[i].strIngredient}</h3>
        <p>${( dataIN[i].strDescription.substring(0,134))}</p>
        </div>
        </div>                  
    </div>
        `
    }
    document.getElementById('IngredientsData').innerHTML = cartona
}
async function IngredientsMeal(meals){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meals}`);
    let  finalResponse = await response.json();
    dataINMeal = finalResponse.meals;
    document.getElementById('IngredientsMeal').classList.remove('d-none')
    document.getElementById('Ingredients').classList.add('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    displayDataMealI()
}
function displayDataMealI(){
    let cartona = '';
    for (let i = 0 ; i < dataINMeal.length ; i++) {
        if(i>19){
            break;   
       }
        cartona += `
        <div class="col-md-3">
        <div class="item rounded-2" onclick = "getIDetails('${dataINMeal[i].idMeal}')" >
            <img class="w-100" src="${dataINMeal[i].strMealThumb}" alt="meal">
            <div class="info meal p-2">
                <h3>${dataINMeal[i].strMeal}</h3>
            </div>
        </div>                  
    </div>
        `
    }

    document.getElementById('IngredientsDataMeal').innerHTML = cartona
}
async function getIDetails(id){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let  finalResponse = await response.json();
    dataIDetails = finalResponse.meals;
    console.log(dataIDetails);
    document.getElementById('IngredientsDetails').classList.remove('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('Ingredients').classList.add('d-none')
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    displayIDetails()
}
function displayIDetails(){
        cartona = `
        <div class="col-md-4">
        <img class=" w-100 rounded-2" src="${dataIDetails[0].strMealThumb}" alt="">
        <h2>${dataIDetails[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <div>
            <h2>Instructions</h2>
            <p>${dataIDetails[0].strInstructions}</p>
            <h3><span>Area :</span>${dataIDetails[0].strArea}</h3>
            <h3><span>Category :</span>${dataIDetails[0].strCategory}</h3>
            <h3>Recipes: </h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure1}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure2}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure3}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure4}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure5}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure6}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure7}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure8}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure9}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure10}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure11}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure12}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure13}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure14}</li>
                <li class="p-1 m-2 alert alert-info">${dataIDetails[0].strMeasure15}</li>
            </ul>
            <h3><span>Tags :</span></h3>
            <a href="${dataIDetails[0].strSource}" target="_blank" class="btn btn-success">Success</a>
            <a href="${dataIDetails[0].strYoutube}" target="_blank" class="btn btn-danger">Youtoub</a>
        </div>
    </div>
        `
    document.getElementById('IngredientsDataDetails').innerHTML = cartona
}
// ! =============> Function Area ===============>
async function getArea(){
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let  finalResponse = await response.json();
    AreaData = finalResponse.meals;
    document.getElementById('Area').classList.remove('d-none')
    document.getElementById('Ingredients').classList.add('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
     displayAreaData()
}
function displayAreaData(){
    let cartona = '';
    for (let i = 0 ; i <AreaData.length; i++) {
        cartona += `
        <div class="col-md-3" >
        <div class="item rounded-2 text-light"  onclick = "AreaMeal('${AreaData[i].strArea}')" >
        <div class = "info p-2" >
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${AreaData[i].strArea}</h3>
        </div>
        </div>                  
    </div>
        `
    }
    document.getElementById('AreaData').innerHTML = cartona
}
async function AreaMeal(meals){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meals}`);
    let  finalResponse = await response.json();
    AreaM = finalResponse.meals;
    console.log(AreaM);
    document.getElementById('AreaMeal').classList.remove('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    displayDataMealArea()
}
function displayDataMealArea(){
    let cartona = '';
    for (let i = 0 ; i < AreaM.length ; i++) {
        if(i>19){
            break;   
       }
        cartona += `
        <div class="col-md-3">
        <div class="item rounded-2" onclick = "getADetails('${AreaM[i].idMeal}')">
            <img class="w-100" src="${AreaM[i].strMealThumb}" alt="meal">
            <div class="info meal p-2">
                <h3>${AreaM[i].strMeal}</h3>
            </div>
        </div>                  
    </div>
        `
    }

    document.getElementById('AreaDataMeal').innerHTML = cartona
}
async function getADetails(id){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let  finalResponse = await response.json();
    AreaD = finalResponse.meals;
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.remove('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('Ingredients').classList.add('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    displayADetails()
}
function displayADetails(){
        cartona = `
        <div class="col-md-4">
        <img class=" w-100 rounded-2" src="${AreaD[0].strMealThumb}" alt="">
        <h2>${AreaD[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <div>
            <h2>Instructions</h2>
            <p>${AreaD[0].strInstructions}</p>
            <h3><span>Area :</span>${AreaD[0].strArea}</h3>
            <h3><span>Category :</span>${AreaD[0].strCategory}</h3>
            <h3>Recipes: </h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure1}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure2}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure3}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure4}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure5}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure6}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure7}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure8}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure9}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure10}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure11}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure12}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure13}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure14}</li>
                <li class="p-1 m-2 alert alert-info">${AreaD[0].strMeasure15}</li>
            </ul>
            <h3><span>Tags :</span></h3>
            <a href="${AreaD[0].strSource}" target="_blank" class="btn btn-success">Success</a>
            <a href="${AreaD[0].strYoutube}" target="_blank" class="btn btn-danger">Youtoub</a>
        </div>
    </div>
        `
    document.getElementById('ADetails').innerHTML = cartona
}
// ! =============> Function Search ===============>
function mySearch(){
    document.getElementById('Search').classList.remove('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('Ingredients').classList.add('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');

}
async function getSearch(Name){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
    let  finalResponse = await response.json();
    search = finalResponse.meals;
    document.getElementById('Categories').classList.add('d-none');
    document.getElementById('categoriesDetails').classList.add('d-none');
    document.getElementById('Ingredients').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    displaySData()
}
function displaySData(){
    let cartona = '';
    for (let i = 0 ; i <search.length; i++) {
        cartona += `
        <div class="col-md-3">
        <div class="item rounded-2" onclick = "getSDetails('${search[i].idMeal}')"
        >
            <img class="w-100" src="${search[i].strMealThumb}" alt="meal">
            <div class="info meal p-2">
                <h3>${search[i].strMeal}</h3>
            </div>
        </div>                  
    </div>
        `
    }
    document.getElementById('SearchData').innerHTML = cartona
}
async function getSDetails(id){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let  finalResponse = await response.json();
    searchD = finalResponse.meals;
    console.log(searchD);
    document.getElementById('searshDE').classList.remove('d-none');
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('Ingredients').classList.add('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('Contact').classList.add('d-none');
    displaySDetails()
}
function displaySDetails(){
        cartona = `
        <div class="col-md-4">
        <img class=" w-100 rounded-2" src="${searchD[0].strMealThumb}" alt="">
        <h2>${searchD[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <div>
            <h2>Instructions</h2>
            <p>${searchD[0].strInstructions}</p>
            <h3><span>Area :</span>${searchD[0].strArea}</h3>
            <h3><span>Category :</span>${searchD[0].strCategory}</h3>
            <h3>Recipes: </h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure1}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure2}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure3}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure4}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure5}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure6}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure7}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure8}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure9}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure10}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure11}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure12}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure13}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure14}</li>
                <li class="p-1 m-2 alert alert-info">${searchD[0].strMeasure15}</li>
            </ul>
            <h3><span>Tags :</span></h3>
            <a href="${searchD[0].strSource}" target="_blank" class="btn btn-success">Success</a>
            <a href="${searchD[0].strYoutube}" target="_blank" class="btn btn-danger">Youtoub</a>
        </div>
    </div>
        `
    document.getElementById('Sdetaies').innerHTML = cartona
}
async function getSearch2(Name){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Name}`);
    let  finalResponse = await response.json();
   search2 = finalResponse.meals;
    document.getElementById('Categories').classList.add('d-none');
    document.getElementById('categoriesDetails').classList.add('d-none');
    document.getElementById('Ingredients').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('searshDE').classList.add('d-none');
    document.getElementById('Contact').classList.add('d-none');
    displaySData2()
}
function displaySData2(){
    let cartona = '';
    for (let i = 0 ; i <search2.length; i++) {
        cartona += `
        <div class="col-md-3">
        <div class="item rounded-2" onclick = "getSDetails('${search2[i].idMeal}')"
        >
            <img class="w-100" src="${search2[i].strMealThumb}" alt="meal">
            <div class="info meal p-2">
                <h3>${search2[i].strMeal}</h3>
            </div>
        </div>                  
    </div>
        `
    }
    document.getElementById('SearchData').innerHTML = cartona
}
function Contact(){
    document.getElementById('Contact').classList.remove('d-none');
    document.getElementById('Search').classList.add('d-none');
    document.getElementById('AreaMeal').classList.add('d-none')
    document.getElementById('Area').classList.add('d-none');
    document.getElementById('AreaDetails').classList.add('d-none');
    document.getElementById('IngredientsDetails').classList.add('d-none');
    document.getElementById('IngredientsMeal').classList.add('d-none')
    document.getElementById('Ingredients').classList.add('d-none')
    document.getElementById('Categories').classList.add('d-none')
    document.getElementById('categoriesDetails').classList.add('d-none')
    document.getElementById('CategoriesMeal').classList.add('d-none')
    document.getElementById('searshDE').classList.add('d-none');

}
//  =============> Validation ===============>
function validationName(){
    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if (regexStyle.test(inputN.value)){
        inputN.classList.add('is-valid');
        inputN.classList.remove('is-invalid');
       return true
    }else{
        inputN.classList.add('is-invalid');
        inputN.classList.remove('is-valid');
       return false
    }
 }
 
function validationEmail(){
    const regexStyle = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (regexStyle.test(EmailN.value)){
        EmailN.classList.add('is-valid');
        EmailN.classList.remove('is-invalid');
       return true
    }else{
        EmailN.classList.add('is-invalid');
        EmailN.classList.remove('is-valid');
       return false
    }
 }
 function validationpass(){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (regexStyle.test(PassN.value)){
        PassN.classList.add('is-valid');
        PassN.classList.remove('is-invalid');
       return true
    }else{
        PassN.classList.add('is-invalid');
        PassN.classList.remove('is-valid');
       return false
    }
 }
 function validationAge(){
    const regexStyle =/^([1-7][0-9]|80)$/
    if (regexStyle.test(AgeN.value)){
        AgeN.classList.add('is-valid');
        AgeN.classList.remove('is-invalid');
       return true
    }else{
        AgeN.classList.add('is-invalid');
        AgeN.classList.remove('is-valid');
       return false
    }
 }
  function validationPhone(){
    const regexStyle =/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/
    if (regexStyle.test(PhoneN.value)){
        PhoneN.classList.add('is-valid');
        PhoneN.classList.remove('is-invalid');
       return true
    }else{
        PhoneN.classList.add('is-invalid');
        PhoneN.classList.remove('is-valid');
       return false
    }
 }
 function validationRpass(){
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if ( regexStyle.test(PassRp.value)){
            PassRp.classList.add('is-valid');
            PassRp.classList.remove('is-invalid');
           return true
    }else{
        PassRp.classList.add('is-invalid');
        PassRp.classList.remove('is-valid');
       return false
    }
 }



 getCategories()
