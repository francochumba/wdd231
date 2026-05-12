const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const hamburger = document.querySelector("#hamburger");
const primaryNav = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const coursesContainer = document.querySelector("#courses");
const totalCredits = document.querySelector("#totalCredits");
const filterButtons = document.querySelectorAll(".filter-button");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

hamburger.addEventListener("click", () => {
    primaryNav.classList.toggle("open");

    const isOpen = primaryNav.classList.contains("open");

    hamburger.textContent = isOpen ? "X" : "☰";
    hamburger.setAttribute("aria-expanded", isOpen);
});

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