const form = document.getElementById("carForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const car = {
    name: document.getElementById("name").value,
    year: document.getElementById("year").value,
    brand: document.getElementById("brand").value,
    horsepower: document.getElementById("horsepower").value,
  };

  try {
    const response = await fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    const data = await response.json();

    alert(data.message);
    form.reset();

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong ");
  }
});