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
          title: payload.data?.titleConfirm || 'Kiểm tra',
        },
      ],
    }
    self.registration.showNotification(notificationTitle, notificationOptions)


  }
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const notificationData = event.notification.data;

  if (notificationData?.url) {
    event.waitUntil(
      clients.openWindow(notificationData.url) // Open the URL in a new window/tab
    );
  } else {
    // Default behavior: Open the app's root URL
    event.waitUntil(
      clients.openWindow('/') // Replace '/' with your app's root URL
    );
  }
})
