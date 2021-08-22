export function addReview(content) {
  return new Promise((resolve, reject) => {
    fetch('/addReview', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(content),
    })
    .then(response => response.json())
    .then(jsonResult => resolve(jsonResult.requestBody))
    .catch(error => reject(new Error(error)));
  });
}

export function getReviews() {
  return new Promise((resolve, reject) => {
     fetch('/getReviews')
     .then(response => response.json())
     .then(jsonResult => resolve(jsonResult.requestBody))
     .catch(error => reject(new Error(error)));
   });
}
