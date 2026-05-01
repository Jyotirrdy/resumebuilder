const form = document.getElementById('resume-form');
const nameEl = document.getElementById('p-name');
const contactEl = document.getElementById('p-contact');
const summaryEl = document.getElementById('p-summary');
const skillsEl = document.getElementById('p-skills');
const experienceEl = document.getElementById('p-experience');
const downloadBtn = document.getElementById('download-btn');

function normalizeSkills(skillsRaw) {
  return skillsRaw
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function updatePreview(data) {
  nameEl.textContent = data.name || 'Your Name';
  contactEl.textContent = [data.email, data.phone].filter(Boolean).join(' • ');
  summaryEl.textContent = data.summary || 'Add your summary in the form.';

  const skills = normalizeSkills(data.skills || '');
  skillsEl.innerHTML = '';

  if (!skills.length) {
    const li = document.createElement('li');
    li.textContent = 'Add skills to get started.';
    skillsEl.appendChild(li);
  } else {
    skills.forEach((skill) => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsEl.appendChild(li);
    });
  }

  experienceEl.textContent = data.experience || 'Add your experience in the form.';
}

function getFormData() {
  return Object.fromEntries(new FormData(form).entries());
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updatePreview(getFormData());
});

downloadBtn.addEventListener('click', () => {
  const data = getFormData();
  const skills = normalizeSkills(data.skills || '').join(', ') || 'N/A';
  const resume = `${data.name}\n${data.email} | ${data.phone}\n\nSummary\n${data.summary}\n\nSkills\n${skills}\n\nExperience\n${data.experience}`;
  const blob = new Blob([resume], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(data.name || 'resume').replace(/\s+/g, '_').toLowerCase()}.txt`;
  link.click();
  URL.revokeObjectURL(url);
});
