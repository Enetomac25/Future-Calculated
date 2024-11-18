function calculateAPS() {
  // Get selected marks for all subjects
  const marks = [];
  for (let i = 1; i <= 7; i++) {
      const markSelect = document.querySelector(`select[name="mark${i}"]`);
      if (markSelect && markSelect.value) {
          marks.push(parseInt(markSelect.value));
      }
  }

  // Calculate total APS by summing up the best 6 marks
  marks.sort((a, b) => b - a); // Sort marks in descending order
  const topSixMarks = marks.slice(0, 6); // Get the top 6 marks
  const totalAPS = topSixMarks.reduce((acc, mark) => acc + mark, 0); // Sum the top 6 marks

  // Display the result
  alert(`Total APS: ${totalAPS}`);

  // Redirect to can_do_courses.html with totalAPS as a URL parameter
  window.location.href = `can_do_courses.html?totalAPS=${totalAPS}`;
}
