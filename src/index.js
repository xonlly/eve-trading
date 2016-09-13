
import config           from './config'
import getter           from './getter'
import Mysql            from './utils/mysql'
import EventEmitter     from 'events'

import Storage          from './storage'

export default (() => {


    const tools = {
        ee:    new EventEmitter(),
        mysql: new Mysql( config ),
    }

    tools.getters = getter({ config, tools })

    Storage({ config, tools })


})()
