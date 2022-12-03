const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
}

const displayCategories = (data) => {
  const categoriesContainer = document.getElementById('categories-container');
  data.forEach(categorie => {
    const { category_id, category_name } = categorie;
    const categorieDiv = document.createElement('div');
    categorieDiv.innerHTML = `
       <button class="btn btn-outline-primary" onclick="loadNews(${category_id})"><h5>${category_name}</h5></button>
       `;
    categoriesContainer.appendChild(categorieDiv);
  })
}

const loadNews = async (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
}

const displayNews = (data, category_name) => {
  console.log(data);
  const newsContainer = document.getElementById('news-container');
  const foundCount = document.getElementById('found-news');
  foundCount.innerText = data.length;
  newsContainer.textContent = '';
  data.sort((x, y) => y.total_view - x.total_view);
  data.forEach(news => {
    console.log(news);
    const { title, thumbnail_url, details, total_view, author, _id } = news;
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
        <div class="card mb-3 p-3 shadow p-3 mb-5 bg-body rounded" style="max-width: 75rem;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${thumbnail_url}" class=""...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${title}</h5>
                          <p class="card-text">${details.slice(0, 400)}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center">
                        <div>
                          <div><img class="rounded-circle sticky-bottom" style="width: 6rem;" src="${author.img}" alt="">
                            <div>
                              <h6>${author.name ? author.name : 'No Author'}</h6>
                              <p>${author.published_date}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p><i class="fa-regular fa-eye"></i> <strong>${total_view ? total_view : 0}</strong></p>
                        </div>
                        <div>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div>
                         <button onclick="loadNewsDetails('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-arrow-right fs-4 my-2"></i></button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
        `;
    newsContainer.appendChild(newsDiv);
  })
}

const loadNewsDetails = async news_id => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data[0]);
}

const displayNewsDetails = newsdetails => {
  console.log(newsdetails);
  const { title, thumbnail_url, image_url, details } = newsdetails;
  console.log(title);
  const detailsContainer = document.getElementById('modal-pop');
  detailsContainer.innerHTML = `
  <img class="img-fluid" src="${image_url}">
  <p>${details}</p>
  `;
  const newsLabel = document.getElementById('newsDetailsLabel');
  newsLabel.innerText = title;
}

loadCategories();
loadNews(08);