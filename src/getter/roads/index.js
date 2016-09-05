
export default ( ...args ) => ({
    item_history:  new (require('./item_history').default)( ...args ),
    item_orders:   new (require('./item_orders').default)( ...args ),
    item_prices:   new (require('./item_prices').default)( ...args ),
    region_id:     new (require('./region_id').default)( ...args ),
    solar_systems: new (require('./solar_systems').default)( ...args ),
    station_rank:  new (require('./station_rank').default)( ...args ),
})
