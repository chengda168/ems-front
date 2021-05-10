/**
 * Created by kernnel on 2017/4/28.
 */
const getters = {
  lang: state => state.app.lang,
  searchObj: state => state.app.searchObj,
  searchCountry: state => state.app.searchCountry,
  selectObj: state => state.app.selectObj,
  
  token: state => state.user.token,
  // contactDig: state => state.app.contactDig,
}
export default getters
