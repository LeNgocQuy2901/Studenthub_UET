// Service Worker for Push Notifications

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push received:', event);

  let data = {
    title: 'Thông báo mới',
    body: 'Bạn có thông báo mới',
    icon: '/logo192.png',
    badge: '/logo192.png',
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/logo192.png',
    badge: data.badge || '/logo192.png',
    vibrate: [100, 50, 100],
    data: data,
    actions: [
      { action: 'open', title: 'Xem chi tiết' },
      { action: 'close', title: 'Đóng' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click:', event);

  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Open the app or focus existing window
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clientList) {
        // If a window is already open, focus it
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if ('focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker] Push subscription changed');
  // Handle subscription change - re-subscribe if needed
});
