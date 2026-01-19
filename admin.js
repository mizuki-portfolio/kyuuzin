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
    input.style.setProperty('caret-color', '#ff6b35', 'important');
    input.style.setProperty('-webkit-caret-color', '#ff6b35', 'important'); // WebKit用
    input.style.caretColor = '#ff6b35'; // 直接設定も追加
    
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
  
  // タブ切り替えの処理
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // タブボタンの状態を更新
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // タブコンテンツの表示を切り替え
      tabContents.forEach(content => content.classList.remove('active'));
      if (targetTab === 'applications') {
        document.getElementById('applicationsTab').classList.add('active');
        currentApplicationsPage = 1;
        loadApplications(1);
        setupApplicationsPagination();
        // カーソル色を再適用
        setTimeout(() => {
          if (typeof applyCaretColor === 'function') {
            applyCaretColor();
          }
        }, 0);
        setTimeout(() => {
          if (typeof applyCaretColor === 'function') {
            applyCaretColor();
          }
        }, 100);
      } else if (targetTab === 'contacted') {
        document.getElementById('contactedTab').classList.add('active');
        loadContactedApplications();
        // カーソル色を再適用
        setTimeout(() => {
          if (typeof applyCaretColor === 'function') {
            applyCaretColor();
          }
        }, 0);
        setTimeout(() => {
          if (typeof applyCaretColor === 'function') {
            applyCaretColor();
          }
        }, 100);
      } else if (targetTab === 'jobs') {
        document.getElementById('jobsTab').classList.add('active');
        // タブ表示後に検索機能を設定（即座に実行）
        if (window.setupJobSearch) {
          window.setupJobSearch();
        }
        if (window.setupPagination) {
          window.setupPagination();
        }
        currentPage = 1; // ページをリセット
        if (window.filterJobs) {
          window.filterJobs(currentPage);
        } else {
          loadJobs();
        }
        // カーソル色を再適用
        setTimeout(() => {
          if (typeof applyCaretColor === 'function') {
            applyCaretColor();
          }
        }, 0);
        setTimeout(() => {
          if (typeof applyCaretColor === 'function') {
            applyCaretColor();
          }
        }, 100);
      }
    });
  });
  
  loadApplications(1);
  setupApplicationsPagination();
  
  // 新規追加ボタンのイベント（存在する場合のみ）
  const addNewBtn = document.getElementById('addNewBtn');
  if (addNewBtn) {
    addNewBtn.addEventListener('click', function() {
      if (typeof openEditModal === 'function') {
        openEditModal(null);
      }
    });
  }
  
  // すべて削除ボタンのイベント（存在する場合のみ）
  const clearAllBtn = document.getElementById('clearAllBtn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', function() {
      if (confirm('すべての応募データを削除しますか？この操作は元に戻せません。')) {
        localStorage.removeItem('applications');
        loadApplications();
        alert('すべての応募データを削除しました。');
      }
    });
  }
  
  // バイト求人新規追加ボタンのイベント（存在する場合のみ）
  const addNewJobBtn = document.getElementById('addNewJobBtn');
  if (addNewJobBtn) {
    addNewJobBtn.addEventListener('click', function() {
      if (typeof openEditJobModal === 'function') {
        openEditJobModal(null);
      }
    });
  }
  
  // バイト求人検索機能の初期化関数
  function setupJobSearch() {
    const jobSearchInput = document.getElementById('jobSearchInput');
    
    if (jobSearchInput) {
      // 既にイベントリスナーが設定されている場合はスキップ（重複防止）
      if (jobSearchInput.hasAttribute('data-search-listener')) {
        return;
      }
      
      // デバウンス用のタイマー
      let searchTimeout = null;
      
      // 検索実行関数
      const handleSearch = function() {
        currentPage = 1; // 検索時は1ページ目に戻る
        if (typeof window.filterJobs === 'function') {
          window.filterJobs(currentPage);
        } else if (typeof filterJobs === 'function') {
          filterJobs(currentPage);
        }
      };
      
      // イベントリスナーを設定（デバウンス付き）
      jobSearchInput.addEventListener('input', function(e) {
        e.stopPropagation();
        // 既存のタイマーをクリア
        if (searchTimeout) {
          clearTimeout(searchTimeout);
        }
        // 300ms後に検索実行（入力が止まってから）
        searchTimeout = setTimeout(handleSearch, 300);
      });
      
      // 検索入力欄のカーソル色を確保（より強力な方法）
      jobSearchInput.style.setProperty('caret-color', '#ff6b35', 'important');
      jobSearchInput.style.setProperty('-webkit-caret-color', '#ff6b35', 'important');
      jobSearchInput.style.caretColor = '#ff6b35';
      jobSearchInput.style.color = '#2c3e50';
      
      // フォーカスイベントでも再適用
      if (!jobSearchInput.hasAttribute('data-caret-focus-listener')) {
        jobSearchInput.setAttribute('data-caret-focus-listener', 'true');
        const applyColor = function() {
          this.style.setProperty('caret-color', '#ff6b35', 'important');
          this.style.setProperty('-webkit-caret-color', '#ff6b35', 'important');
          this.style.caretColor = '#ff6b35';
        };
        jobSearchInput.addEventListener('focus', applyColor, { once: false });
        jobSearchInput.addEventListener('click', applyColor, { once: false });
        jobSearchInput.addEventListener('input', applyColor, { once: false });
      }
      
      // 初期化済みフラグを設定
      jobSearchInput.setAttribute('data-search-listener', 'true');
    }
  }
  
  // グローバルスコープに公開（タブ切り替え時にも使用）
  window.setupJobSearch = setupJobSearch;
  
  // 初回設定は即座に実行（タブが表示されている場合のみ）
  if (document.getElementById('jobsTab') && document.getElementById('jobsTab').classList.contains('active')) {
    setupJobSearch();
    setupPagination();
  }
  
  // バイト求人編集フォームの送信処理
  const editJobForm = document.getElementById('editJobForm');
  editJobForm.addEventListener('submit', function(e) {
    e.preventDefault();
    saveJob();
  });
  
  // バイト求人編集モーダルの外側クリックで閉じる
  const jobModal = document.getElementById('editJobModal');
  jobModal.addEventListener('click', function(e) {
    if (e.target === jobModal) {
      closeEditJobModal();
    }
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

// 応募管理用のページネーション変数
let currentApplicationsPage = 1;
const applicationsItemsPerPage = 20;

// 未連絡の応募データを読み込んで表示（ページネーション対応）
function loadApplications(page = 1) {
  const applications = JSON.parse(localStorage.getItem('applications') || '[]');
  const applicationsList = document.getElementById('applicationsList');
  const noApplications = document.getElementById('noApplications');
  const applicationsPagination = document.getElementById('applicationsPagination');
  
  // 未連絡の応募のみをフィルター
  const notContacted = applications.filter(app => !app.contacted);
  
  // 未連絡の応募を表示
  if (notContacted.length === 0) {
    applicationsList.innerHTML = '';
    noApplications.style.display = 'block';
    if (applicationsPagination) applicationsPagination.style.display = 'none';
  } else {
    noApplications.style.display = 'none';
    
    // 日時でソート（新しい順）
    const sortedNotContacted = notContacted.slice().sort((a, b) => {
      return new Date(b.appliedAt) - new Date(a.appliedAt);
    });
    
    // ページネーション処理
    const totalPages = Math.ceil(sortedNotContacted.length / applicationsItemsPerPage);
    currentApplicationsPage = Math.max(1, Math.min(page, totalPages));
    
    const startIndex = (currentApplicationsPage - 1) * applicationsItemsPerPage;
    const endIndex = startIndex + applicationsItemsPerPage;
    const paginatedApplications = sortedNotContacted.slice(startIndex, endIndex);
    
    // ページネーションUIを表示/非表示
    if (applicationsPagination) {
      if (sortedNotContacted.length > applicationsItemsPerPage) {
        applicationsPagination.style.display = 'flex';
        updateApplicationsPaginationUI(currentApplicationsPage, totalPages);
      } else {
        applicationsPagination.style.display = 'none';
      }
    }
    
    // 未連絡の応募カードを生成
    applicationsList.innerHTML = paginatedApplications.map(app => `
    <div class="application-card ${app.contacted ? 'contacted' : ''}">
      <div class="application-header">
        <div class="application-title-group">
          <h3 class="application-job-title">${app.jobTitle || '未設定'}</h3>
          <span class="application-company">${app.companyName || '未設定'}</span>
          ${app.contacted ? '<span class="contacted-badge">連絡済み</span>' : ''}
        </div>
        <div class="application-actions">
          <button class="delete-btn" onclick="deleteApplication('${app.id}')">削除</button>
        </div>
      </div>
      
      <div class="application-body">
        <div class="application-info-grid">
          <div class="info-row">
            <span class="info-label">応募日時</span>
            <span class="info-value">${app.appliedAt || '未設定'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">お名前</span>
            <span class="info-value">${app.name || '未設定'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">メールアドレス</span>
            <span class="info-value">${app.email || '未設定'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">電話番号</span>
            <span class="info-value">${app.phone || '未設定'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">希望勤務時間</span>
            <span class="info-value">${app.availability || '未選択'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">経験</span>
            <span class="info-value">${app.experience || '未選択'}</span>
          </div>
        </div>
        
        <div class="application-pr">
          <span class="info-label">自己PR</span>
          <p class="pr-text">${app.pr || '未記入'}</p>
        </div>
        
        <div class="contact-section">
          <div class="contact-checkbox-group">
            <label class="contact-checkbox-label">
              <input type="checkbox" class="contact-checkbox" ${app.contacted ? 'checked' : ''} onchange="toggleContacted('${app.id}', this.checked)">
              <span>担当に連絡済み</span>
            </label>
          </div>
          <div class="contact-note-group">
            <label class="contact-note-label">連絡メモ</label>
            <textarea class="contact-note" placeholder="連絡内容やメモを記入してください" onblur="saveContactNote('${app.id}', this.value)" style="caret-color: #007bff;">${app.contactNote || ''}</textarea>
          </div>
        </div>
      </div>
    </div>
  `).join('');
    
    // カーソル色を再適用
    setTimeout(() => {
      if (typeof applyCaretColor === 'function') {
        applyCaretColor();
      }
    }, 0);
  }
}

// 連絡済みの応募データを読み込んで表示（店舗ごと）
function loadContactedApplications() {
  const applications = JSON.parse(localStorage.getItem('applications') || '[]');
  const contactedApplicationsList = document.getElementById('contactedApplicationsList');
  const noContactedApplications = document.getElementById('noContactedApplications');
  
  // 連絡済みの応募のみをフィルター
  const contacted = applications.filter(app => app.contacted);
  
  // 連絡済みの応募を店舗ごとにグループ化して表示
  if (contacted.length === 0) {
    contactedApplicationsList.innerHTML = '';
    noContactedApplications.style.display = 'block';
  } else {
    noContactedApplications.style.display = 'none';
    
    // 店舗（会社）ごとにグループ化
    const groupedByCompany = {};
    contacted.forEach(app => {
      const company = app.companyName || '未設定';
      if (!groupedByCompany[company]) {
        groupedByCompany[company] = [];
      }
      groupedByCompany[company].push(app);
    });
    
    // 各店舗ごとにソート（新しい順）
    Object.keys(groupedByCompany).forEach(company => {
      groupedByCompany[company].sort((a, b) => {
        return new Date(b.appliedAt) - new Date(a.appliedAt);
      });
    });
    
    // 店舗ごとのセクションを生成
    contactedApplicationsList.innerHTML = Object.keys(groupedByCompany).map(company => {
      const companyApps = groupedByCompany[company];
      return `
        <div class="company-group">
          <h4 class="company-group-title">${company} (${companyApps.length}件)</h4>
          <div class="company-applications">
            ${companyApps.map(app => `
              <div class="application-card contacted">
                <div class="application-header">
                  <div class="application-title-group">
                    <h3 class="application-job-title">${app.jobTitle || '未設定'}</h3>
                    <span class="application-company">${app.companyName || '未設定'}</span>
                    <span class="contacted-badge">連絡済み</span>
                  </div>
                  <div class="application-actions">
                    <button class="delete-btn" onclick="deleteApplication('${app.id}')">削除</button>
                  </div>
                </div>
                
                <div class="application-body">
                  <div class="application-info-grid">
                    <div class="info-row">
                      <span class="info-label">応募日時</span>
                      <span class="info-value">${app.appliedAt || '未設定'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">お名前</span>
                      <span class="info-value">${app.name || '未設定'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">メールアドレス</span>
                      <span class="info-value">${app.email || '未設定'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">電話番号</span>
                      <span class="info-value">${app.phone || '未設定'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">希望勤務時間</span>
                      <span class="info-value">${app.availability || '未選択'}</span>
                    </div>
                    <div class="info-row">
                      <span class="info-label">経験</span>
                      <span class="info-value">${app.experience || '未選択'}</span>
                    </div>
                  </div>
                  
                  <div class="application-pr">
                    <span class="info-label">自己PR</span>
                    <p class="pr-text">${app.pr || '未記入'}</p>
                  </div>
                  
                  <div class="contact-section">
                    <div class="contact-checkbox-group">
                      <label class="contact-checkbox-label">
                        <input type="checkbox" class="contact-checkbox" checked onchange="toggleContacted('${app.id}', this.checked)">
                        <span>担当に連絡済み</span>
                      </label>
                    </div>
                    <div class="contact-note-group">
                      <label class="contact-note-label">連絡メモ</label>
                      <textarea class="contact-note" placeholder="連絡内容やメモを記入してください" onblur="saveContactNote('${app.id}', this.value)" style="caret-color: #007bff;">${app.contactNote || ''}</textarea>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
    
    // カーソル色を再適用（複数回適用して確実に）
    setTimeout(() => {
      if (typeof applyCaretColor === 'function') {
        applyCaretColor();
      }
    }, 0);
    setTimeout(() => {
      if (typeof applyCaretColor === 'function') {
        applyCaretColor();
      }
    }, 50);
    setTimeout(() => {
      if (typeof applyCaretColor === 'function') {
        applyCaretColor();
      }
    }, 100);
  }
}

// 連絡済み状態を切り替え
function toggleContacted(applicationId, contacted) {
  const applications = JSON.parse(localStorage.getItem('applications') || '[]');
  const app = applications.find(a => a.id === applicationId);
  
  if (app) {
    app.contacted = contacted;
    if (!contacted) {
      // 連絡済みを解除する場合はメモもクリアするか確認
      // app.contactNote = '';
    }
    localStorage.setItem('applications', JSON.stringify(applications));
    currentApplicationsPage = 1;
    loadApplications(1);
    // 応募一覧タブが表示されている場合は、そちらも更新
    if (document.getElementById('contactedTab').classList.contains('active')) {
      loadContactedApplications();
    }
  }
}

// 連絡メモを保存
function saveContactNote(applicationId, note) {
  const applications = JSON.parse(localStorage.getItem('applications') || '[]');
  const app = applications.find(a => a.id === applicationId);
  
  if (app) {
    app.contactNote = note;
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // カーソル色を再適用
    setTimeout(() => {
      if (typeof applyCaretColor === 'function') {
        applyCaretColor();
      }
    }, 0);
  }
}

// 応募データを削除
function deleteApplication(applicationId) {
  if (!confirm('この応募データを削除しますか？')) {
    return;
  }
  
  const applications = JSON.parse(localStorage.getItem('applications') || '[]');
  const filteredApplications = applications.filter(app => app.id !== applicationId);
  localStorage.setItem('applications', JSON.stringify(filteredApplications));
  
  // 削除後にページを調整
  const notContacted = filteredApplications.filter(app => !app.contacted);
  const totalPages = Math.ceil(notContacted.length / applicationsItemsPerPage);
  if (currentApplicationsPage > totalPages && totalPages > 0) {
    currentApplicationsPage = totalPages;
  }
  loadApplications(currentApplicationsPage);
  alert('応募データを削除しました。');
}

// 応募管理のページネーションUIを更新
function updateApplicationsPaginationUI(page, totalPages) {
  const pageInfo = document.getElementById('applicationsPageInfo');
  const prevPageBtn = document.getElementById('prevApplicationsPageBtn');
  const nextPageBtn = document.getElementById('nextApplicationsPageBtn');
  
  if (pageInfo) {
    pageInfo.textContent = `${page} / ${totalPages}`;
  }
  
  if (prevPageBtn) {
    prevPageBtn.disabled = page <= 1;
  }
  
  if (nextPageBtn) {
    nextPageBtn.disabled = page >= totalPages;
  }
}

// 応募管理のページネーションのイベントリスナーを設定
function setupApplicationsPagination() {
  const prevPageBtn = document.getElementById('prevApplicationsPageBtn');
  const nextPageBtn = document.getElementById('nextApplicationsPageBtn');
  
  // メインの先頭にスクロールする関数
  function scrollToMainTop() {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const mainTop = mainElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, mainTop);
    }
  }
  
  if (prevPageBtn && !prevPageBtn.hasAttribute('data-pagination-initialized')) {
    prevPageBtn.addEventListener('click', function() {
      if (currentApplicationsPage > 1) {
        loadApplications(currentApplicationsPage - 1);
        setTimeout(scrollToMainTop, 100);
      }
    });
    prevPageBtn.setAttribute('data-pagination-initialized', 'true');
  }
  
  if (nextPageBtn && !nextPageBtn.hasAttribute('data-pagination-initialized')) {
    nextPageBtn.addEventListener('click', function() {
      const applications = JSON.parse(localStorage.getItem('applications') || '[]');
      const notContacted = applications.filter(app => !app.contacted);
      const totalPages = Math.ceil(notContacted.length / applicationsItemsPerPage);
      
      if (currentApplicationsPage < totalPages) {
        loadApplications(currentApplicationsPage + 1);
        setTimeout(scrollToMainTop, 100);
      }
    });
    nextPageBtn.setAttribute('data-pagination-initialized', 'true');
  }
}

// ========== バイト求人管理機能 ==========

// バイト求人データを読み込んで表示
function loadJobs() {
  currentPage = 1; // ページをリセット
  filterJobs(currentPage);
}

// ページネーション用の変数
let currentPage = 1;
const itemsPerPage = 20;

// バイト求人を検索・フィルタリングして表示（グローバルスコープ）
function filterJobs(page = 1) {
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  const jobsList = document.getElementById('jobsList');
  const noJobs = document.getElementById('noJobs');
  const noJobResults = document.getElementById('noJobResults');
  const totalJobCount = document.getElementById('totalJobCount');
  const jobSearchInput = document.getElementById('jobSearchInput');
  const jobsPagination = document.getElementById('jobsPagination');
  
  // 検索キーワードを取得
  const searchTerm = jobSearchInput && jobSearchInput.value ? jobSearchInput.value.toLowerCase().trim() : '';
  
  // 総数を表示（フィルタリング前）
  if (totalJobCount) {
    totalJobCount.textContent = jobs.length;
  }
  
  if (jobs.length === 0) {
    if (jobsList) jobsList.innerHTML = '';
    if (jobsPagination) jobsPagination.style.display = 'none';
    if (noJobs) noJobs.style.display = 'block';
    if (noJobResults) noJobResults.style.display = 'none';
    return;
  }
  
  if (noJobs) noJobs.style.display = 'none';
  
  // 検索でフィルタリング
  let filteredJobs = jobs;
  if (searchTerm) {
    filteredJobs = jobs.filter(job => {
      const title = (job.title || '').toLowerCase();
      const company = (job.company || '').toLowerCase();
      const type = (job.type || '').toLowerCase();
      const location = (job.location || '').toLowerCase();
      const appeal = (job.appeal || '').toLowerCase();
      const comment = (job.comment || '').toLowerCase();
      
      return title.includes(searchTerm) ||
             company.includes(searchTerm) ||
             type.includes(searchTerm) ||
             location.includes(searchTerm) ||
             appeal.includes(searchTerm) ||
             comment.includes(searchTerm);
    });
  }
  
  // 検索結果がない場合
  if (filteredJobs.length === 0) {
    if (jobsList) jobsList.innerHTML = '';
    if (jobsPagination) jobsPagination.style.display = 'none';
    if (noJobs) noJobs.style.display = 'none';
    if (noJobResults) noJobResults.style.display = 'block';
    return;
  }
  
  if (noJobResults) noJobResults.style.display = 'none';
  
  // IDでソート（新しい順）- 元の配列を変更しないようにsliceでコピー
  const sortedJobs = filteredJobs.slice().sort((a, b) => b.id - a.id);
  
  // ページネーション処理
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage);
  currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = sortedJobs.slice(startIndex, endIndex);
  
  // ページネーションUIを表示/非表示
  if (jobsPagination) {
    if (sortedJobs.length > itemsPerPage) {
      jobsPagination.style.display = 'flex';
      updatePaginationUI(currentPage, totalPages);
    } else {
      jobsPagination.style.display = 'none';
    }
  }
  
  // バイト求人カードを生成
  if (jobsList) {
    jobsList.innerHTML = paginatedJobs.map(job => `
    <div class="application-card">
      <div class="application-header">
        <div class="application-title-group">
          <h3 class="application-job-title">${job.title || '未設定'}</h3>
          <span class="application-company">${job.company || '未設定'}</span>
        </div>
        <div class="application-actions">
          <button class="edit-btn" onclick="openEditJobModal('${job.id}')">編集</button>
          <button class="delete-btn" onclick="deleteJob('${job.id}')">削除</button>
        </div>
      </div>
      
      <div class="application-body">
        <div class="application-info-grid">
          <div class="info-row">
            <span class="info-label">種類</span>
            <span class="info-value">${job.type || '未設定'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">給与</span>
            <span class="info-value">${job.salary || '未設定'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">勤務地</span>
            <span class="info-value">${job.location || '未設定'}</span>
          </div>
          <div class="info-row">
            <span class="info-label">アピール</span>
            <span class="info-value">${job.appeal || '未設定'}</span>
          </div>
        </div>
        
        <div class="application-pr">
          <span class="info-label">コメント</span>
          <p class="pr-text">${job.comment || '未記入'}</p>
        </div>
      </div>
    </div>
  `).join('');
  }
}

// ページネーションUIを更新
function updatePaginationUI(currentPage, totalPages) {
  const pageInfo = document.getElementById('pageInfo');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  
  if (pageInfo) {
    pageInfo.textContent = `${currentPage} / ${totalPages}`;
  }
  
  if (prevPageBtn) {
    prevPageBtn.disabled = currentPage === 1;
    prevPageBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
    prevPageBtn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
  }
  
  if (nextPageBtn) {
    nextPageBtn.disabled = currentPage === totalPages;
    nextPageBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
    nextPageBtn.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
  }
}

// ページネーション用のイベントリスナー設定（DOMContentLoaded内で呼び出す）
function setupPagination() {
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  
  // バイト求人リストの先頭にスクロールする関数
  function scrollToJobsListTop() {
    const jobsList = document.getElementById('jobsList');
    if (jobsList) {
      const jobsListTop = jobsList.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, jobsListTop);
    }
  }
  
  if (prevPageBtn && !prevPageBtn.hasAttribute('data-pagination-initialized')) {
    prevPageBtn.addEventListener('click', function() {
      if (currentPage > 1) {
        filterJobs(currentPage - 1);
        setTimeout(scrollToJobsListTop, 100);
      }
    });
    prevPageBtn.setAttribute('data-pagination-initialized', 'true');
  }
  
  if (nextPageBtn && !nextPageBtn.hasAttribute('data-pagination-initialized')) {
    nextPageBtn.addEventListener('click', function() {
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const jobSearchInput = document.getElementById('jobSearchInput');
      const searchTerm = jobSearchInput && jobSearchInput.value ? jobSearchInput.value.toLowerCase().trim() : '';
      
      let filteredJobs = jobs;
      if (searchTerm) {
        filteredJobs = jobs.filter(job => {
          const title = (job.title || '').toLowerCase();
          const company = (job.company || '').toLowerCase();
          const type = (job.type || '').toLowerCase();
          const location = (job.location || '').toLowerCase();
          const appeal = (job.appeal || '').toLowerCase();
          const comment = (job.comment || '').toLowerCase();
          
          return title.includes(searchTerm) || company.includes(searchTerm) ||
                 type.includes(searchTerm) || location.includes(searchTerm) ||
                 appeal.includes(searchTerm) || comment.includes(searchTerm);
        });
      }
      
      const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
      if (currentPage < totalPages) {
        filterJobs(currentPage + 1);
        setTimeout(scrollToJobsListTop, 100);
      }
    });
    nextPageBtn.setAttribute('data-pagination-initialized', 'true');
  }
}

// グローバルスコープに公開
window.filterJobs = filterJobs;
window.setupPagination = setupPagination;

// バイト求人編集モーダルを開く
function openEditJobModal(jobId) {
  const modal = document.getElementById('editJobModal');
  const modalTitle = document.getElementById('modalJobTitle');
  const form = document.getElementById('editJobForm');
  
  if (jobId) {
    // 編集モード
    modalTitle.textContent = 'バイト求人を編集';
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const job = jobs.find(j => j.id == jobId);
    
    if (job) {
      document.getElementById('editJobId').value = job.id || '';
      document.getElementById('editJobTitleInput').value = job.title || '';
      document.getElementById('editJobType').value = job.type || '';
      document.getElementById('editJobSalary').value = job.salary || '';
      document.getElementById('editJobLocation').value = job.location || '';
      document.getElementById('editJobNearestStation').value = job.nearestStation || '';
      document.getElementById('editJobCompany').value = job.company || '';
      document.getElementById('editJobImage').value = job.image || '';
      document.getElementById('editJobAppeal').value = job.appeal || '';
      document.getElementById('editJobComment').value = job.comment || '';
      
      // 詳細情報を取得（jobDetailsから）
      const jobDetails = JSON.parse(localStorage.getItem('jobDetails') || '{}');
      const detail = jobDetails[jobId.toString()];
      if (detail) {
        document.getElementById('editJobWorkTime').value = detail.workTime || '';
        document.getElementById('editJobNearestStation').value = detail.nearestStation || job.nearestStation || '';
        document.getElementById('editJobDescription').value = detail.description || '';
        document.getElementById('editJobRequirements').value = detail.requirements || '';
        document.getElementById('editJobBenefits').value = detail.benefits || '';
      }
    }
  } else {
    // 新規追加モード
    modalTitle.textContent = '新規バイト求人を追加';
    form.reset();
    document.getElementById('editJobId').value = '';
  }
  
  modal.style.display = 'flex';
}

// バイト求人編集モーダルを閉じる
function closeEditJobModal() {
  const modal = document.getElementById('editJobModal');
  modal.style.display = 'none';
  document.getElementById('editJobForm').reset();
}

// バイト求人を保存
function saveJob() {
  const id = document.getElementById('editJobId').value;
  const formData = {
    title: document.getElementById('editJobTitleInput').value,
    type: document.getElementById('editJobType').value,
    salary: document.getElementById('editJobSalary').value,
    location: document.getElementById('editJobLocation').value,
    nearestStation: document.getElementById('editJobNearestStation').value,
    company: document.getElementById('editJobCompany').value,
    image: document.getElementById('editJobImage').value || 'https://via.placeholder.com/400x250?text=バイト画像',
    appeal: document.getElementById('editJobAppeal').value,
    comment: document.getElementById('editJobComment').value
  };
  
  const detailData = {
    title: formData.title,
    type: 'アルバイト',
    salary: formData.salary,
    location: formData.location,
    nearestStation: formData.nearestStation,
    company: formData.company,
    workTime: document.getElementById('editJobWorkTime').value || '',
    description: document.getElementById('editJobDescription').value || '',
    requirements: document.getElementById('editJobRequirements').value || '',
    benefits: document.getElementById('editJobBenefits').value || '',
    contact: '応募は下記のボタンからお願いします'
  };
  
  let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  let jobDetails = JSON.parse(localStorage.getItem('jobDetails') || '{}');
  
  if (id) {
    // 編集モード：既存データを更新
    const index = jobs.findIndex(j => j.id == id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...formData };
      jobDetails[id.toString()] = { ...jobDetails[id.toString()], ...detailData };
    }
  } else {
    // 新規追加モード
    const newId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1;
    const newJob = {
      ...formData,
      id: newId
    };
    jobs.push(newJob);
    jobDetails[newId.toString()] = detailData;
  }
  
  localStorage.setItem('jobs', JSON.stringify(jobs));
  localStorage.setItem('jobDetails', JSON.stringify(jobDetails));
  
  // グローバル変数を更新（ページリロード不要にするため）
  if (typeof window.refreshJobsData === 'function') {
    window.refreshJobsData();
  }
  
  currentPage = 1; // 新規追加・編集時は1ページ目に戻る
  loadJobs();
  closeEditJobModal();
  alert(id ? 'バイト求人を更新しました。' : 'バイト求人を追加しました。');
}

// バイト求人を削除
function deleteJob(jobId) {
  if (!confirm('このバイト求人を削除しますか？')) {
    return;
  }
  
  let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  let jobDetails = JSON.parse(localStorage.getItem('jobDetails') || '{}');
  
  jobs = jobs.filter(j => j.id != jobId);
  delete jobDetails[jobId.toString()];
  
  localStorage.setItem('jobs', JSON.stringify(jobs));
  localStorage.setItem('jobDetails', JSON.stringify(jobDetails));
  
  // 削除後、現在のページが存在しない場合は前のページに移動
  const remainingJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  const totalPages = Math.ceil(remainingJobs.length / itemsPerPage);
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }
  
  filterJobs(currentPage);
  alert('バイト求人を削除しました。');
}
