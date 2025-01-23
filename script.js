let isProcessing = false;

document.getElementById('delete-btn').addEventListener('click', async () => {
    if (isProcessing) return;

    const webhookUrl = document.getElementById('webhook-url').value;
    if (!webhookUrl) {
        showNotification('Please enter a valid webhook URL.', 'error');
        return;
    }

    isProcessing = true;
    try {
        const response = await fetch(webhookUrl, { method: 'DELETE' });
        if (response.ok) {
            showNotification('Webhook deleted successfully!', 'success');
        } else {
            showNotification(`Failed to delete webhook. Status: ${response.status}`, 'error');
        }
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        isProcessing = false;
    }
});

function showNotification(message, type) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.classList.add('notification', type);

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    notification.textContent = message;
    notification.appendChild(progressBar);
    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slide-out 0.5s forwards';
        notification.addEventListener('animationend', () => {
            notification.remove();
        });
    }, 3000);
}


const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let cursorX = 0;
let cursorY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (e) => {
  targetX = e.pageX;
  targetY = e.pageY;
});

function animateCursor() {
  cursorX += (targetX - cursorX) * 0.15;
  cursorY += (targetY - cursorY) * 0.15;
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener('mousedown', () => {
  cursor.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('clicked');
});

document.addEventListener('mouseover', (e) => {
  if (e.target.matches('input, textarea')) {
    cursor.classList.add('text-pointer');
  } else if (e.target.matches('p, span, div')) {
    cursor.classList.add('text-pointer');
  } else {
    cursor.classList.add('expanded');
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.matches('input, textarea, p, span, div')) {
    cursor.classList.remove('text-pointer');
  } else {
    cursor.classList.remove('expanded');
  }
});