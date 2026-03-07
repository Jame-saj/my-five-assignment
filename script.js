// https://phi-lab-server.vercel.app/api/v1/lab/issues
async function allButtons()
{
  const res = await fetch(
    ' https://phi-lab-server.vercel.app/api/v1/lab/issues',
  );
  const data = await res.json();
  // console.log(data.data);
  displayIssue(data.data);
  
}
function displayIssue(issues) {
  const containerIssue = document.getElementById('issue-container');
  containerIssue.innerHTML = '';
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

  <h3 class="font-semibold mt-2 mb-2">${issue.title}</h3>

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
allButtons();