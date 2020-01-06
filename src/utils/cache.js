
export const set = (key, value, ttl = 24 * 60 * 60 * 1000) => localStorage.setItem(key, JSON.stringify({
  data: value,
  expired_time: new Date().getTime() + ttl
}))

export const get = (key) => {
  if (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)).expired_time > new Date().getTime()) {
     return JSON.parse(localStorage.getItem(key)).data;
  } else {
    return false
  }
}


export const sessionSet = (key, value) => sessionStorage.setItem(key, JSON.stringify(value))

export const sessionGet = (key) => {
  if (sessionStorage.getItem(key)) {
     return JSON.parse(sessionStorage.getItem(key));
  } else {
    return false
  }
}

