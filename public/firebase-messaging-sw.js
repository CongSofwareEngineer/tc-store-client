importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

const firebaseConfig = JSON.parse(new URL(location).searchParams.get('firebaseConfig'))

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  if (payload?.data?.title) {
    const notificationTitle = payload?.data?.title
    const notificationOptions = {
      body: payload?.data?.body || null,
      icon: payload?.data?.icon || './192x192.png',
      actions: [
        {
          action: 'action',
          title: payload.data?.titleConfirm || 'Confirm',
        },
      ],
    }
    self.registration.showNotification(notificationTitle, notificationOptions)

    self.addEventListener('notificationclick', (event) => {
      event.notification.close()
      event.waitUntil(
        clients
          .matchAll({
            type: 'window',
          })
          .then((clientList) => {
            for (const client of clientList) {
              if (client.url === '/' && 'focus' in client) return client.focus()
            }
            if (clients.openWindow) {
              return clients.openWindow(payload.data?.link_confirm)
            }
          })
      )
    })
  }
})
