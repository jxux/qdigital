import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'
import setting from './modules/setting'
// import lang from '../store/lang'

const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        setting,
        // lang
    }
})

export default store
