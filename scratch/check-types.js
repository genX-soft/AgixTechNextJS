
async function checkTypes() {
  const base = "https://cms.agixtech.com/wp-json/wp/v2/types";
  try {
    const res = await fetch(base);
    if (res.ok) {
      const data = await res.json();
      console.log(Object.keys(data));
    } else {
      console.log(`Status: ${res.status}`);
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

checkTypes();
