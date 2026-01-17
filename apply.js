// カーソル色を適用する関数（より強力な方法）
function applyCaretColor() {
  const allInputs = document.querySelectorAll('input, textarea');
  allInputs.forEach(input => {
    // テキストの色も確実に設定（白にならないように）
    if (!input.style.color || input.style.color === 'white' || input.style.color === '#ffffff' || input.style.color === 'rgb(255, 255, 255)') {
      input.style.setProperty('color', '#2c3e50', 'important');
    }
    
    // setPropertyで!importantを設定（より強力）
    // 複数の方法で確実に適用
    input.style.setProperty('caret-color', '#007bff', 'important');
    input.style.setProperty('-webkit-caret-color', '#007bff', 'important'); // WebKit用
    input.style.caretColor = '#007bff'; // 直接設定も追加
    
    // フォーカスイベントでも再適用（確実に適用）
    if (!input.hasAttribute('data-caret-focus-listener')) {
      input.setAttribute('data-caret-focus-listener', 'true');
      const applyColor = function() {
        this.style.setProperty('caret-color', '#007bff', 'important');
        this.style.setProperty('-webkit-caret-color', '#007bff', 'important');
        this.style.caretColor = '#007bff';
        // テキストの色も確認
        if (!this.style.color || this.style.color === 'white' || this.style.color === '#ffffff') {
          this.style.setProperty('color', '#2c3e50', 'important');
        }
      };
      input.addEventListener('focus', applyColor, { once: false });
      input.addEventListener('click', applyColor, { once: false });
      input.addEventListener('input', applyColor, { once: false });
      input.addEventListener('keydown', applyColor, { once: false });
      input.addEventListener('keyup', applyColor, { once: false });
    }
  });
}

// MutationObserverで新しい入力フィールドを監視
function setupCaretColorObserver() {
  const observer = new MutationObserver(function(mutations) {
    // パフォーマンス最適化：実際に入力フィールドが追加された場合のみ適用
    let hasNewInputs = false;
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || 
              node.querySelector && (node.querySelector('input') || node.querySelector('textarea'))) {
            hasNewInputs = true;
          }
        }
      });
    });
    if (hasNewInputs) {
      applyCaretColor();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// 即座に実行（DOMContentLoadedを待たない）
(function() {
  // 即座に1回実行
  applyCaretColor();
  
  // DOMContentLoadedを待たずに、短い間隔で繰り返し実行
  let checkCount = 0;
  const maxChecks = 50; // 最大50回（約2.5秒間）
  const checkInterval = setInterval(function() {
    applyCaretColor();
    checkCount++;
    if (checkCount >= maxChecks) {
      clearInterval(checkInterval);
    }
  }, 50); // 50msごとにチェック
  
  // DOMContentLoadedでも実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyCaretColor();
      setupCaretColorObserver();
      clearInterval(checkInterval); // DOMContentLoaded後は停止
    });
  } else {
    setupCaretColorObserver();
    clearInterval(checkInterval);
  }
})();

// ページ読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {
  // カーソル色を再適用（確実に適用するため）
  applyCaretColor();
  // MutationObserverを設定（既に設定されている場合はスキップ）
  if (!window.caretColorObserverSet) {
    setupCaretColorObserver();
    window.caretColorObserverSet = true;
  }
  
  // requestAnimationFrameでも実行（次のフレームで確実に適用）
  requestAnimationFrame(function() {
    applyCaretColor();
  });
  
  // URLパラメータから情報を取得
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('id');
  
  // バイト情報を取得（detail.jsのデータを使用）
  if (jobId && typeof jobDetails !== 'undefined' && jobDetails[jobId]) {
    const job = jobDetails[jobId];
    document.getElementById('jobTitle').value = job.title;
    document.getElementById('companyName').value = job.company || '';
  }
  
  // フォーム送信処理
  const applyForm = document.getElementById('applyForm');
  applyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // バリデーション
    if (!validateForm()) {
      return;
    }
    
    // フォームデータを取得
    const formData = {
      jobTitle: document.getElementById('jobTitle').value,
      companyName: document.getElementById('companyName').value,
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      availability: document.getElementById('availability').value,
      experience: document.getElementById('experience').value,
      pr: document.getElementById('pr').value,
      agree: document.getElementById('agree').checked
    };
    
    // 送信処理（実際の実装ではサーバーに送信）
    console.log('応募データ:', formData);
    
    // 応募データをlocalStorageに保存
    saveApplication(formData);
    
    // 送信成功メッセージ
    showSuccessMessage();
  });
});

