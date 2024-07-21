chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ currentModel: 'gpt4o' });
  });
  
  chrome.commands.onCommand.addListener((command) => {
    if (command === "switch_model") {
      switchModel();
    }
  });
  
  function switchModel() {
    chrome.storage.sync.get('currentModel', (data) => {
      const newModel = data.currentModel === 'gpt4o' ? 'claude2' : 'gpt4o';
      updateModelSetting(newModel);
    });
  }
  
  function updateModelSetting(model) {
    fetch('https://www.perplexity.ai/p/api/v1/user/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 認証ヘッダーを追加する必要があります
      },
      body: JSON.stringify({
        default_model: model,
        // その他の必要なデータ
      })
    })
    .then(response => response.json())
    .then(data => {
      chrome.storage.sync.set({ currentModel: model });
      // ユーザーに成功メッセージを表示
      console.log(`モデルが${model}に切り替わりました`);
    })
    .catch(error => {
      console.error('Error:', error);
      // ユーザーにエラーメッセージを表示
    });
  }