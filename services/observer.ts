/* eslint-disable no-undef */

import { ObserverKey } from "@/constant/app"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const events = require('events')
const eventEmitter = new events.EventEmitter()

class Observer {

  constructor() { }

  on(key: ObserverKey, func: any) {
    eventEmitter.on(key, func)
  }

  emit(key: ObserverKey, object?: any) {
    eventEmitter.emit(key, object)
  }

  removeListener(key: ObserverKey, func: any = null) {
    eventEmitter.removeListener(key, () => func ? func() : {})
  }
}

const ObserverService = new Observer()
Object.freeze(ObserverService)

export default ObserverService
