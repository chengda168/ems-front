/**
 * Created by kernnel on 2017/4/28.
 */
const getters = {
  lang: state => state.app.lang,
  collapse: state => state.app.collapse,
  
  token: state => state.user.token,
}
export default getters
