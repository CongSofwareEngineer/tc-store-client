import { OBSERVER_KEY } from '@/constants/app'
import events from 'events'

// const events = require('events')
const eventEmitter = new events.EventEmitter()

class Observer {
  constructor() {}

  on(key: OBSERVER_KEY, func: any) {
    eventEmitter.on(key, func)
  }

  emit(key: OBSERVER_KEY, object?: any) {
    eventEmitter.emit(key, object)
  }

  removeListener(key: OBSERVER_KEY, func: any = null) {
    eventEmitter.removeListener(key, () => (func ? func() : {}))
  }
}

const ObserverService = new Observer()

Object.freeze(ObserverService)

export default ObserverService
