const listBtn = document.getElementById("student-list-btn");
const buttonList = document.getElementById("btn-list");
const getData = async (endpoint = "") => {
  const response = await fetch(`http://localhost:8000/api/${endpoint}`);
  const data = await response.json();
  console.log(data);
  return data;
};

listBtn.addEventListener("click", async () => {
  const { data } = await getData("students");

  data.map((student) => {
    const singleBtn = document.createElement("button");
    singleBtn.innerText = student.name;
    singleBtn.addEventListener("click", () =>
      getData(`students/${student.id}`)
    );
    buttonList.appendChild(singleBtn);
  });
});
