window.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    #nuage-spinner {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: #121212;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader {
      border: 8px solid #f3f3f3;
      border-top: 8px solid #7abaff;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1.2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  const spinner = document.createElement('div');
  spinner.id = 'nuage-spinner';
  spinner.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(spinner);

  window.addEventListener('load', () => {
    setTimeout(() => {
      const s = document.getElementById('nuage-spinner');
      if (s) s.remove();
    }, 500);
  });
});
