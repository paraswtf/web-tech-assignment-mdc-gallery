alertText = ` **IMPORTANT**

To ensure that you get courses of your choice, students are requested to note the following:

- You have to choose one course only. Once you have made a choice, you cannot change the course during the semester. So, please choose carefully.

- Some courses have multiple sections, each taught by different instructors. You have to choose the specific section you want to attend (one section only). 

- The minimum number of student signups needed for each section course to run is 15, and the maximum number of students accommodated in each section is 60.

- Courses will be allotted on a first-come, first-served basis.

- Every course has a short course description (the course preamble) and a short bio of the instructor. Please review these before you sign up.

- Courses can be offered in any one of the following modes: offline (100% face-to-face classes); online (100% online classes); hybrid (classes conducted in offline and online modes at the same time); and blended (some sessions in offline mode and other sessions in online mode). Please note the mode of delivery before you sign up. 

- Please note the campus and institute offering the course for offline classes (the information is in the course preamble).

- Unless otherwise mentioned, all sessions will be conducted on Saturdays between 9 am - Noon (12 pm).
`;
alert(alertText);

function formSubmitted(form) {
	var data = {
		prn: form.elements["prn"].value,
		name: form.elements["name"].value,
		email: form.elements["email"].value,
		institute: form.elements["institute"].value,
		course: form.elements["mdc"].value
	};

	const confirmation = confirm(`Are you sure you want to submit the form?
    You have entered the following details:
    PRN: ${data.prn}
    Name: ${data.name}
    Email: ${data.email}
    Institute: ${data.institute}
    Course: ${data.course}`);
}
