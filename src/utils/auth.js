const TokenKey = 'token'

export function getToken() {
  return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}

// 语言
const LanguageKey = 'language'
export function getLanguage() {
  return window.localStorage.getItem(LanguageKey)
}

export function setLanguage(language) {
  return window.localStorage.setItem(LanguageKey, language)
}

export function removeLanguage() {
  return window.localStorage.removeItem(LanguageKey)
}



// 密码
const RememberPassKey = 'rememberPass'
export function getPass() {
  return window.localStorage.getItem(RememberPassKey)
}

export function setPass(pass) {
  return window.localStorage.setItem(RememberPassKey, pass)
}

export function removePass() {
  return window.localStorage.removeItem(RememberPassKey)
}

// 账号
const RememberAccountKey = 'rememberAccount'
export function getAccount() {
  return window.localStorage.getItem(RememberAccountKey)
}

export function setAccount(account) {
  return window.localStorage.setItem(RememberAccountKey, account)
}

export function removeAccount() {
  return window.localStorage.removeItem(RememberAccountKey)
}

// 记住
const RememberKey = 'remember'
export function getRemember() {
  return window.localStorage.getItem(RememberKey)
}

export function setRemember(bol) {
  return window.localStorage.setItem(RememberKey, bol)
}

export function removeRemember() {
  return window.localStorage.removeItem(RememberKey)
}
