export function fetchBreeds() {
    
     return fetch(`https://api.thecatapi.com/v1/breeds`,{headers: {
    'x-api-key': 'live_GMMu3IOmdPLowDrkeOZpkTmxmssBnSQWmrd6piYJql38emmskBHBeN2NllXrz0jN'
     }
     }).then(res => {
         if (!res.ok) {
             throw new Error();
         }
         return res.json();
  })
}

export function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,{headers: {
    'x-api-key': 'live_GMMu3IOmdPLowDrkeOZpkTmxmssBnSQWmrd6piYJql38emmskBHBeN2NllXrz0jN'
     }
    }).then(res => {
        if (!res.ok) {
            throw new Error()
        }
        return res.json();
    })
}
