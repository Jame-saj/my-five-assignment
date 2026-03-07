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
  containerIssue.innerHTML = ' ';
  issues.forEach(issue => {
    const div = document.createElement('div');
    div.innerHTML = `
          <div class="p-4 border rounded-lg shadow bg-white">
        <div class='issue-check flex justify-between'>
          <p> ${
            issue.status === 'open'
              ? `<img src="./assets/Open-Status.png" alt="" srcset="">`
              : `<img
              src="./assets/Closed- Status .png" alt="">`
          }
          </p>
          <span>${issue.priority}</span>
        </div>
      
        <h3 class="font-semibold mt-2 mb-2">${issue.title}</h3>
      
        <p class="text-sm line-clamp-2 text-gray-500 mb-3">
          ${issue.description}
        </p>
<div>
  <p>${issue.labels}</p>
</div>
<br>
<hr class="text-gray-400">
<br>
<p>#${issue.id} by ${issue.author}</p>
<p>${issue.createdAt}</p>
     
      </div>

      `;
    containerIssue.appendChild(div);
    
   });
}
allButtons()