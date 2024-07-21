document.getElementById('saveButton').addEventListener('click', () => {
  const selectedModel = document.getElementById('modelSelect').value;
  chrome.storage.sync.set({ currentModel: selectedModel }, () => {
    console.log(`モデルが${selectedModel}に設定されました`);
  });
});