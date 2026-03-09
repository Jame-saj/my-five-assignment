const issueDetailsModal = document.getElementById('issue-details-modal');
const modalTitle = document.getElementById('modal-title');
const modalStatus = document.getElementById('modal-status');
const modalAuthor = document.getElementById('modal-author');
const modalAuthor2 = document.getElementById('modal-author2');
const modalDate = document.getElementById('modal-date');
const modalDescription = document.getElementById('modal-description');
const modalPriority = document.getElementById('modal-priority');

// fetch data
async function loadIssues() {
  showLoading();
  const allBtn = document.getElementById('all-btn');
  // const allBtn = btn || document.getElementById('all-btn');
  setActiveButton(allBtn);
  const res = await fetch(
    'https://phi-lab-server.vercel.app/api/v1/lab/issues',
  );
  const data = await res.json();
  displayIssue(data.data);
  hideLoading();
}

// display
function displayIssue(issues) {
  const containerIssue = document.getElementById('issue-container');
  const issueCount = document.getElementById('issue-count');
  containerIssue.innerHTML = '';
  issueCount.innerText = issues.length + ' issues';

  issues.forEach(issue => {
    const priorityStatus =
      issue.priority === 'high'
        ? 'bg-red-100 text-red-600'
        : issue.priority === 'medium'
          ? 'bg-orange-100 text-orange-600'
          : 'bg-gray-100 text-gray-500';

    const div = document.createElement('div');
    div.innerHTML = `
         <div class="p-4 border rounded-lg shadow bg-white h-full flex flex-col justify-between">

  <div class="issue-check flex justify-between items-center mb-2">
    ${
      issue.status === 'open'
        ? `<img src="./assets/Open-Status.png" class="w-6">`
        : `<img src="./assets/Closed- Status .png" class="w-6">`
    }
    <span class="px-4 py-2 rounded-full text-sm ${priorityStatus}">
      ${issue.priority.toUpperCase()}
    </span>
  </div>
  <h3 onclick="openIssueModal(${issue.id})"
class="font-semibold mt-2 mb-2 cursor-pointer hover:text-blue-600">
${issue.title}
</h3>
  <p class="text-sm line-clamp-2 text-gray-500 mb-3">
    ${issue.description}
  </p>

  <p>${issue.labels}</p>
  <hr class="my-3 text-gray-300">
  <p>#${issue.id} by ${issue.author}</p>
  <p>${issue.createdAt}</p>
</div>
`;
    containerIssue.appendChild(div);
  });
}

// spinner
const loadingSpinner = document.getElementById('load-spinner');
function showLoading() {
  const containerIssue = document.getElementById('issue-container');
  loadingSpinner.classList.remove('hidden');
  containerIssue.innerHTML = '';
}
function hideLoading() {
  loadingSpinner.classList.add('hidden');
}
// open-close
async function filterStatus(status, btn) {
  showLoading();
  setActiveButton(btn);
  const res = await fetch(
    'https://phi-lab-server.vercel.app/api/v1/lab/issues',
  );

  const data = await res.json();
  const filtered = data.data.filter(issue => issue.status === status);
  displayIssue(filtered);
  hideLoading();
}

// button
function setActiveButton(activeBtn) {
  const allButtons = document.querySelectorAll('#buttons button');
  allButtons.forEach(button => {
    button.classList.remove('btn-primary');
    button.classList.add('btn-outline');
  });

  activeBtn.classList.add('btn-primary');
  activeBtn.classList.remove('btn-outline');
}
///////modal
async function openIssueModal(issueId) {
  const res = await fetch(
    'https://phi-lab-server.vercel.app/api/v1/lab/issues',
  );

  const data = await res.json();

  const issue = data.data.find(item => item.id === issueId);

  modalTitle.innerText = issue.title;
  modalStatus.innerText = issue.status.toUpperCase();
  modalAuthor.innerText = issue.author;
  modalAuthor2.innerText = issue.author;
  modalDate.innerText = issue.createdAt;
  modalDescription.innerText = issue.description;
  modalPriority.innerText = issue.priority.toUpperCase();

  issueDetailsModal.showModal();
}

// call
loadIssues();
