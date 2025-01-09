export enum TYPE_EVENT {
  message = 'message',
  receivedMessage = 'receivedMessage',
  sendMessage = 'sendMessage',
  clientSendMessage = 'clientSendMessage',
  disconnect = 'disconnect',
  connect = 'connect',
  newMessage = 'newMessage',
  joinRoom = 'joinRoom',
  leaveRoom = 'leaveRoom',
}

export enum DEFAULT_CHAT_ROOM {
  community = 'community',
  admin = 'admin',
  client = 'client',
}
