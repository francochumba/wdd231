import { courses } from "./coursesData.js";

const coursesContainer = document.querySelector("#courses");
const totalCredits = document.querySelector("#totalCredits");
const filterButtons = document.querySelectorAll(".filter-button");

function displayCourses(courseList) {
    coursesContainer.innerHTML = "";

    courseList.forEach((course) => {
        const article = document.createElement("article");
        article.classList.add("course-card");

        if (course.completed) {
            article.classList.add("completed");
        }

        article.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;

        coursesContainer.appendChild(article);
    });

    const credits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = `Total Credits: ${credits}`;
}

function setActiveButton(selectedButton) {
    filterButtons.forEach((button) => {
        button.classList.remove("active-filter");
    });

    selectedButton.classList.add("active-filter");
}

export function setupCourses() {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.id.toUpperCase();

            if (filter === "ALL") {
                displayCourses(courses);
            } else {
                const filteredCourses = courses.filter((course) => course.subject === filter);
                displayCourses(filteredCourses);
            }

            setActiveButton(button);
        });
    });

    displayCourses(courses);
}