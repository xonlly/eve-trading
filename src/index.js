
import config from './config'
import mysql from 'mysql'
import getter from './getter'

export default (() => {

    const connMysql = mysql.createConnection( config.mysql )

    connMysql.connect()

    const tools = {
        mysql : connMysql,
    }

    console.log('whty')

    getter({ config, tools })


})()
