export function fetchAllProductsAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilterAPI(filter,sort,pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : on server we will support multi values in filter
  let queryString = "";
  for (let key in filter) {
    const categoryArray = filter[key];
    if (categoryArray.length) {
      const lastCategoryValue = categoryArray[categoryArray.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  // console.log(`http://localhost:8080/products?${queryString}`)
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?` + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    // console.log(data)
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}


export function fetchAllCategoriesAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/category");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrandsAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductByIdAPI(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}
