
async function checkCMS() {
  const base = "https://cms.agixtech.com/wp-json/wp/v2";
  const types = ['pages', 'posts', 'case-study', 'case_study', 'case-studies', 'case_studies'];
  
  for (const type of types) {
    try {
      const res = await fetch(`${base}/${type}?per_page=1`);
      if (res.ok) {
        const data = await res.json();
        console.log(`Type: ${type} - Count: ${res.headers.get('X-WP-Total')}`);
        if (data.length > 0) {
          console.log(`Sample slug: ${data[0].slug}, modified: ${data[0].modified}`);
        }
      } else {
        console.log(`Type: ${type} - Status: ${res.status}`);
      }
    } catch (e) {
      console.log(`Type: ${type} - Error: ${e.message}`);
    }
  }
}

checkCMS();
