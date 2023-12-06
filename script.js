const API_KEY = "ea3fd45db6584dad919efe73cc4fb982";  //api key
const url="https://newsapi.org/v2/everything?q=";  //url 

window.addEventListener("load",()=> fetchNews("India"));

//reload function --->to come in original state
function reload()
{
    window.location.reload();
}

async function fetchNews(query)
{
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json(); //data contains articles i.e News
    bindData(data.articles);
    
}

function bindData(articles)
{
    const cardsContainer=document.querySelector("#cards-container");
    const newsCardTemplate=document.querySelector("#template-news-card");
    cardsContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;  //which article does not contain image i did not show that news
        const cardClone=newsCardTemplate.content.cloneNode(true); //we create clone of each tag presents in template-news-card div
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone); //added all created clones to cards-container tag.

    });
}


function fillDataInCard(cardClone,article)
{
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    //data ---> here date is TimeZone formate so concert it into human readable
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} - ${date}`;

    //when we click on perticular news it will open that news in new tab.
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}

//here we handle nav items ---> ipl , politics etc
let curSelectNav=null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav=navItem;
    curSelectNav.classList.add('active');
}

//search news
const searchButton=document.querySelector("#search-button");
const searchText=document.querySelector("#search-text");
searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectNav?.classList.remove("active")
    curSelectNav=null;
});