// window.loadイベントでも実行（すべてのリソース読み込み後）
window.addEventListener('load', function() {
  applyCaretColor();
  // 読み込み後も定期的にチェック（最大10回、約1秒間）
  let loadCheckCount = 0;
  const loadCheckInterval = setInterval(function() {
    applyCaretColor();
    loadCheckCount++;
    if (loadCheckCount >= 10) {
      clearInterval(loadCheckInterval);
    }
  }, 100);
});

// pageshowイベントでも実行（ページ遷移後、ブラウザのバック/フォワードキャッシュから復元時にも発火）
window.addEventListener('pageshow', function(event) {
  // バック/フォワードキャッシュから復元された場合も含む
  applyCaretColor();
  // 複数回、少し遅延して再適用（確実に適用するため）
  setTimeout(function() {
    applyCaretColor();
  }, 50);
  setTimeout(function() {
    applyCaretColor();
  }, 100);
  setTimeout(function() {
    applyCaretColor();
  }, 200);
  setTimeout(function() {
    applyCaretColor();
  }, 500);
});

// フォームバリデーション
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const pr = document.getElementById('pr').value.trim();
  const agree = document.getElementById('agree').checked;
  
  // エラーメッセージをクリア
  clearErrors();
  
  let isValid = true;
  
  if (!name) {
    showError('name', 'お名前を入力してください');
    isValid = false;
  }
  
  if (!email) {
    showError('email', 'メールアドレスを入力してください');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('email', '正しいメールアドレスを入力してください');
    isValid = false;
  }
  
  if (!phone) {
    showError('phone', '電話番号を入力してください');
    isValid = false;
  } else if (!isValidPhone(phone)) {
    showError('phone', '正しい電話番号を入力してください（例：090-1234-5678）');
    isValid = false;
  }
  
  if (!pr) {
    showError('pr', '自己PRを入力してください');
    isValid = false;
  } else if (pr.length < 20) {
    showError('pr', '自己PRは20文字以上で入力してください');
    isValid = false;
  }
  
  if (!agree) {
    showError('agree', '個人情報の取り扱いに同意してください');
    isValid = false;
  }
  
  return isValid;
}

// メールアドレスのバリデーション
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 電話番号のバリデーション
function isValidPhone(phone) {
  const phoneRegex = /^[\d-]+$/;
  return phoneRegex.test(phone) && phone.replace(/-/g, '').length >= 10;
}

// エラー表示
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const formGroup = field.closest('.form-group');
  
  field.classList.add('error');
  
  const errorElement = document.createElement('span');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  formGroup.appendChild(errorElement);
}

// エラーをクリア
function clearErrors() {
  const errorFields = document.querySelectorAll('.error');
  errorFields.forEach(field => field.classList.remove('error'));
  
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
}

// 応募データを保存
function saveApplication(formData) {
  // localStorageから既存の応募データを取得
  let applications = JSON.parse(localStorage.getItem('applications') || '[]');
  
  // 新しい応募データを追加（日時も記録）
  const applicationData = {
    ...formData,
    id: Date.now().toString(),
    appliedAt: new Date().toLocaleString('ja-JP')
  };
  
  applications.push(applicationData);
  
  // localStorageに保存
  localStorage.setItem('applications', JSON.stringify(applications));
}

// 成功メッセージ表示
function showSuccessMessage() {
  const form = document.getElementById('applyForm');
  form.style.display = 'none';
  
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.innerHTML = `
    <div class="success-icon">✓</div>
    <h3>応募が完了しました</h3>
    <p>ご応募ありがとうございます。<br>担当者より3営業日以内にご連絡いたします。</p>
    <a href="index.html" class="back-to-top-button">トップページに戻る</a>
  `;
  
  const container = document.querySelector('.apply-container');
  container.appendChild(successMessage);
}
